import * as sqlite3 from "sqlite3";
import * as path from "path";

import { environment } from "./main";
import { Task } from "./model"

export namespace data
{
    export let db : sqlite3.Database;

    export function createTasksTable()
    {
        db.serialize(function(){
            db.run("DROP TABLE Tasks;");
            db.run(
            "CREATE TABLE Tasks (" +
                "id INTEGER PRIMARY KEY ASC," +
                "title VARCHAR(255)," +
                "issue VARCHAR(255)," +
                "issueID INTEGER" +
            ");");
        });
    }

    export function addTask(task : Task)
    {
        const url = task.issue.toString();
        db.serialize(function(){
            db.run(
            "INSERT INTO Tasks VALUES (" +
                `NULL, "${task.title}", "${task.issue}", ${task.issueID}` +
            ");");
        });
    }

    export function openDatabase(filename : string) {
        db = new sqlite3.Database(path.join(environment.baseDir, filename));
    };
}
