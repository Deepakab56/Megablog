import React, { useId } from 'react';


const Input = React.forwardRef(({
    label,
    type = "text",
    className = "",
    ...props

}, ref) => {
    const id = useId()
    return (
        <>
            {label && <label htmlFor={id} className="mb-1 p-1 inline-block" ></label>}
            <input type={type} name="" id={id} className={`text-black bg-white outline-none px-3 py-3 border border-grey-200 rounded-lg duration-200 ${className} `} {...props}  ref={ref} />
        </>
    )
})


export default Input;