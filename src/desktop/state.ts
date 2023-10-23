import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { TaskPaperRepository } from "../storage/repo";
import { TauriStorage } from "../storage/tauri";

type State = {
  directory?: string;
};

export class AppState {
  _state?: Promise<State>;

  constructor() {}

  get state() {
    let state = this._state;
    if (!state) {
      this._state = state = this.loadState();
    }
    return state;
  }

  async loadState() {
    let text;
    try {
      text = await readTextFile("state/state.json", {
        dir: BaseDirectory.AppData,
      });
    } catch (e) {
      if (typeof(e) == "string" && e.match(/[Nn]o such file or directory/)) {
        console.log("no state file found");
      } else {
        console.error("unknown error reading state file: %s", e);
      }
      return {};
    }

    console.log("loaded state file");
    return JSON.parse(text);
  }

  async saveState(state?: State) {
    state ??= await this.state;
    await createDir("state", {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
    let text = JSON.stringify(state, null, 2);
    console.log("saving state file");
    console.log("new state: %o", state);
    await writeTextFile("state/state.json", text, {
      dir: BaseDirectory.AppData,
    });
  }

  async initializeRepo(repo: TaskPaperRepository) {
    let state = await this.state;
    let dir = state?.directory;
    if (dir) {
      console.log("reloading saved dir %s", dir);
      let backend = new TauriStorage(dir);
      repo.setBackend(backend);
    }
  }

  async rememberDirectory(dir: string) {
    let state = await this.state;
    state.directory = dir;
    await this.saveState(state);
  }
}
