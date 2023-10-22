import { useState } from "preact/hooks";
import { Item } from "birch-outline";
import "./HomeScreen.css";
import { TaskPaperRepository } from "./storage/repo";
import { TaskLine } from "./components/items";

type HomeParams = {
  repo: TaskPaperRepository
}

function DocList({docs}) {
  return (
    <ul class="doclist">
      {docs ? docs.map((o) => <li>
        <a href={"/files/" + o.name}>{o.name}</a>
      </li>) : []}
    </ul>
  );
}

function Upcoming({docs}) {
  let seen = new Set();
  let overdue = [];
  let tomorrow = [];
  let week = [];
  let month = [];

  for (let doc of docs) {
    for (let item of doc.outline.evaluateItemPath("not @done and @due < [d] today")) {
      overdue.push(item);
      seen.add(item.id);
    }
    for (let item of doc.outline.evaluateItemPath("not @done and @due <= [d] tomorrow")) {
      if (seen.has(item.id)) continue;
      tomorrow.push(item);
      seen.add(item.id);
    }
    for (let item of doc.outline.evaluateItemPath("not @done and @due <= [d] 8 days")) {
      if (seen.has(item.id)) continue;
      week.push(item);
      seen.add(item.id);
    }
    for (let item of doc.outline.evaluateItemPath("not @done and @due <= [d] 1 month")) {
      if (seen.has(item.id)) continue;
      month.push(item);
      seen.add(item.id);
    }
  }

  return (
    <div class="upcoming">
      <div class="overdue">
      <h2>Overdue</h2>
      {overdue.map((i) => <TaskLine item={i} children={false} />)}
      </div>
      <div class="tomorrow">
      <h2>Tomorrow</h2>
      {tomorrow.map((i) => <TaskLine item={i} children={false} />)}
      </div>
      <div class="week">
      <h2>This Week</h2>
      {week.map((i) => <TaskLine item={i} children={false} />)}
      </div>
      <div class="month">
      <h2>This Month</h2>
      {month.map((i) => <TaskLine item={i} children={false} />)}
      </div>
    </div>
  )
}

function HomeScreen(params: HomeParams) {
  let repo = params.repo;
  let [docs, updateDocs] = useState(repo.allDocuments());
  repo.on("doclist-loaded", () => {
    updateDocs(repo.allDocuments());
  });

  return (
    <div class="container">
      <h1>DashPaper</h1>

      <Upcoming docs={docs} />
      <DocList docs={docs} />
    </div>
  );
}

export default HomeScreen;
