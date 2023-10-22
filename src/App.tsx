import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { TaskPaperRepository } from "./storage/repo";

type AppParameters = {
  repo: TaskPaperRepository
}

function App(params: AppParameters) {
  let [docs, updateDocs] = useState(null);
  params.repo.on("configured", () => {
    params.repo.loadDocuments().then(updateDocs);
  })

  return (
    <div class="container">
      <h1>DashPaper</h1>

      <ul>
        {docs ? Object.keys(docs).map((n) => <li>{n}</li>) : []}
      </ul>
    </div>
  );
}

export default App;
