# Bitcoin Radio 📻

Bitcoin Radio is a modern, web-based radio broadcasting and podcasting platform built on the Bitcoin SV blockchain. Create, edit, and broadcast professional radio shows and podcasts with advanced audio tools and Bitcoin-native features.

## Features

🎧 **Professional Audio Studio**
- Multi-track audio editing and mixing
- Real-time waveform visualization
- Advanced audio effects and filters
- Live recording capabilities

📡 **Radio Broadcasting**
- Live streaming support
- Schedule automated shows
- Multiple audio format support (MP3, WAV, M4A)
- SoundCloud-style discovery interface

🪙 **Bitcoin Integration**
- Tokenize radio shows and podcasts as NFTs
- Bitcoin micropayments for premium content
- Decentralized content storage
- Proof of authenticity on blockchain

🎙️ **Open Source Compatibility**
- Integration with AzuraCast for radio automation
- Support for Icecast streaming
- Compatible with major podcasting platforms
- Built on open standards

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── page.tsx           # Main radio interface
│   ├── studio/            # Radio studio pages
│   └── create/            # Recording and upload pages
├── components/            # React components
│   ├── AudioCard.tsx      # Audio show card component
│   ├── BitcoinRadioStudio.tsx  # Main audio editing studio
│   └── RadioProjectSidebar.tsx # Project management
├── hooks/                 # Custom React hooks
├── services/             # API and external services
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Audio Technologies

### Recording & Editing
- **Web Audio API** for real-time audio processing
- **WaveSurfer.js** for waveform visualization
- **Howler.js** for cross-browser audio playback
- **FFmpeg.wasm** for client-side audio processing

### Broadcasting
- **Icecast** integration for live streaming
- **HLS** support for adaptive streaming
- **WebRTC** for real-time communication
- **AzuraCast** compatibility for radio automation

### Open Source Tools Referenced
- **AzuraCast** - Self-hosted web radio management
- **LibreTime** - Radio broadcast automation
- **Castopod** - Open-source podcasting platform
- **Ultraschall** - Podcast production suite

## Development

The radio interface features three main modes:

1. **Studio Mode** - Full audio editing and production suite
2. **Listen Mode** - SoundCloud-style audio discovery
3. **Split Mode** - Both studio and listen interfaces side-by-side

### Key Components

- `BitcoinRadioStudio` - Main audio editing interface
- `AudioCard` - Individual show/podcast display
- `RadioProjectSidebar` - Project management and organization

## Bitcoin Features

### Tokenization
Radio shows and podcasts can be tokenized as unique NFTs on the Bitcoin SV blockchain, providing:
- Proof of authenticity and ownership
- Monetization through direct sales
- Royalty distribution to creators
- Decentralized content verification

### Micropayments
Integrate Bitcoin micropayments for:
- Premium show access
- Tip creators directly
- Pay-per-listen models
- Subscription services

## Learn More

To learn more about the underlying technologies:

- [Bitcoin SV Documentation](https://docs.bsvblockchain.org/)
- [AzuraCast Documentation](https://www.azuracast.com/docs/)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

Bitcoin Radio is part of the Bitcoin OS ecosystem. Contributions are welcome! Please check out the [Bitcoin OS GitHub repository](https://github.com/bitcoin-os) for contribution guidelines.

## License

This project is licensed under the Open BSV License - see the LICENSE file for details.