import { FolderKanban } from "lucide-react";
import Headline from "../ui/Headline";

function ReviewTaskHome(){
    return <>

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">
                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Review Tasks"} SubHeadline={"Manage your task Reviews here"}/>
            </div>
        </div>
    </>
}

export default ReviewTaskHome;