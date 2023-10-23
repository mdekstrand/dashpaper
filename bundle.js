import * as esbuild from "esbuild";
import brode from "@geut/esbuild-plugin-brode";

esbuild.build({
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
