import { useState } from "preact/hooks";
import { Item } from "birch-outline";
import "./HomeScreen.css";
import { TaskPaperRepository } from "./storage/repo";

type AppParameters = {
  repo: TaskPaperRepository
}

type TaskLineParams = {
  item: Item;
}

type TaskListParams = {
  items: Item[];
}

function TaskLine(params: TaskLineParams) {
  let item = params.item;
  let type = item.getAttribute("type");
  return (<li class={"item " + type}>
    <div class="self">{item.bodyContentString}</div>
    (item.children ? <TaskList items={item.children}/> : null)
  </li>)
}

function TaskList(params: TaskListParams) {
  return (<ul>
    {params.items.map((i) => <TaskLine item={i}/>)}
  </ul>)
}

function HomeScreen(params: AppParameters) {
  let [docs, updateDocs] = useState(null);
  params.repo.on("configured", () => {
    params.repo.loadDocuments().then(updateDocs);
  })

  return (
    <div class="container">
      <h1>DashPaper</h1>

      <ul>
        {docs ? docs.map((o) => <li>{o.name}</li>) : []}
      </ul>
    </div>
  );
}

export default HomeScreen;
