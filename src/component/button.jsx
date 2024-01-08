import React from 'react';

function Button({
    children,
    textColor="text-white",
    bgColor="bg-blue-500",
    type="button",
    className="",
    ...props
}) {
    return (
        <div>
            <button className={`rounded-lg py-3 ${textColor} ${bgColor}  ${className}`}{...props}>{children}</button>
        </div>
    );
}

export default Button;