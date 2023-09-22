import {PropsWithChildren, ButtonHTMLAttributes} from 'react';

const Button = ({disabled, children, ...props}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
    return (
        <button className={`c-button ${disabled && 'is-disabled'}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
