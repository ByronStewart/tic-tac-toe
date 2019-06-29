import minify from "rollup-plugin-babel-minify";

export default {
  input: "src/main.js",

  output: {
    file: "dist/bundle.js",
    format: "esm"
  },
  plugins: [minify()]
};
