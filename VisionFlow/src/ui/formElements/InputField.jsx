function InputField(props){
    return <>
        <input
        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
        {...props}
        />
    </>
}

export default InputField;