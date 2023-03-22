import React, {createContext, useContext} from "react";
import {TaskAction} from "../../reducers/tasks";
import {noop} from "lodash";

export interface TasksDispatchContextProps {
    dispatch: React.Dispatch<TaskAction>;
}

export const TasksDispatchContext = createContext<TasksDispatchContextProps>({
    dispatch: noop
})

export const useTasksDispatch = () => useContext(TasksDispatchContext);
