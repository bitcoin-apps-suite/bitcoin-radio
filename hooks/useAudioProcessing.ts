import { useState, useCallback, useRef } from 'react'
import { audioProcessor, AudioProcessingOptions, ExportProgress } from '@/utils/audioProcessor'

export interface ProcessingState {
  isProcessing: boolean
  progress: ExportProgress | null
  error: string | null
  result: Blob | null
}

export interface UseAudioProcessingReturn {
  // State
  processing: ProcessingState
  
  // Actions
  processAudio: (file: File, options?: AudioProcessingOptions) => Promise<Blob | null>
  extractWaveform: (file: File, samples?: number) => Promise<Float32Array | null>
  compressAudio: (file: File, targetSizeMB: number) => Promise<Blob | null>
  convertFormat: (file: File, format: string) => Promise<Blob | null>
  
  // Utilities
  reset: () => void
  cancel: () => void
}

export function useAudioProcessing(): UseAudioProcessingReturn {
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: null,
    error: null,
    result: null
  })

  const abortController = useRef<AbortController | null>(null)

  const reset = useCallback(() => {
    setProcessing({
      isProcessing: false,
      progress: null,
      error: null,
      result: null
    })
  }, [])

  const cancel = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort()
      abortController.current = null
    }
    setProcessing(prev => ({
      ...prev,
      isProcessing: false,
      progress: {
        phase: 'error',
        progress: 0,
        message: 'Processing cancelled'
      }
    }))
  }, [])

  const processAudio = useCallback(async (
    file: File, 
    options?: AudioProcessingOptions
  ): Promise<Blob | null> => {
    try {
      // Reset state
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'initializing',
          progress: 0,
          message: 'Initializing audio processor...'
        },
        error: null,
        result: null
      })

      // Create abort controller for cancellation
      abortController.current = new AbortController()

      // Set up progress callback
      audioProcessor.setProgressCallback((progress) => {
        setProcessing(prev => ({
          ...prev,
          progress
        }))
      })

      // Process the audio
      const result = await audioProcessor.processAudio(file, options)

      // Update state with result
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: 'Audio processing completed successfully!'
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    } finally {
      abortController.current = null
    }
  }, [])

  const extractWaveform = useCallback(async (
    file: File,
    samples: number = 1000
  ): Promise<Float32Array | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'processing',
          progress: 50,
          message: 'Extracting waveform...'
        },
        error: null,
        result: null
      })

      const result = await audioProcessor.extractWaveform(file, samples)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        progress: {
          phase: 'complete',
          progress: 100,
          message: 'Waveform extracted successfully!'
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Waveform extraction failed'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    }
  }, [])

  const compressAudio = useCallback(async (
    file: File,
    targetSizeMB: number
  ): Promise<Blob | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'processing',
          progress: 0,
          message: `Compressing audio to ${targetSizeMB}MB...`
        },
        error: null,
        result: null
      })

      audioProcessor.setProgressCallback((progress) => {
        setProcessing(prev => ({
          ...prev,
          progress: {
            ...progress,
            message: `Compressing audio to ${targetSizeMB}MB... ${progress.progress}%`
          }
        }))
      })

      const result = await audioProcessor.compressAudio(file, targetSizeMB)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: 'Audio compression completed!'
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Audio compression failed'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    }
  }, [])

  const convertFormat = useCallback(async (
    file: File,
    format: string
  ): Promise<Blob | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'processing',
          progress: 0,
          message: `Converting to ${format.toUpperCase()}...`
        },
        error: null,
        result: null
      })

      audioProcessor.setProgressCallback((progress) => {
        setProcessing(prev => ({
          ...prev,
          progress: {
            ...progress,
            message: `Converting to ${format.toUpperCase()}... ${progress.progress}%`
          }
        }))
      })

      const result = await audioProcessor.convertToFormat(file, format)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: `Conversion to ${format.toUpperCase()} completed!`
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Format conversion failed'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    }
  }, [])

  return {
    processing,
    processAudio,
    extractWaveform,
    compressAudio,
    convertFormat,
    reset,
    cancel
  }
}

// Utility hook for batch processing multiple audio files
export function useBatchAudioProcessing() {
  const [batchState, setBatchState] = useState<{
    isProcessing: boolean
    currentIndex: number
    totalFiles: number
    results: (Blob | null)[]
    errors: string[]
  }>({
    isProcessing: false,
    currentIndex: 0,
    totalFiles: 0,
    results: [],
    errors: []
  })

  const processBatch = useCallback(async (
    files: File[],
    options?: AudioProcessingOptions
  ) => {
    setBatchState({
      isProcessing: true,
      currentIndex: 0,
      totalFiles: files.length,
      results: [],
      errors: []
    })

    const results: (Blob | null)[] = []
    const errors: string[] = []

    for (let i = 0; i < files.length; i++) {
      setBatchState(prev => ({ ...prev, currentIndex: i }))

      try {
        const result = await audioProcessor.processAudio(files[i], options)
        results.push(result)
        errors.push('')
      } catch (error) {
        results.push(null)
        errors.push(error instanceof Error ? error.message : 'Processing failed')
      }
    }

    setBatchState({
      isProcessing: false,
      currentIndex: files.length,
      totalFiles: files.length,
      results,
      errors
    })

    return { results, errors }
  }, [])

  return {
    batchState,
    processBatch
  }
}