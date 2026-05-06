import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { EdgeTTS } from 'edge-tts-universal'

function ttsPlugin() {
  return {
    name: 'tts-plugin',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        try {
          // req.url is the path after /api/tts. So if request is /api/tts?text=..., req.url is /?text=...
          // But sometimes it contains the full path depending on the middleware mount.
          // To be safe, parse it from req.originalUrl
          const urlStr = req.originalUrl || req.url;
          const url = new URL(urlStr, `http://${req.headers.host || 'localhost'}`);
          const text = url.searchParams.get('text');
          
          if (!text) {
            res.statusCode = 400;
            return res.end('Missing text parameter');
          }

          console.log("Generating TTS for:", text.substring(0, 50));
          const tts = new EdgeTTS(text, 'ar-SA-HamedNeural');
          const { audio } = await tts.synthesize();
          const buffer = Buffer.from(await audio.arrayBuffer());
          
          res.setHeader('Content-Type', 'audio/mpeg');
          res.end(buffer);
        } catch (e) {
          console.error("TTS Plugin Error:", e);
          res.statusCode = 500;
          res.end('Error generating TTS');
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    ttsPlugin()
  ],
})
