import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // base: "./",
  // build: {
  //   // generate manifest.json in outDir
  //   manifest: true,

  //   base: '/public_html/build/',

   
  // }
});


