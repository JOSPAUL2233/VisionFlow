import { FolderKanban } from "lucide-react";
import Headline from "../ui/Headline";
import TaskReviewTable from "../components/shared/TaskReviewTable";
import { useQuery } from "@tanstack/react-query";
import taskApi from "../api/taskApi";

function ReviewTaskHome(){

//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET TASK LIST-----------------------------------
    const {data:TaskList=[],isLoading,error,isError} = useQuery({
        queryKey : ["tasks"],
        queryFn : async () => {
            const res = await taskApi.getTasksUnderReview();
            console.log("taskList res.data:",res.data);
            return res.data.data;
        }
    });
    
//#endregion-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------
    return <>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">
                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Review Tasks"} SubHeadline={"Manage your task Reviews here"}/>
            </div>
            <TaskReviewTable taskList={null} updateStatus={null}/>
        </div>
    </>
}

export default ReviewTaskHome;