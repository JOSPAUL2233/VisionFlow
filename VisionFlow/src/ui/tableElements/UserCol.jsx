function UserCol({id,letter,children}){
    return<>
        <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <span className="text-white font-semibold text-sm">
                    {letter}
                </span>
            </div>
        <div>
            <div className="font-semibold text-slate-800">
                {children}
            </div>
                <div className="text-sm text-slate-600">
                    {id && `ID: ${id}`}
                </div>
            </div>
        </div>
    </>
}
export default UserCol;