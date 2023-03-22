import {SBoardItemEmpty} from "./styled";
import TextArea from "../common/input";
import Button from "../common/button";
import React, {FormEvent, memo, useCallback, useImperativeHandle, useMemo, useRef, useState} from "react";
import {IBoard} from "../../utils/types";

interface BoardItemAddProps {
    onAddBoard: Function;
}

export type BoardItemAddHandle = {
    focusInput: () => void;
}

const EmptyBoard: IBoard = {id: 0, title: "", task_ids: []}

const BoardItemAdd = React.forwardRef<BoardItemAddHandle, BoardItemAddProps>(({onAddBoard}, ref) => {
    const [board, setBoard] = useState<IBoard>(EmptyBoard);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => {
        return {
            focusInput() {
                inputRef.current?.focus();
            },
        };
    }, []);

    const onClickAdd = useCallback((e: FormEvent) => {
        e.preventDefault();
        setBoard(EmptyBoard)
        onAddBoard(board);
    }, [onAddBoard, board]);

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBoard(prevState => {
        return {...prevState, title: e.target.value};
    });

    const allowSubmit = useMemo(() => board.title !== "", [board]);

    return (
        <SBoardItemEmpty as={"form"} onSubmit={onClickAdd}>
            <TextArea
                ref={inputRef}
                value={board.title}
                placeholder={"New board"}
                onChange={onInputChange}
            />
            <Button type={"submit"} disabled={!allowSubmit} variant={"primary"}>Add</Button>
        </SBoardItemEmpty>
    );
});

export default memo(BoardItemAdd);
