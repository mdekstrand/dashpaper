import { Item } from "birch-outline";

type TaskLineParams = {
  item: Item;
}

type TaskListParams = {
  items: Item[];
}

export function TaskLine(params: TaskLineParams) {
  let item = params.item;
  console.log("item: %o", item);
  let type = item.getAttribute("data-type");
  return (<li class={"item " + type} id={item.id}>
    <div class="self">{item.bodyContentString}</div>
    {item.children ? <TaskList items={item.children}/> : null}
  </li>)
}

export function TaskList(params: TaskListParams) {
  return (<ul>
    {params.items.map((i) => <TaskLine item={i}/>)}
  </ul>)
}
