export interface ITask {
    id: number;
    board_id: number;
    title: string;
    description?: string;
}

export interface IBoard {
    id: number;
    title: string;
    task_ids: number[];
}

export interface IMoveTaskPayload {
    task_id: number;
    board_id: number;
}

export interface IAddTaskPayload extends ITask {}

export interface IModifyTaskPayload extends ITask {}

export interface IAddBoardPayload extends IBoard {}

export interface ISetTasksPayload {
    tasks: ITask[];
}

export interface ISetBoardsPayload {
    boards: IBoard[];
}

export interface IRemoveTaskPayload {
    task_id: number;
    board_id: number;
}

export interface IRemoveBoardPayload {
    board_id: number;
}
