import { Event } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import * as dialog from "@tauri-apps/api/dialog";

import { TauriStorage } from "../storage/tauri";
import { TaskPaperRepository } from "../storage/repo";
import { AppState } from "./state";

export class MenuHandler {
  state: AppState;
  repo: TaskPaperRepository;
  constructor(state: AppState, repo: TaskPaperRepository) {
    this.state = state;
    this.repo = repo;
  }

  register() {
    appWindow.onMenuClicked(this.menuHandler.bind(this));
  }

  menuHandler(evt: Event<string>) {
    if (evt.payload == "open") {
      this.handleOpenDirectory();
    }
  }

  async handleOpenDirectory() {
    console.log("requesting to open a directory");
    let dir = await dialog.open({
      directory: true,
    });
    if (dir == null) {
      console.log("open cancelled");
      return;
    } else if (Array.isArray(dir)) {
      console.error("received multiple directories, using first");
      dir = dir[0];
    }

    console.log("requested dir %s", dir);
    let store = new TauriStorage(dir);
    this.repo.setBackend(store);
    this.state.rememberDirectory(dir);
  }
}
