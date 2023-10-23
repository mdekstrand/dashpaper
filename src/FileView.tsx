import { h } from "preact";
import { useState } from "preact/hooks";
import "./FileView.css";
import { TaskPaperRepository } from "./storage/repo";
import { TaskList } from "./components/items";

type FileParams = {
  path: string;
  repo: TaskPaperRepository;
  name?: string;
};

function FileView(params: FileParams) {
  let repo = params.repo;
  let name = params.name;
  if (!name) {
    return <div class="error">Fatal error: no file name specified.</div>;
  }
  let [outline, updateOutline] = useState(repo.getDocument(name));
  params.repo.hook("doc-loaded", (n) => {
    if (name && n == name) {
      updateOutline(repo.getDocument(name));
    }
  });

  return (
    <div class="container">
      <h1>{params.name}</h1>

      <p>
        <a href="/">Back to Dashboard</a>
      </p>

      {outline ? (
        <TaskList items={outline.root.children} />
      ) : (
        <p>Loading outline…</p>
      )}
    </div>
  );
}

export default FileView;
