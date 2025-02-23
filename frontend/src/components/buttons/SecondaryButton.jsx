export default function SecondaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg cursor-pointer text-sm w-full sm:w-auto px-3 py-1.5 text-center ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
