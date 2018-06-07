import { app, BrowserWindow } from "electron";
import { data } from "./database";
import * as path from "path";
import { Task } from "./model";
import { URL } from "url";

let mainWindow : BrowserWindow;

export namespace environment
{
    export const baseDir: string
        = path.join(__dirname, "..");
    export const srcDir : string
        = path.join(__dirname, "..", "src");
    export const viewDir : string
        = path.join(__dirname, "..", "views");
}

function createMainWindow()
{
    mainWindow = new BrowserWindow({
        width: 600, height: 300,
        minimizable: false, maximizable: false, fullscreenable: false,
        skipTaskbar: true, title: "Test Application", frame: false,
        alwaysOnTop: true
    });
    const filepath : string = path.join(environment.viewDir, "mainwindow.html");
    mainWindow.loadFile(filepath);
    mainWindow.on('closed', () => { mainWindow = null; });

    data.openDatabase("database.db");
    data.createTasksTable();

    const task : Task = new Task();
    task.title = "Initial Task";
    task.issue = new URL("https://github.com/jsren/time-tracker");
    data.addTask(task);

    console.log("Hello World!");
}

app.on('ready', createMainWindow);
app.on('window-all-closed', () => { app.quit(); });
