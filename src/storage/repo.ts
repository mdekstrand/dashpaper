import { EventEmitter } from "../util/events";
import { Outline } from "birch-outline";

/**
 * Type for storage backends.
 */
type StorageBackend = {
  listFiles(): Promise<string[]>;
  getFile(name: string): Promise<string>;
};

export type TaskFile = {
  name: string;
  outline: Outline;
};

export class TaskPaperRepository extends EventEmitter {
  backend?: StorageBackend;

  constructor(backend?: StorageBackend) {
    super();
    this.backend = backend;
  }

  setBackend(backend: StorageBackend) {
    this.backend = backend;
    this.emit("configured");
  }

  async loadDocuments(): Promise<TaskFile[] | null> {
    if (!this.backend) {
      return null;
    }
    let files = await this.backend?.listFiles();
    if (files == null) {
      return null;
    }

    let outlines = [];
    for (let name of files) {
      outlines.push({ name, outline: await this.backend.getFile(name) });
    }
    return outlines;
  }
}
