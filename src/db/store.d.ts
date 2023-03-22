import {IBoard, ITask} from "../utils/types";

export default interface Store {
    connect: () => boolean;
    clear: () => Promise<void>;

    getAllTasks: () => Promise<ITask[] | null>;
    getAllBoards: () => Promise<IBoard[] | null>;

    setTask: (task: ITask) => Promise<void>;
    setBoard: (board: IBoard) => Promise<void>;

    removeTask: (task_id: string) => Promise<void>;
    removeBoard: (board_id: string) => Promise<void>;

    saveAllTasks: (tasks: ITask[]) => Promise<void>;
    saveAllBoards: (boards: IBoard[]) => Promise<void>;
};
