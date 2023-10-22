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
  documents: Map<string, Outline> = new Map();

  constructor(backend?: StorageBackend) {
    super();
    this.backend = backend;
  }

  setBackend(backend: StorageBackend) {
    this.backend = backend;
    this.emit("configured");
    this.requestAllDocuments();
  }

  getDocument(name: string) {
    return this.documents.get(name);
  }

  allDocuments() {
    let docs = [];
    for (let [name, outline] of this.documents.entries()) {
      docs.push({ name, outline });
    }
    return docs;
  }

  async requestAllDocuments() {
    if (!this.backend) {
      return null;
    }
    console.log("loading all documents");
    let files = await this.backend?.listFiles();
    if (files == null) {
      return null;
    }

    for (let name of files) {
      let content = await this.backend.getFile(name);
      let outline = Outline.createTaskPaperOutline(content);
      this.documents.set(name, outline);
      this.emit("doc-loaded", name);
    }

    this.emit("doclist-loaded");
  }

  async requestDocument(name: string) {
    if (!this.backend) return;
    if (this.documents.has(name)) return;
    let content = await this.backend.getFile(name);
    let outline = Outline.createTaskPaperOutline(content);
    this.documents.set(name, outline);
    this.emit("doc-loaded", name);
  }
}
