import {Edit3} from "lucide-react";

function EditButton(props){
    return <>
        <button
        {...props}
        className="group relative inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 ease-in-out font-medium"
        title="Edit user"
        >
        Edit 
        <Edit3 className="pl-1 h-4 w-4"/>
        </button>
    </>
}

export default EditButton;