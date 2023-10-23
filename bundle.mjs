import * as esbuild from "esbuild";
import brode from "@geut/esbuild-plugin-brode";

let result = await esbuild.build({
  bundle: true,
  outdir: "dist",
  entryPoints: ["src/main.tsx"],
  sourcemap: "external",
  jsxFactory: "h",
  jsxFragment: "Fragment",
  plugins: [
    brode(),
  ],
});
console.log(result);
