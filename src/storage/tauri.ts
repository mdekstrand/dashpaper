/**
 * Tauri implementation of backend storage.
 */

import { readDir, readTextFile } from "@tauri-apps/api/fs";

export class TauriStorage {
  root: string;

  constructor(dir: string) {
    this.root = dir;
  }

  async listFiles(): Promise<string[]> {
    let files = await readDir(this.root);
    let tpfiles = files.filter((f) => f.name?.endsWith(".taskpaper"))
      .map((f) => f.name ?? "##UNREACHABLE");
    console.log("found %d taskpaper files", tpfiles.length);
    return tpfiles;
  }

  async getFile(name: string) {
    let file = this.root + "/" + name;
    let text = await readTextFile(file);
    return text;
  }
}
