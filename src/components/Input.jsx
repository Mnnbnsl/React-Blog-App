import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                <label 
                    className="block text-sm font-medium text-gray-700 mb-2" 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
})

export default Input