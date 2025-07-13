import React, { useId, forwardRef } from 'react'

const Select = forwardRef(function Select({
    options,
    label,
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
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
})

export default Select