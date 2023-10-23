import * as esbuild from "esbuild";
import brode from "@geut/esbuild-plugin-brode";

esbuild.serve({
  port: 1420,
  servedir: ".",
}, {
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
