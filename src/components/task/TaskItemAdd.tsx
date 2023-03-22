import {STaskItemBase} from "./styled";
import TextArea from "../common/input";
import Button from "../common/button";
import React, {memo, useCallback, useMemo, useState} from "react";
import {ITask} from "../../utils/types";

interface TaskItemAddProps {
    onAddTask: Function;
}

const EmptyTask: ITask = {board_id: 0, id: 0, title: ""};

const TaskItemAdd = React.forwardRef(({onAddTask}: TaskItemAddProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const [task, setTask] = useState<ITask>(EmptyTask);

    const allowSubmit = useMemo(() => task.title !== "", [task]);

    const onClickAddTask = useCallback(() => {
        if (allowSubmit) {
            setTask(EmptyTask)
            onAddTask(task)
        }
    }, [allowSubmit, onAddTask, task]);

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTask(prevState => {
        return {...prevState, title: e.target.value};
    });

    return (
        <STaskItemBase as={"form"} onSubmit={onClickAddTask}>
            <TextArea ref={ref} value={task.title} placeholder={"New task"}
                      onChange={onInputChange}/>
            <Button type={"submit"} disabled={!allowSubmit} onClick={onClickAddTask}
                    variant={"primary"}>Add</Button>
        </STaskItemBase>
    );
});

export default memo(TaskItemAdd);
