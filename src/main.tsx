import { render } from "preact";
import App from "./App";
import "./styles.css";

window.onMenuClicked((evt) => {
    console.log("menu clicked: %s", evt);
});

render(<App />, document.getElementById("root")!);
