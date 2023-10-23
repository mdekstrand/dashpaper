import * as esbuild from "esbuild";
import brode from "@geut/esbuild-plugin-brode";

let context = await esbuild.context({
  bundle: true,
  outdir: "dist",
  entryPoints: ["src/main.tsx"],
  sourcemap: "inline",
  jsxFactory: "h",
  jsxFragment: "Fragment",
  plugins: [
    brode(),
  ],
});

context.serve({
  port: 1420,
  servedir: ".",
});
