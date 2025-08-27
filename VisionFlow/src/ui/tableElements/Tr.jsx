function Tr({prop,children}){
    return <>
        <tr {...prop} className="hover:bg-slate-50/50 transition-colors duration-150">
            {children}
        </tr>
    </>
}
export default Tr;