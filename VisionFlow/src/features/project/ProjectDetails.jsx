import React,{ useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import projectApi from "../../api/projectApi";
import commonApi from "../../api/commonApi";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import ProjectTable from "../../components/ProjectTable";
import { setField as setProjectField, setCurrProject, resetCurrProject, setOnEdit as setProjectOnEdit, initialProject } from "./ProjectSlice";
import { setField as setTaskField } from "../task/TaskSlice";
import {setProjectId } from "../task/TaskSlice";
import { Edit3, FolderKanban, UserPlus, Users, X,Clipboard } from "lucide-react";
import Headline from "../../ui/Headline";
import InputField from "../../ui/formElements/InputField";
import FieldLabel from "../../ui/formElements/FieldLabel";
import GreenButton from "../../ui/GreenButton";
import GrayButton from "../../ui/GrayButton";
import Select from "../../ui/formElements/Select";
import ProjectModal from "../../components/ProjectModal";
import TextField from "../../ui/formElements/TextField";
import ModalTaskDetails from "../task/ModalTaskDetails";
import TaskModal from "../../components/TaskModal";
import ConfirmationModal from "../../ui/ConfirmationModal";

function ProjectDetails(){

    const queryClient = useQueryClient();

    const [isProjectModalOpen, setisProjectModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const {currProject,onEdit} = useSelector((state) => state.project);
    const {currTask} = useSelector((state) => state.task);
    
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET PROJECT LIST-----------------------------------

    const {data:projectList=[],isLoading,error,isError} = useQuery({
        queryKey : ["projects"],
        queryFn : async () => {
            const res = await projectApi.getProjectList();
            return res.data.data;
        }
    });

    //-----------------------------------Create Project-----------------------------------
    const { mutate: createProject, isPending: isCreating } = useMutation({
        mutationFn: async (ProjectDetails) => {
            if (!validateProject(ProjectDetails)) {
            throw new Error("Please fill the details!");
            }
            return await projectApi.createProject(ProjectDetails);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            handleReset();
            setisProjectModalOpen(false);
            toast.success("projects created successfully 🎉");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to create project ❌");
        },
    });

    //-----------------------------------DELETE Project-----------------------------------
    const { mutate: deleteProject, isPending: isDeleting } = useMutation({
        mutationFn: async (project) => {
            return await projectApi.deleteProject(project); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            toast.success("Project deleted successfully ✅");
        },
        onError: () => {
            toast.error("Failed to delete Project ❌");
        },
    });
    //-----------------------------------UPDATE Project-----------------------------------
    const { mutate: updateProject, isPending: isUpdating } = useMutation({
        mutationFn: async (projectDetails) => {
            return await projectApi.updateProject(projectDetails);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            handleReset();
            setisProjectModalOpen(false);
            toast.success("Project updated successfully 🎉");
        },
        onError: (error) => {
            if (error.message !== "User cancelled sending for review") {
            toast.error("Failed to update Project ❌");
            }
        },
    });

    //-------------------------------------GET STATUS LIST---------------------------------
    const { data: ProjectStatusList = [] } = useQuery({
        queryKey: ["ProjectStatusList",currProject.projectId],
        queryFn: async () => {
            const res = await commonApi.getProjectStatusList(currProject.projectId);
            return res.data.data;
        },
    });
    const { data: TaskStatusList = [] } = useQuery({
        queryKey: ["TaskStatusList",currTask.taskId],
        queryFn: async () => {
            const res = await commonApi.getTaskStatusList(currTask.taskId);
            return res.data.data;
        },
    });
    
    //-------------------------------------GET ASSIGNED TO LIST---------------------------------
    const { data: assignedToList = [] } = useQuery({
        queryKey: ["assignedToList"],
        queryFn: async () => {
            const res = await commonApi.getAssignedToList();
            return res.data.data;
        },
    });

    const handleEdit = (projectDetails) => {
        dispatch(setProjectOnEdit(true));
        dispatch(setCurrProject(projectDetails));
        setisProjectModalOpen(true);
    };

//#endregion------------------------------------------------------------------------------------------------------------------------

    const validateProject = (projectDetails) => {
        return Object.keys(initialProject).some(
            (key) => initialProject[key] !== projectDetails[key]
        );
    }

    const handleProjectOnClose = () => {
        setisProjectModalOpen(false);
        dispatch(resetCurrProject());
    }
    
    const handleReset = () => {
        dispatch(resetCurrProject());
        // dispatch(setTaskField({name:"projectId",value:projectId}));
        dispatch(setTaskField({name:"projectId",value:1}));
    };

    const handleTaskOpen = (projectId) => {
        dispatch(setTaskField({name:"projectId",value:projectId}));
        setIsTaskModalOpen(true);            
    };


  const handleUpdateClick = () => {
        if (currProject.status === 4) {
            setConfirmOpen(true); // open modal
        } else {
            updateProject(currProject);
        }
  };


    if (isLoading) {
        return (
            <div className="p-12 text-center text-slate-600">Loading Projects...</div>
        );
    }

    if (isError) {
        return (
            <div className="p-12 text-center text-red-600">
            Error fetching Projects: {error.message}
            </div>
        );
    }

    if (isCreating) {
        return (
            <div className="p-12 text-center text-slate-600">Creating Project...</div>
        );
    }

    if (isDeleting) {
        return (
            <div className="p-12 text-center text-slate-600">Deleting user...</div>
        );
    }
    if (isUpdating) {
        return (
            <div className="p-12 text-center text-slate-600">Updating Project...</div>
        );
    }

    return <>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">

                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Project Details"} SubHeadline={"Manage your project Details here"}/>
                {(user.roleId == 1 || user.roleId == 2) && //admin and sr.manager
                    <div className="mb-6">
                        <GreenButton onClick={() => setisProjectModalOpen(true)}>
                            <FolderKanban className="h-4 w-4 mr-2" />
                            Create Project
                        </GreenButton>
                    </div>
                }

                <ConfirmationModal
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={() => {
                        updateProject(currProject); // use redux currProject directly
                        setConfirmOpen(false);
                    }}
                    title="Send for Review?"
                    message="Do you want to send this project for review?"
                />
                <ProjectModal isOpen={isProjectModalOpen} onClose={handleProjectOnClose}>
                
                    {/* <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-0 border border-white/20"> */}
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg mr-3">
                        <FolderKanban className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-800">
                        {onEdit ? "Edit Project" : "Add New Project"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        

                        {(user.roleId == 1 || user.roleId == 2)&& //admin and sr.manager, not for manager
                        <>
                            <div className="space-y-2 col-span-full">
                                <FieldLabel>
                                    Project Name
                                </FieldLabel>
                                <InputField
                                    placeholder="Enter Project Name"
                                    value={currProject.projectName}
                                    onChange={(e) => dispatch(setProjectField({ name: "projectName", value: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-4">
                                <FieldLabel>
                                    Description
                                </FieldLabel>
                                <TextField
                                    placeholder="Enter Description"
                                    value={currProject.description}
                                    onChange={(e) => dispatch(setProjectField({ name: "description", value: e.target.value }))}
                                />
                                </div>
                            <div className="space-y-2">
                                <FieldLabel>
                                    Deadline
                                </FieldLabel>
                                <DatePicker
                                    selected={currProject.deadline ? new Date(currProject.deadline) : null}
                                    onChange={(date) => dispatch(setProjectField({ name: "deadline", value: date.toISOString() })) }
                                    dateFormat="dd-MM-yyyy"
                                    className="w-full bg-gray-100 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800"
                                    placeholderText="Select a Deadline"
                                />
                            </div>                        
                        </>
                        }

                        <div className="space-y-2">
                            <FieldLabel>
                                Status
                            </FieldLabel>
                            <Select
                                value={currProject.status || 0}
                                onChange={(e) =>
                                    dispatch(setProjectField({ name: "status", value: Number(e.target.value) }))
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

                        {(user.roleId == 1 || user.roleId == 2)&& //admin and sr.manager, not for manager
                        <>
                            <div className="space-y-2 col-span-2">
                                <FieldLabel>
                                    Assigned To 
                                </FieldLabel>
                                <Select
                                    value={currProject.assignedTo || 0}
                                    onChange={(e) =>
                                        dispatch(setProjectField({ name: "assignedTo", value: Number(e.target.value) }))
                                    }
                                >
                                    <option value={0} disabled>
                                    Select Individual
                                    </option>
                                    {assignedToList.map((AssignedTo) => (
                                        <option key={AssignedTo.assignedToId} value={AssignedTo.assignedToId}>
                                            {AssignedTo.assignedToDesc}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </>
                        }

                    </div>

                    <div className="flex flex-wrap gap-4">

                        <GreenButton
                            onClick={onEdit ? handleUpdateClick : () => createProject(currProject)}
                        >
                            {onEdit ? <Edit3 className="h-4 w-4 mr-2" /> : <FolderKanban className="h-4 w-4 mr-2" />}
                            {onEdit ? "Update Project" : "Add Project"}
                        </GreenButton>

                        {onEdit && (
                        <GrayButton onClick={handleReset} >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </GrayButton>
                        )}
                    </div>

                </ProjectModal>

                <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
                    <ModalTaskDetails statusList={TaskStatusList} assignedToList={assignedToList}/>
                </TaskModal>

                <ProjectTable content={"Project"} projectList={projectList} handleEdit={handleEdit} handleDelete={deleteProject} handleTaskOpen={handleTaskOpen}/>

            </div>
        </div>
    </>
}
export default ProjectDetails;