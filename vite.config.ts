import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { EdgeTTS } from "edge-tts-universal";

function ttsPlugin() {
  return {
    name: "tts-plugin",
    configureServer(server: {
      middlewares: {
        use: (arg0: string, arg1: (req: any, res: any) => Promise<any>) => void;
      };
    }) {
      server.middlewares.use("/api/tts", async (req, res) => {
        try {
          const urlStr = req.originalUrl || req.url;
          const url = new URL(
            urlStr,
            `http://${req.headers.host || "localhost"}`,
          );
          const text = url.searchParams.get("text");
          const voice = url.searchParams.get("voice") || "ar-SA-ZariyahNeural";

          if (!text) {
            res.statusCode = 400;
            return res.end("Missing text parameter");
          }

          console.log("Generating TTS for:", text.substring(0, 50));
          const tts = new EdgeTTS(text, voice);
          const { audio } = await tts.synthesize();
          const buffer = Buffer.from(await audio.arrayBuffer());

          res.setHeader("Content-Type", "audio/mpeg");
          res.end(buffer);
        } catch (e) {
          console.error("TTS Plugin Error:", e);
          res.statusCode = 500;
          res.end("Error generating TTS");
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), nodePolyfills(), ttsPlugin()],
});
