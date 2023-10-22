import { EventEmitter } from "../util/events";
import { Outline } from "birch-outline";

/**
 * Type for storage backends.
 */
type StorageBackend = {
  listFiles(): Promise<string[]>;
  getFile(name: string): Promise<string>;
};

export type OutlineSet = {
  $count: number;
  [name: string]: Outline;
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

  async loadDocuments(): Promise<OutlineSet | null> {
    let files = await this.backend?.listFiles();
    if (files == null) {
      return null;
    }

    let obj: OutlineSet = { $count: 0 };
    for (let f of files) {
      obj[f] = this.backend?.getFile(f);
      obj.$count += 1;
    }
    return obj;
  }
}
