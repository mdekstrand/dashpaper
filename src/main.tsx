import { render } from "preact";
import HomeScreen from "./HomeScreen.tsx";
import "./styles.css";

import { MenuHandler } from "./desktop/menu.ts";
import { TaskPaperRepository } from "./storage/repo.ts";
import { AppState } from "./desktop/state.ts";

const state = new AppState();
const repo = new TaskPaperRepository();
const menu = new MenuHandler(state, repo);
menu.register();
state.initializeRepo(repo);

render(<HomeScreen repo={repo} />, document.getElementById("root")!);
