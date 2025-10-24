import { Edit3, FolderKanban, X } from "lucide-react";
import Headline from "../ui/Headline";
import ProjectReviewTable from "../components/ProjectReviewTable";
import projectApi from "../api/projectApi";
import commonApi from "../api/commonApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TaskModal from "../components/TaskModal";
import TaskTable from "../components/TaskTable";
import { useState } from "react";
import taskApi from "../api/taskApi";
import Modal from "../components/Modal";
import {resetCurrProject, setCurrProject, setField} from "../features/project/ProjectSlice";
import Select from "../ui/formElements/Select";
import FieldLabel from "../ui/formElements/FieldLabel";
import TextField from "../ui/formElements/TextField";
import { useDispatch, useSelector } from "react-redux";
import GreenButton from "../ui/GreenButton";
import ConfirmationModal from "../ui/ConfirmationModal";


function ReviewProjectHome(){
    const queryClient = useQueryClient();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isReviewModalOpen,setIsReviewModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const {currProject,onEdit} = useSelector((state) => state.project);
    const dispatch = useDispatch();

    const [projectId,setProjectId] = useState(0);
    
//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET PROJECT LIST-----------------------------------

    const {data:projectList=[],isLoading,error,isError} = useQuery({
        queryKey : ["reviewProjects"],
        queryFn : async () => {
            const res = await projectApi.getProjectReviewList();
            console.log("project to review list:",res.data);
            return res.data.data;
        }
    });

    //-----------------------------------GET TASK LIST-----------------------------------

    const {data:TaskList=[]} = useQuery({
        queryKey : ["tasks",projectId],
        queryFn : async () => {
            const res = await taskApi.getTaskListByPid(projectId);
            console.log("taskList res.data:",res.data);
            return res.data.data;
        }
    });
    //-----------------------------------GET STATUS LIST-----------------------------------
    const { data: ProjectStatusList = [] } = useQuery({
        queryKey: ["ProjectStatusList",currProject.projectId],
        queryFn: async () => {
            const res = await commonApi.getProjectStatusList(currProject.projectId);
            return res.data.data;
        },
    });

    //-----------------------------------UPDATE Project-----------------------------------
    const { mutate: updateProject, isPending: isUpdating } = useMutation({
        mutationFn: async (projectDetails) => {
            return await projectApi.updateProject(projectDetails);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviewProjects"]);
            setIsReviewModalOpen(false);
            toast.success("Project updated successfully 🎉");
        },
        onError: (error) => {
            if (error.message !== "User cancelled sending for review") {
            toast.error("Failed to update Project ❌");
            }
        },
    });


    function handleReview (projectDetails){
        setIsReviewModalOpen(true);
        dispatch(setCurrProject(projectDetails));
    }
    const handleReviewOnClose = () => {
        setIsReviewModalOpen(false);
        dispatch(resetCurrProject());
    }

    const handleViewTasks = (projectId) => {
        setProjectId(projectId);
        setIsTaskModalOpen(true);            
    };

    const handleUpdateClick = () => {
        setConfirmOpen(true);
    };

    return <>

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">
                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Review Projects"} SubHeadline={"Manage your Project Reviews here"}/>
                <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
                    <TaskTable mode={"view"} content={"Task"} taskList={TaskList}/>
                </TaskModal>

                <ConfirmationModal
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={() => {
                        updateProject(currProject); // use redux currProject directly
                        setConfirmOpen(false);
                    }}
                    title="Update Review Status?"
                    message="Do you want to update the status for this review?"
                />
                <Modal isOpen={isReviewModalOpen} onClose={handleReviewOnClose}>
                    
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg mr-3">
                        <FolderKanban className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-800">
                            Review Project
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="space-y-2">
                            <FieldLabel>
                                Status
                            </FieldLabel>
                            <Select
                                value={currProject.status || 0}
                                onChange={(e) =>
                                    dispatch(setField({ name: "status", value: Number(e.target.value) }))
                                }
                            >
                                <option value={0}>
                                Select status
                                </option>
                                {ProjectStatusList.map((status) => (
                                    <option key={status.statusId} value={status.statusId}>
                                        {status.statusDesc}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2 md:col-span-2 lg:col-span-4">
                        <FieldLabel>
                            Review Description
                        </FieldLabel>
                        <TextField
                            placeholder="Enter Review Description"
                            value={currProject.projectReview || ''}
                            onChange={(e) => dispatch(setField({ name: "projectReview", value: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">

                        <GreenButton
                            onClick={handleUpdateClick}
                        >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Update Status
                        </GreenButton>

                        {/* {onEdit && (
                        <GrayButton onClick={handleReset} >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </GrayButton>
                        )} */}
                    </div>
                    
                </Modal>
                <ProjectReviewTable setProjectId={setProjectId} projectList={projectList} handleReview={handleReview} handleViewTasks={handleViewTasks}/>
            </div>
        </div>
    </>
}

export default ReviewProjectHome;