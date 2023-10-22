import { useState } from "preact/hooks";
import { Item } from "birch-outline";
import "./HomeScreen.css";
import { TaskPaperRepository } from "./storage/repo";

type HomeParams = {
  repo: TaskPaperRepository
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

      <ul class="doclist">
        {docs ? docs.map((o) => <li>
          <a href={"/files/" + o.name}>{o.name}</a>
        </li>) : []}
      </ul>
    </div>
  );
}

export default HomeScreen;
