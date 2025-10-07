import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

export interface AudioProcessingOptions {
  format?: 'mp3' | 'wav' | 'm4a' | 'ogg' | 'flac'
  quality?: 'low' | 'medium' | 'high' | 'lossless'
  bitrate?: 64 | 128 | 192 | 256 | 320 // kbps
  sampleRate?: 22050 | 44100 | 48000 | 96000
  compression?: number // 0-100
}

export interface ExportProgress {
  phase: 'initializing' | 'processing' | 'encoding' | 'complete' | 'error'
  progress: number // 0-100
  message: string
  timeRemaining?: number // seconds
}

export class BitcoinAudioProcessor {
  private ffmpeg: FFmpeg
  private isLoaded = false
  private onProgressCallback?: (progress: ExportProgress) => void

  constructor() {
    this.ffmpeg = new FFmpeg()
  }

  async initialize(): Promise<void> {
    if (this.isLoaded) return

    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.15/dist/umd'
      
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      this.ffmpeg.on('progress', ({ progress, time }) => {
        if (this.onProgressCallback) {
          this.onProgressCallback({
            phase: 'processing',
            progress: Math.round(progress * 100),
            message: `Processing audio... ${Math.round(progress * 100)}%`,
            timeRemaining: time > 0 ? Math.round((1 - progress) * time / progress) : undefined
          })
        }
      })

      this.ffmpeg.on('log', ({ message }) => {
        console.log('FFmpeg:', message)
      })

      this.isLoaded = true
    } catch (error) {
      console.error('Failed to initialize FFmpeg:', error)
      throw new Error('Failed to initialize audio processor')
    }
  }

  setProgressCallback(callback: (progress: ExportProgress) => void): void {
    this.onProgressCallback = callback
  }

  async processAudio(file: File, options: AudioProcessingOptions = {}): Promise<Blob> {
    await this.initialize()

    const {
      format = 'mp3',
      quality = 'medium',
      bitrate = 192,
      sampleRate = 44100
    } = options

    try {
      this.updateProgress('initializing', 0, 'Preparing audio for processing...')

      // Write input file
      const inputName = 'input.wav'
      const outputName = `output.${format}`
      
      await this.ffmpeg.writeFile(inputName, await fetchFile(file))

      this.updateProgress('processing', 10, 'Converting audio format...')

      // Build FFmpeg command for audio processing
      const command = this.buildAudioCommand(inputName, outputName, {
        format,
        quality,
        bitrate,
        sampleRate
      })

      await this.ffmpeg.exec(command)

      this.updateProgress('encoding', 90, 'Finalizing audio...')

      // Read output file
      const data = await this.ffmpeg.readFile(outputName)
      const audioBlob = new Blob([data], { type: `audio/${format}` })

      // Clean up
      await this.ffmpeg.deleteFile(inputName)
      await this.ffmpeg.deleteFile(outputName)

      this.updateProgress('complete', 100, 'Audio processing completed!')

      return audioBlob

    } catch (error) {
      this.updateProgress('error', 0, `Audio processing failed: ${error}`)
      throw error
    }
  }

  async extractWaveform(file: File, samples: number = 1000): Promise<Float32Array> {
    try {
      // Create audio context
      const audioContext = new AudioContext()
      
      // Convert file to array buffer
      const arrayBuffer = await file.arrayBuffer()
      
      // Decode audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      
      // Get channel data (use first channel)
      const channelData = audioBuffer.getChannelData(0)
      
      // Downsample to requested number of samples
      const blockSize = Math.floor(channelData.length / samples)
      const waveform = new Float32Array(samples)
      
      for (let i = 0; i < samples; i++) {
        const start = i * blockSize
        const end = start + blockSize
        let sum = 0
        
        for (let j = start; j < end && j < channelData.length; j++) {
          sum += Math.abs(channelData[j])
        }
        
        waveform[i] = sum / blockSize
      }
      
      return waveform
    } catch (error) {
      console.error('Waveform extraction failed:', error)
      throw new Error('Failed to extract waveform data')
    }
  }

  async compressAudio(file: File, targetSizeMB: number): Promise<Blob> {
    await this.initialize()

    try {
      this.updateProgress('initializing', 0, `Compressing audio to ${targetSizeMB}MB...`)

      const inputName = 'input.wav'
      const outputName = 'output.mp3'
      
      await this.ffmpeg.writeFile(inputName, await fetchFile(file))

      // Calculate target bitrate based on file duration and target size
      // This is a rough estimation
      const targetBitrate = Math.max(64, Math.min(320, Math.round(targetSizeMB * 8 * 1024 / 60))) // Assume 60 seconds

      const command = [
        '-i', inputName,
        '-b:a', `${targetBitrate}k`,
        '-ar', '44100',
        outputName
      ]

      await this.ffmpeg.exec(command)

      const data = await this.ffmpeg.readFile(outputName)
      const audioBlob = new Blob([data], { type: 'audio/mp3' })

      // Clean up
      await this.ffmpeg.deleteFile(inputName)
      await this.ffmpeg.deleteFile(outputName)

      return audioBlob

    } catch (error) {
      this.updateProgress('error', 0, `Audio compression failed: ${error}`)
      throw error
    }
  }

  async convertToFormat(file: File, format: string): Promise<Blob> {
    await this.initialize()

    try {
      this.updateProgress('initializing', 0, `Converting to ${format.toUpperCase()}...`)

      const inputName = 'input'
      const outputName = `output.${format}`
      
      await this.ffmpeg.writeFile(inputName, await fetchFile(file))

      const command = ['-i', inputName, outputName]
      await this.ffmpeg.exec(command)

      const data = await this.ffmpeg.readFile(outputName)
      const audioBlob = new Blob([data], { type: `audio/${format}` })

      // Clean up
      await this.ffmpeg.deleteFile(inputName)
      await this.ffmpeg.deleteFile(outputName)

      return audioBlob

    } catch (error) {
      this.updateProgress('error', 0, `Format conversion failed: ${error}`)
      throw error
    }
  }

  private buildAudioCommand(
    input: string,
    output: string,
    options: AudioProcessingOptions
  ): string[] {
    const command = ['-i', input]

    // Audio codec based on format
    switch (options.format) {
      case 'mp3':
        command.push('-c:a', 'libmp3lame')
        break
      case 'wav':
        command.push('-c:a', 'pcm_s16le')
        break
      case 'm4a':
        command.push('-c:a', 'aac')
        break
      case 'ogg':
        command.push('-c:a', 'libvorbis')
        break
      case 'flac':
        command.push('-c:a', 'flac')
        break
    }

    // Bitrate (for lossy formats)
    if (options.bitrate && ['mp3', 'm4a', 'ogg'].includes(options.format || 'mp3')) {
      command.push('-b:a', `${options.bitrate}k`)
    }

    // Sample rate
    if (options.sampleRate) {
      command.push('-ar', options.sampleRate.toString())
    }

    // Quality settings
    if (options.quality) {
      switch (options.quality) {
        case 'low':
          command.push('-q:a', '9')
          break
        case 'medium':
          command.push('-q:a', '5')
          break
        case 'high':
          command.push('-q:a', '2')
          break
        case 'lossless':
          if (options.format === 'flac') {
            command.push('-compression_level', '8')
          }
          break
      }
    }

    command.push(output)
    return command
  }

  private updateProgress(phase: ExportProgress['phase'], progress: number, message: string): void {
    if (this.onProgressCallback) {
      this.onProgressCallback({ phase, progress, message })
    }
  }
}

// Create singleton instance
export const audioProcessor = new BitcoinAudioProcessor()