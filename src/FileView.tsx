import { useState } from "preact/hooks";
import { Item } from "birch-outline";
import "./FileView.css";
import { TaskPaperRepository } from "./storage/repo";
import { TaskLine, TaskList } from "./components/items";

type HomeParams = {
  path: string,
  repo: TaskPaperRepository,
  file: string,
}

function HomeScreen(params: HomeParams) {
  let [outline, updateOutline] = useState(null);
  params.repo.loadDocument(params.name).then(updateOutline);

  return (
    <div class="container">
      <h1>{params.name}</h1>

      {outline ? <TaskList items={outline.root.children} /> : <p>Loading outline…</p>}
    </div>
  );
}

export default HomeScreen;
