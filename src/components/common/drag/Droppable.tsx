import {DragNDropProps} from "./Draggable";
import React, {memo, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import theme from "../../../utils/theme";

interface DroppableProps extends DragNDropProps {
    disabled?: boolean;
    children: ReactNode;
}

const Droppable: React.FC<DroppableProps> = (props) => {
    const droppableRef = useRef<HTMLDivElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const dropHandler = useCallback((event: DragEvent) => {
        event.stopPropagation();
        switch (event.type) {
            case "dragenter":
                event.preventDefault();
                setIsDragOver(true);
                props.onDragEnter(event);
                break;
            case "dragleave":
                event.preventDefault();
                setIsDragOver(false);
                props.onDragLeave(event);
                break;
            case "drop":
                event.preventDefault();
                setIsDragOver(false);
                props.onDrop(event);
                break;
        }
    }, [props]);

    useEffect(() => {
        const ref = droppableRef.current;
        droppableRef.current?.addEventListener("dragenter", dropHandler);
        droppableRef.current?.addEventListener("dragleave", dropHandler);
        droppableRef.current?.addEventListener("drop", dropHandler);

        return function () {
            ref?.removeEventListener("dragenter", dropHandler);
            ref?.removeEventListener("dragleave", dropHandler);
            ref?.removeEventListener("drop", dropHandler);
        };
    }, [dropHandler]);

    return (
        <div ref={droppableRef} onDragOver={e => e.preventDefault()}>
            {isDragOver ? <DropZone>{props.children}</DropZone> : props.children}
        </div>
    );
};

const DropZone = styled.div`
  box-shadow: rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px;
  border-radius: ${theme.borderRadius.default};
`;

export default memo(Droppable);
