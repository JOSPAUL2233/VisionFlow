import {Trash2} from "lucide-react";

function DeleteButton(props){
    return<>
        <button
        {...props}
        className="group relative inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 ease-in-out font-medium"
        title="Delete user"
        >
        Delete
        <Trash2 className="pl-1 h-4 w-4" />
        </button>
    </>
}
export default DeleteButton;