import React from "react";
import {useTasks} from "../../../context/app-context/TasksContext";
import {ErrorText} from "../index";

interface FeedbackProps {
    children: React.ReactNode;
}

const Feedback: React.FC<FeedbackProps> = ({children}) => {
    const {isError, isSuccess, error} = useTasks();

    return (
        <>
            {children}
            {error !== "" && <ErrorText>{error}</ErrorText>}
        </>
    );
};

export default Feedback;
