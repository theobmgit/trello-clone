import React, {DragEventHandler, memo, useCallback, useRef, useState} from "react";
import {IModifyTaskPayload, IRemoveTaskPayload, ITask} from "../../utils/types";
import {STaskItem, STaskItemToolBox, STaskTitle} from "./styled";
import Button from "../common/button";
import TextArea from "../common/input";
import {debounce, noop} from "lodash";
import {Draggable} from "../common/drag";
import {ModifyIcon, RemoveIcon} from "../../assets/icons";

interface TaskProps {
    task: ITask;
    onModifyTask: Function;
    onRemoveTask: Function;
}

export interface TaskItemHandle {
    onDragStart: DragEventHandler<HTMLDivElement>;
    onDragEnd: DragEventHandler<HTMLDivElement>;
}

const TaskItem = React.forwardRef<TaskItemHandle, TaskProps>(({task, onModifyTask, onRemoveTask}, ref) => {
    const textInputRef = useRef<HTMLTextAreaElement>(null);
    const taskCardRef = useRef<HTMLFormElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value);

    const toggleIsEditing = () => setIsEditing(prevState => !prevState);

    const focusTextInput = debounce(() => textInputRef.current?.focus(), 100);

    const onClickModify = useCallback(() => {
        toggleIsEditing();
        focusTextInput();
    }, [focusTextInput]);

    const onClickModifyDone = useCallback(() => {
        toggleIsEditing();
        if (title !== task.title) {
            onModifyTask({
                ...task,
                title
            } as IModifyTaskPayload)
        }
    }, [onModifyTask, task, title]);

    const onClickRemove = useCallback(() => onRemoveTask({
        task_id: task.id,
        board_id: task.board_id
    } as IRemoveTaskPayload), [onRemoveTask, task]);

    const onDragStart = useCallback((event: DragEvent) => {
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.setData("text/plain", String(task.id));
        }
    }, [task.id]);

    return (
        <Draggable disabled={isEditing} onDragStart={onDragStart} onDragOver={noop} onDragEnter={noop}
                   onDragLeave={noop} onDrop={noop}>
            <STaskItem ref={taskCardRef} as={"form"} onSubmit={onClickModifyDone}>
                {isEditing ? (
                    <TextArea ref={textInputRef} value={title} onChange={onInputChange}/>
                ) : <STaskTitle onClick={onClickModify}>{task.title}</STaskTitle>}
                <STaskItemToolBox>
                    {isEditing ? (
                        <Button type={"submit"} variant={"success"} onClick={onClickModifyDone}>Done</Button>
                    ) : (
                        <>
                            <Button variant={"icon"} onClick={onClickModify}><ModifyIcon width={20}/></Button>
                            <Button variant={"icon"} onClick={onClickRemove}><RemoveIcon width={20}/></Button>
                        </>
                    )}
                </STaskItemToolBox>
            </STaskItem>
        </Draggable>
    )
});

TaskItem.defaultProps = {
    task: {id: 0, board_id: 0, title: "", description: ""},
    onModifyTask: noop,
    onRemoveTask: noop,
}

export default memo(TaskItem);
