function Headline({Icon,Headline,SubHeadline}){
    return <>
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
              {Icon}
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            {Headline}
          </h1>
          <p className="text-slate-600 text-lg">{SubHeadline}</p>
        </div>    
    </>
}

export default Headline;