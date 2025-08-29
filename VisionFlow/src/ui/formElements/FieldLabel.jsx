function FieldLabel({children}){
    return <>
        <label className="text-sm font-medium text-slate-700 flex items-center">
            {children}
        </label>
    </>
}

export default FieldLabel;