function GrayButton({ children, ...props }){
    return <>

        <button
        {...props}
        className="bg-slate-500 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40 transition-all duration-200 transform hover:scale-105 flex items-center"
        >
        {children}
        </button>

    </>
}

export default GrayButton;