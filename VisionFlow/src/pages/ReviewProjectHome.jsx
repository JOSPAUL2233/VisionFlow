import { FolderKanban } from "lucide-react";
import Headline from "../ui/Headline";
import ProjectReviewTable from "../components/ProjectReviewTable";
import projectApi from "../api/projectApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


function ReviewProjectHome(){
//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET PROJECT LIST-----------------------------------

    const {data:projectList=[],isLoading,error,isError} = useQuery({
        queryKey : ["reviewProjects"],
        queryFn : async () => {
            const res = await projectApi.getProjectReviewList();
            return res.data.data;
        }
    });

    function handleReview (){}
    function handleViewTasks (){}

    return <>
    
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">
                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Review Projects"} SubHeadline={"Manage your Project Reviews here"}/>
                <ProjectReviewTable projectList={projectList} handleReview={handleReview} handleViewTasks={handleViewTasks}/>
            </div>
        </div>
    </>
}

export default ReviewProjectHome;