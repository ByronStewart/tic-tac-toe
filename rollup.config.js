import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife"
  },
  plugins: [!production && serve("dist"), production && terser()]
};
