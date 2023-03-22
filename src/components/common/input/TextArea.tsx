import styled from "styled-components";
import React, {TextareaHTMLAttributes, useState} from "react";

interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const TextArea = React.forwardRef((props: TextInputProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const MAX_LENGTH = 500;
    const [length, setLength] = useState(0);
    const [focused, setFocused] = useState(false);

    const resizeInput = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "0";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 1}px`;
    };

    return (
        <>
            <STextArea
                ref={ref}
                {...props}
                maxLength={MAX_LENGTH}
                onLoad={e => {
                    setLength(e.currentTarget.value.length);
                    props.onLoad && props.onLoad(e);
                }}
                onKeyDown={e => {
                    resizeInput(e);
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const newEvent = new Event("submit", {bubbles: true});
                        e.currentTarget.form?.dispatchEvent(newEvent);
                        setLength(0);
                    }
                    props.onKeyDown && props.onKeyDown(e);
                }}
                onFocus={e => {
                    resizeInput(e);
                    setFocused(true);
                    props.onFocus && props.onFocus(e);
                }}
                onBlur={e => {
                    setFocused(false);
                    props.onBlur && props.onBlur(e);
                }}
                onChange={e => {
                    setLength(e.target.value.length)
                    props.onChange && props.onChange(e);
                }}
            />
            {focused && <small style={{textAlign: "right", position: "relative"}}>{length}/{MAX_LENGTH}</small>}
        </>
    );
});

const STextArea = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  border: none;
  min-height: 2rem;
  background: transparent;
  border-bottom: 1px solid #04b4ed;
  padding-right: 1rem;
  width: 100%;
  resize: none;
`;

export default TextArea;
