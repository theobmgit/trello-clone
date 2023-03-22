import React, {ButtonHTMLAttributes} from "react";
import {SDefaultButton, SErrorButton, SIconButton, SPrimaryButton, SSuccessButton} from "./styled";

export type ButtonType = "default" | "primary" | "success" | "error" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonType;
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    switch (props.variant) {
        case "primary":
            return <SPrimaryButton type={"button"} ref={ref} {...props}>{props.children}</SPrimaryButton>
        case "error":
            return <SErrorButton type={"button"} ref={ref} {...props}>{props.children}</SErrorButton>
        case "success":
            return <SSuccessButton type={"button"} ref={ref} {...props}>{props.children}</SSuccessButton>
        case "icon":
            return <SIconButton type={"button"} ref={ref} {...props}>{props.children}</SIconButton>
        default:
            return <SDefaultButton type={"button"} ref={ref} {...props}>{props.children}</SDefaultButton>
    }
});

export default Button;
