// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, MenuEntry, MenuItem, Submenu};

fn setup_menu() -> Menu {
    let mut menu =
        Menu::os_default("DashPaper").add_item(CustomMenuItem::new("open", "Open Folder"));
    menu.items = menu
        .items
        .into_iter()
        .map(|m| match m {
            MenuEntry::Submenu(s) if s.title == "File" => MenuEntry::Submenu(Submenu::new(
                s.title,
                s.inner
                    .add_item(CustomMenuItem::new("open", "Open Folder...")),
            )),
            _ => m,
        })
        .collect();

    menu
}

fn main() {
    let menu = setup_menu();
    tauri::Builder::default()
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
