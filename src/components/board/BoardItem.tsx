import React, {memo, useCallback} from "react";
import {IBoard, IMoveTaskPayload, IRemoveBoardPayload} from "../../utils/types";
import {SBoardItemTitle, SBoardItem} from "./styled";
import Button from "../common/button";
import TaskList from "../task/TaskList";
import {Droppable} from "../common/drag";
import {noop} from "lodash";
import {useTasksDispatch} from "../../context/app-context/TasksDispatchContext";
import {TaskActionType} from "../../reducers/tasks";

interface BoardProps {
    board: IBoard;
}

const BoardItem: React.FC<BoardProps> = ({board}) => {
    const {id, title} = board;
    const {dispatch} = useTasksDispatch();

    const onDragEnter = useCallback((event: DragEvent) => {
    }, [])

    const onDrop = useCallback((event: DragEvent) => {
        if (event.dataTransfer) {
            const task_id = parseInt(event.dataTransfer.getData("text/plain"));

            console.log(task_id)
            dispatch({
                type: TaskActionType.MOVE_TASK,
                payload: {
                    task_id,
                    board_id: id
                } as IMoveTaskPayload,
            });
        }
    }, [dispatch, id]);

    const onDeleteBoard = useCallback(() => {
        dispatch({
            type: TaskActionType.REMOVE_BOARD,
            payload: {
                board_id: id,
            } as IRemoveBoardPayload,
        })
    }, [dispatch, id]);

    return (
        <Droppable
            onDragStart={noop}
            onDragOver={noop}
            onDragEnter={onDragEnter}
            onDragLeave={noop}
            onDrop={onDrop}
        >
            <SBoardItem>
                <SBoardItemTitle>{title}</SBoardItemTitle>
                <TaskList board_id={id}/>
                <Button onClick={onDeleteBoard} variant={"error"}>Delete</Button>
            </SBoardItem>
        </Droppable>
    )
};

export default memo(BoardItem);
