import {IBoard, ITask} from "../../utils/types";
import {createContext, useContext} from "react";

export interface TasksContextProps {
    tasks: ITask[];
    boards: IBoard[];
    isSuccess: boolean;
    isError: boolean;
    error: string;
}

export const initialState: TasksContextProps = {
    tasks: [],
    boards: [],
    isSuccess: false,
    isError: false,
    error: "",
};

export const TasksContext = createContext<TasksContextProps>(initialState);

export const useTasks = () => useContext(TasksContext);
