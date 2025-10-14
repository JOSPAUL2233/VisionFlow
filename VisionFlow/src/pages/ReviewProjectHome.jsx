import { FolderKanban } from "lucide-react";
import Headline from "../ui/Headline";
import ProjectReviewTable from "../components/ProjectReviewTable";
import projectApi from "../api/projectApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TaskModal from "../components/TaskModal";
import TaskTable from "../components/TaskTable";
import { useState } from "react";
import taskApi from "../api/taskApi";
import Modal from "../components/Modal";


function ReviewProjectHome(){

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isReviewModalOpen,setIsReviewModalOpen] = useState(false);

    const [projectId,setProjectId] = useState(0);
    
//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET PROJECT LIST-----------------------------------

    const {data:projectList=[],isLoading,error,isError} = useQuery({
        queryKey : ["reviewProjects"],
        queryFn : async () => {
            const res = await projectApi.getProjectReviewList();
            return res.data.data;
        }
    });

    //-----------------------------------GET USER LIST-----------------------------------

    const {data:TaskList=[]} = useQuery({
        queryKey : ["tasks",projectId],
        queryFn : async () => {
            const res = await taskApi.getTaskListByPid(projectId);
            console.log("taskList res.data:",res.data);
            return res.data.data;
        }
    });

    function handleReview (){



    }

    const handleViewTasks = (projectId) => {
        setProjectId(projectId);
        setIsTaskModalOpen(true);            
    };
    

    return <>
    
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">
                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Review Projects"} SubHeadline={"Manage your Project Reviews here"}/>
                <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
                    <TaskTable mode={"view"} content={"Task"} taskList={TaskList}/>
                </TaskModal>
                <Modal isOpen={isReviewModalOpen} onClose={() => setisReviewModalOpen(false)}>
                    
                </Modal>
                <ProjectReviewTable setProjectId={setProjectId} projectList={projectList} handleReview={handleReview} handleViewTasks={handleViewTasks}/>
            </div>
        </div>
    </>
}

export default ReviewProjectHome;