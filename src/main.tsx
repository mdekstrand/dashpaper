import { render } from "preact";
import { Router } from "preact-router";

import HomeScreen from "./HomeScreen.tsx";
import FileView from "./FileView.tsx";
import "./styles.css";

import { MenuHandler } from "./desktop/menu.ts";
import { TaskPaperRepository } from "./storage/repo.ts";
import { AppState } from "./desktop/state.ts";

const state = new AppState();
const repo = new TaskPaperRepository();
const menu = new MenuHandler(state, repo);
menu.register();
state.initializeRepo(repo);

const Main = () => (
  <Router>
    <HomeScreen repo={repo} path="/" />
    <FileView path="/files/:name" repo={repo} />
  </Router>
)

render(<Main />, document.getElementById("root")!);
