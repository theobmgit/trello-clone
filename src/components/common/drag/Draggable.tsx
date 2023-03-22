import React, {memo, useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import theme from "../../../utils/theme";

export interface DragNDropProps {
    onDragStart: { (event: DragEvent): void },
    onDragOver: { (event: DragEvent): void },
    onDragEnter: { (event: DragEvent): void },
    onDragLeave: { (event: DragEvent): void },
    onDrop: { (event: DragEvent): void },
}

interface DraggableProps extends DragNDropProps {
    disabled?: boolean;
    children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = (props) => {
    const draggableRef = useRef<HTMLDivElement>(null);

    const dragHandler = useCallback((event: DragEvent) => {
        switch (event.type) {
            case "dragstart":
                props.onDragStart(event);
                break;
        }
    }, [props]);

    useEffect(() => {
        const ref = draggableRef.current;
        if (!props.disabled) {
            draggableRef.current?.addEventListener("dragstart", dragHandler);
        }

        return function () {
            ref?.removeEventListener("dragstart", dragHandler);
        }
    }, [dragHandler, props.disabled]);

    return (
        <DragItem ref={draggableRef} draggable={!props.disabled}>
            {props.children}
        </DragItem>
    );
};

Draggable.defaultProps = {
    disabled: false
}

const DragItem = styled.div`
  border-radius: ${theme.borderRadius.default};
`;

export default memo(Draggable);
