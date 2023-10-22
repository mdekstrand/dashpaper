import { useState } from "preact/hooks";
import { Item } from "birch-outline";
import "./HomeScreen.css";
import { TaskPaperRepository } from "./storage/repo";

type HomeParams = {
  repo: TaskPaperRepository
}

function HomeScreen(params: HomeParams) {
  let [docs, updateDocs] = useState(null);
  params.repo.loadDocuments()?.then(updateDocs);
  params.repo.on("configured", () => {
    params.repo.loadDocuments().then(updateDocs);
  });

  return (
    <div class="container">
      <h1>DashPaper</h1>

      <ul class="doclist">
        {docs ? docs.map((o) => <li>
          <a href={"/files/" + o.name}>{o.name}</a>
        </li>) : []}
      </ul>
    </div>
  );
}

export default HomeScreen;
