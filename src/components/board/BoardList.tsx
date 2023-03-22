import {SBoardList} from "./styled";
import BoardItem from "./BoardItem";
import React, {memo, useCallback, useRef} from "react";
import BoardItemAdd from "./BoardItemAdd";
import {useTasks} from "../../context/app-context/TasksContext";
import {useTasksDispatch} from "../../context/app-context/TasksDispatchContext";
import {IAddBoardPayload, IBoard} from "../../utils/types";
import {TaskActionType} from "../../reducers/tasks";

interface BoardListProps {
}

const BoardList: React.FC<BoardListProps> = () => {
    const {boards} = useTasks();
    const {dispatch} = useTasksDispatch();
    const boardItemAddRef = useRef<React.ElementRef<typeof BoardItemAdd>>(null);

    const onAddBoard = useCallback((board: IBoard) => {
        dispatch({
            type: TaskActionType.ADD_BOARD,
            payload: {
                ...board,
                task_ids: []
            } as IAddBoardPayload,
        });
        boardItemAddRef.current?.focusInput();
    }, [dispatch]);

    return (
        <SBoardList>
            {boards.map((board) => (
                <BoardItem key={board.id} board={board}/>
            ))}
            <BoardItemAdd ref={boardItemAddRef} onAddBoard={onAddBoard}/>
        </SBoardList>
    );
};

export default memo(BoardList);
