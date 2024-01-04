import React, { useId } from 'react';

function Select({
    label,
    options,
    className="",
    ...props
} ,ref) {
    const id = useId()
    return (
        <div className='w-full'>
             {label && <label htmlFor={id}>{label}</label>}
                <select id={id} className={`${className} px-3 py-2 w-full bg-gray-200 text-white outline-none rounded-lg border-gray-200 duration-200`} {...props} ref={ref} >
                    {
                        options?.map((option)=>(
                            <option key={option} value={option}> {option}</option>
                        ))
                    }
                </select>
          
            
            
        </div>
    );
}

export default React.forwardRef(Select);