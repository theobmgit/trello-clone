import {STaskList} from "./styled";
import React, {memo, useCallback, useMemo, useRef} from "react";
import TaskItem from "./index";
import TaskItemAdd from "./TaskItemAdd";
import {useTasks} from "../../context/app-context/TasksContext";
import {IAddTaskPayload, IModifyTaskPayload, IRemoveTaskPayload, ITask} from "../../utils/types";
import {useTasksDispatch} from "../../context/app-context/TasksDispatchContext";
import {TaskActionType} from "../../reducers/tasks";
import {debounce} from "lodash";

interface TaskListProps {
    board_id: number;
}

const TaskList: React.FC<TaskListProps> = ({board_id}) => {
    const state = useTasks();
    const {dispatch} = useTasksDispatch();
    const tasks = useMemo(
        () => state.tasks.filter(task => task.board_id === board_id),
        [state.tasks, board_id]
    );

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const focusTextInput = debounce(() => inputRef.current?.focus(), 100);

    const onAddTask = useCallback((task: ITask) => {
        dispatch({
            type: TaskActionType.ADD_TASK,
            payload: {
                ...task,
                board_id
            } as IAddTaskPayload,
        });
        focusTextInput();
    }, [board_id, dispatch, focusTextInput]);

    const onModifyTask = useCallback((payload: IModifyTaskPayload) => {
        dispatch({
            type: TaskActionType.MODIFY_TASK,
            payload,
        });
    }, [dispatch]);

    const onRemoveTask = useCallback((payload: IRemoveTaskPayload) => {
        dispatch({
            type: TaskActionType.REMOVE_TASK,
            payload,
        });
    }, [dispatch]);

    return (
        <STaskList>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onModifyTask={onModifyTask}
                    onRemoveTask={onRemoveTask}
                />
            ))}
            <TaskItemAdd ref={inputRef} onAddTask={onAddTask}/>
        </STaskList>
    );
};

TaskList.defaultProps = {
    board_id: 0
}

export default memo(TaskList);
