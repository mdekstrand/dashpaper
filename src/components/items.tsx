import { Fragment, h } from "preact";
import { Item } from "birch-outline";
import { StringObjMap } from "../util/types";

type TaskLineParams = {
  item: Item;
  children?: boolean;
};

type TaskListParams = {
  items: Item[];
};

export function TaskLine(params: TaskLineParams) {
  params.children ??= true;
  let item = params.item;
  let type = item.getAttribute("data-type");
  let classes = ["item", type];
  let attributes: StringObjMap = {};
  for (let attr in item.attributes) {
    let m = attr.match(/^data-(.*)$/);
    if (m) {
      attributes[attr] = item.attributes[attr];
    }
  }
  let filename = item.getAttribute("src-file");
  return (
    <li class={classes.join(" ")} id={"item-" + item.id} {...attributes}>
      <div class="self">
        {item.bodyContentString}
        {filename ? (
          <>
            {" "}
            (<span class="file">{filename}</span>)
          </>
        ) : (
          ""
        )}
      </div>
      {params.children && item.children ? (
        <TaskList items={item.children} />
      ) : null}
    </li>
  );
}

export function TaskList(params: TaskListParams) {
  return (
    <ul>
      {params.items.map((i) => (
        <TaskLine item={i} />
      ))}
    </ul>
  );
}
