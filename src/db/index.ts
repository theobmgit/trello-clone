import * as localforage from "localforage";
import {DB_NAME, DB_TABLES} from "../consts";
import Store from "./store";
import {IBoard, ITask} from "../utils/types";

const TasksTable = localforage.createInstance({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    name: DB_NAME,
    storeName: DB_TABLES.TASKS,
});

const BoardsTable = localforage.createInstance({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    name: DB_NAME,
    storeName: DB_TABLES.BOARDS,
});

const IndexDB: Store = {
    connect: function () {
        throw new Error("Function not implemented.");
    },
    clear: async () => {
        await TasksTable.clear();
        await BoardsTable.clear();
    },

    getAllBoards: async () => {
        let boards: IBoard[] = [];
        await BoardsTable.iterate((value) => {
            boards.push(value as IBoard);
        });
        return boards;
    },
    getAllTasks: async () => {
        let tasks: ITask[] = [];
        await TasksTable.iterate((value) => {
            tasks.push(value as ITask);
        });
        return tasks;
    },

    saveAllBoards: async (boards) => {
        await Promise.all(boards.map(async (board) =>
            await BoardsTable.setItem(board.id.toString(), board)
        ));
    },
    saveAllTasks: async (tasks) => {
        await Promise.all(tasks.map(async (task) =>
            await TasksTable.setItem(task.id.toString(), task)
        ));
    },

    setTask: async (task) => {
        await TasksTable.setItem(task.id.toString(), task);
    },

    setBoard: async (board) => {
      await BoardsTable.setItem(board.id.toString(), board);
    },

    removeTask: async (task_id) => {
        await TasksTable.removeItem(task_id);
    },

    removeBoard: async (board_id) => {
        await BoardsTable.removeItem(board_id);
    },
};

export default IndexDB;
