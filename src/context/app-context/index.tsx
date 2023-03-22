import {initialState, TasksContext} from "./TasksContext";
import {TasksDispatchContext} from "./TasksDispatchContext";
import {useEffect, useMemo, useReducer} from "react";
import curriedTasksReducer, {TaskActionType} from "../../reducers/tasks";
import IndexDB from "../../db";

const AppProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(curriedTasksReducer, initialState);

    useEffect(() => {
        const fetch = async () => {
            const tasks = await IndexDB.getAllTasks();
            const boards = await IndexDB.getAllBoards();
            return {tasks, boards};
        };
        fetch().then(({tasks, boards}) => {
            boards && dispatch({type: TaskActionType.SET_ALL_BOARDS, payload: {boards}});
            tasks && dispatch({type: TaskActionType.SET_ALL_TASKS, payload: {tasks}});
        });
    }, []);

    const appContextState = useMemo(() => {
        return {
            state,
            dispatch,
        };
    }, [state])

    return (
        <TasksContext.Provider value={appContextState.state}>
            <TasksDispatchContext.Provider value={{dispatch: appContextState.dispatch}}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
};

export default AppProvider;
