import {initialState, TasksContextProps} from "../../context/app-context/TasksContext";
import {hashCode} from "../../utils";
import {
    IAddBoardPayload,
    IAddTaskPayload,
    IModifyTaskPayload,
    IMoveTaskPayload,
    IRemoveTaskPayload, ISetBoardsPayload,
    ISetTasksPayload,
} from "../../utils/types";
import produce from "immer";
import IndexDB from "../../db";
import {without} from "lodash";

export interface TaskAction {
    type: TaskActionType;
    payload?: any;
}

export enum TaskActionType {
    ADD_TASK = "ADD_TASK",
    REMOVE_TASK = "REMOVE_TASK",
    MODIFY_TASK = "MODIFY_TASK",
    MOVE_TASK = "MOVE_TASK",
    ADD_BOARD = "ADD_BOARD",
    REMOVE_BOARD = "REMOVE_BOARD",

    SET_ALL_TASKS = "SET_ALL_TASKS",
    SET_ALL_BOARDS = "SET_ALL_BOARDS",
    CLEAR_ALL = "CLEAR_ALL",
}

const curriedTasksReducer = produce((draft: TasksContextProps, action: TaskAction) => {
    draft.isSuccess = false;
    draft.isError = false;
    draft.error = "";

    switch (action.type) {
        case TaskActionType.SET_ALL_TASKS: {
            draft.tasks = (action.payload as ISetTasksPayload).tasks;
            break;
        }
        case TaskActionType.SET_ALL_BOARDS: {
            draft.boards = (action.payload as ISetBoardsPayload).boards;
            break;
        }
        case TaskActionType.CLEAR_ALL: {
            draft = initialState;
            break;
        }
        case TaskActionType.ADD_TASK: {
            const payload: IAddTaskPayload = {
                ...action.payload as IAddTaskPayload,
                id: hashCode((action.payload as IAddTaskPayload).title)
            };
            if (draft.tasks.find(item => item.id === payload.id)) {
                draft.isError = true;
                draft.error = "Task already exists";
                break;
            }

            const boardIndex = draft.boards.findIndex(item => item.id === payload.board_id);
            if (boardIndex !== -1) {
                draft.tasks.push({...payload});
                draft.boards[boardIndex].task_ids.push(payload.id);
                Promise.all([
                    IndexDB.setTask({...payload}),
                    IndexDB.setBoard({
                        ...draft.boards[boardIndex],
                        task_ids: [...draft.boards[boardIndex].task_ids, payload.id]
                    }),
                ]).then(() => draft.isSuccess = true).catch(() => draft.isError = true);
            } else {
                draft.isError = true;
                draft.error = "Corresponding board not found"
            }
            break;
        }
        case TaskActionType.REMOVE_TASK: {
            const {task_id, board_id} = action.payload as IRemoveTaskPayload;
            const taskIndex = draft.tasks.findIndex(item => item.id === task_id);
            if (taskIndex !== -1) {
                const boardIndex = draft.boards.findIndex(item => item.id === board_id);
                if (boardIndex !== -1) {
                    const taskIdIndex = draft.boards[boardIndex].task_ids.findIndex(item => item === task_id);
                    draft.tasks.splice(taskIndex, 1);
                    draft.boards[boardIndex].task_ids.splice(taskIdIndex, 1);
                    Promise.all([
                        IndexDB.removeTask(task_id.toString()),
                        IndexDB.setBoard({
                            ...draft.boards[boardIndex],
                            task_ids: without(draft.boards[boardIndex].task_ids, task_id)
                        })
                    ]).then(() => draft.isSuccess = true).catch(() => draft.isError = true);
                }
            } else {
                draft.isError = true;
                draft.error = "Error";
            }
            break;
        }
        case TaskActionType.MODIFY_TASK: {
            const payload = action.payload as IModifyTaskPayload;
            const taskIndex = draft.tasks.findIndex(item => item.id === payload.id);
            if (taskIndex !== -1) {
                draft.tasks[taskIndex] = {...payload};
                IndexDB.setTask({...payload}).then(() => draft.isSuccess = true).catch(() => draft.isError = true);
            } else {
                draft.isError = true;
                draft.error = "Error";
            }
            break;
        }
        case TaskActionType.MOVE_TASK: {
            const {task_id, board_id}: IMoveTaskPayload = action.payload;
            const taskIndex = draft.tasks.findIndex(item => item.id === task_id);
            if (taskIndex !== -1) {
                const fromBoardIndex = draft.boards.findIndex(item => item.id === draft.tasks[taskIndex].board_id);
                const toBoardIndex = draft.boards.findIndex(item => item.id === board_id);
                console.log(fromBoardIndex, toBoardIndex)
                if (fromBoardIndex !== -1 && toBoardIndex !== -1) {
                    const fromTaskIndex = draft.boards[fromBoardIndex].task_ids.findIndex(item => item === task_id);
                    console.log(fromTaskIndex)
                    if (fromTaskIndex !== -1) {
                        // Update task's board_id
                        draft.tasks[taskIndex].board_id = board_id;
                        // Move task to board
                        draft.boards[fromBoardIndex].task_ids.splice(fromTaskIndex, 1);
                        draft.boards[toBoardIndex].task_ids.push(task_id);

                        Promise.all([
                            IndexDB.setTask({
                                ...draft.tasks[taskIndex],
                                board_id
                            }),
                            IndexDB.setBoard({
                                ...draft.boards[fromBoardIndex],
                                task_ids: without(draft.boards[fromBoardIndex].task_ids, task_id)
                            }),
                            IndexDB.setBoard({
                                ...draft.boards[toBoardIndex],
                                task_ids: [...draft.boards[toBoardIndex].task_ids, task_id],
                            }),
                        ]).then(() => draft.isSuccess = true).catch(() => draft.isError = true);
                    }
                }
            } else {
                draft.isError = true;
                draft.error = "Error";
            }
            break;
        }
        case TaskActionType.ADD_BOARD: {
            const payload: IAddBoardPayload = {
                ...action.payload as IAddBoardPayload,
                id: hashCode((action.payload as IAddBoardPayload).title)
            }
            if (draft.boards.find(item => item.id === payload.id)) {
                draft.isError = true;
                draft.error = "Board already exists";
                break;
            }
            draft.boards.push({
                ...payload
            });
            IndexDB.setBoard({...payload}).then(() => draft.isSuccess = true).catch(() => draft.isError = true);
            break;
        }
        case TaskActionType.REMOVE_BOARD: {
            const payload = action.payload as IRemoveTaskPayload;
            const boardIndex = draft.boards.findIndex(item => item.id === payload.board_id);
            if (boardIndex !== -1) {
                draft.boards.splice(boardIndex, 1);
                draft.tasks = draft.tasks.filter(item => item.board_id !== payload.board_id);
                Promise.all([
                    IndexDB.removeBoard(payload.board_id.toString()),
                    ...draft.tasks.map((item) => item.board_id === payload.board_id && IndexDB.removeTask(item.id.toString()))
                ]).then(() => draft.isSuccess = true).catch(() => draft.isError = true);
            } else {
                draft.isError = true;
                draft.error = "Error";
            }
            break;
        }
        default:
            break;
    }
});

export default curriedTasksReducer;
