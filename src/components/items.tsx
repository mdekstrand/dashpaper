import { Item } from "birch-outline";

type TaskLineParams = {
  item: Item;
  children?: boolean;
}

type TaskListParams = {
  items: Item[];
}

export function TaskLine(params: TaskLineParams) {
  params.children ??= true;
  let item = params.item;
  console.log("item: %o", item);
  let type = item.getAttribute("data-type");
  return (<li class={"item " + type} id={item.id}>
    <div class="self">{item.bodyContentString}</div>
    {params.children && item.children ? <TaskList items={item.children}/> : null}
  </li>)
}

export function TaskList(params: TaskListParams) {
  return (<ul>
    {params.items.map((i) => <TaskLine item={i}/>)}
  </ul>)
}
