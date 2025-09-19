import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import taskApi from "../../api/taskApi";
import { useDispatch, useSelector } from "react-redux";
import Headline from "../../ui/Headline";
import { Edit3,X, FolderKanban } from "lucide-react";
import TaskTable from "../../components/TaskTable";
import { resetCurrTask, setCurrTask, setField, setOnEdit } from "./TaskSlice";
import FieldLabel from "../../ui/formElements/FieldLabel";
import InputField from "../../ui/formElements/InputField";
import TextField from "../../ui/formElements/TextField";
import DatePicker from "react-datepicker";
import Select from "../../ui/formElements/Select";
import GreenButton from "../../ui/GreenButton";
import GrayButton from "../../ui/GrayButton";
import commonApi from "../../api/commonApi";
import Modal from "../../components/Modal"
import { useState } from "react";
 

function TaskDetails(){

  const {currTask,onEdit} = useSelector((state) => state.task);
    const { user } = useSelector((state) => state.auth);

  const {} = useSelector((state)=>state.project);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET USER LIST-----------------------------------

    const {data:TaskList=[],isLoading,error,isError} = useQuery({
        queryKey : ["tasks"],
        queryFn : async () => {
            const res = await taskApi.getTaskListByUid();
            console.log("taskList res.data:",res.data);
            return res.data.data;
        }
    });


    //-----------------------------------Create Task-----------------------------------
    const { mutate: createTask, isPending: isCreating } = useMutation({
        mutationFn: async (TaskDetails) => {
            return await taskApi.createTask(TaskDetails);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            handleReset();
            toast.success("Task created successfully 🎉");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to create Task ❌");
        },
    });

//-----------------------------------UPDATE Task-----------------------------------
    const { mutate: updateTask, isPending: isUpdating } = useMutation({
        mutationFn: async (taskDetails) => {
            return await taskApi.updateTask(taskDetails);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            handleReset();
            toast.success("Task updated successfully 🎉");
        },
        onError: () => {
            toast.error("Failed to update task ❌");
        },
    });


    //-----------------------------------DELETE Project-----------------------------------
    const { mutate: deleteTask, isPending: isDeleting } = useMutation({
        mutationFn: async (task) => {
            return await taskApi.deleteTask(task); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            toast.success("Task deleted successfully ✅");
        },
        onError: () => {
            toast.error("Failed to delete Task ❌");
        },
    });


    //-------------------------------------GET STATUS LIST---------------------------------
    const { data: statusList = [] } = useQuery({
        queryKey: ["statusList"],
        queryFn: async () => {
            console.log("statusList got called");
            const res = await commonApi.getTaskStatusList();
            console.log("res:",res);
            return res.data.data;
        },
    });
    
    //-------------------------------------GET STATUS LIST---------------------------------
    const { data: assignedToList = [] } = useQuery({
        queryKey: ["assignedToList"],
        queryFn: async () => {
            console.log("assignedToList got called");
            const res = await commonApi.getAssignedToList();
            return res.data.data;
        },
    });
    
    //#endregion----------------------------------------------------------------------------------------------------------------------------------

    const handleEdit = (taskDetails) => {

        dispatch(setOnEdit(true));
        dispatch(setCurrTask(taskDetails))
        
    };

    const handleReset = () => {
        dispatch(resetCurrTask());
        dispatch(setOnEdit(false));
    };
    

    return <>


        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-50 p-6 md:p-8">  
            <div className="max-w-8xl mx-auto">
                <Headline Icon={<FolderKanban className="h-8 w-8 text-white" />} Headline={"Task Details"} SubHeadline={"Manage your task Details here"}/>

                {onEdit && 
                <Modal isOpen={onEdit} onClose={handleReset}>
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg mr-3">
                        <FolderKanban className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-800">
                        {onEdit ? "Edit Task" : "Add New Task"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        
                        {(user.roleId == 1 || user.roleId == 3) && //admin,manager
                            <>
                                <div className="space-y-2 col-span-full">
                                    <FieldLabel>
                                        Task Name
                                    </FieldLabel>
                                    <InputField
                                        placeholder="Enter Task Name"
                                        value={currTask.taskName}
                                        onChange={(e) => dispatch(setField({ name: "taskName", value: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2 lg:col-span-4">
                                <FieldLabel>
                                    Description
                                </FieldLabel>
                                <TextField
                                    placeholder="Enter Description"
                                    value={currTask.description}
                                    onChange={(e) => dispatch(setField({ name: "description", value: e.target.value }))}
                                />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>
                                        Deadline
                                    </FieldLabel>
                                    <DatePicker
                                        selected={currTask.deadline ? new Date(currTask.deadline) : null}
                                        onChange={(date) => dispatch(setField({ name: "deadline", value: date.toISOString() })) }
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
                                value={currTask.status || 0}
                                onChange={(e) =>
                                    dispatch(setField({ name: "status", value: Number(e.target.value) }))
                                }
                            >
                                <option value={0} disabled>
                                Select status
                                </option>
                                {statusList?.map((status) => (
                                    <option key={status.statusId} value={status.statusId}>
                                        {status.statusDesc}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        {(user.roleId == 1 || user.roleId == 3) && //admin,manager
                            <div className="space-y-2 col-span-2">
                                <FieldLabel>
                                    Assigned To
                                </FieldLabel>
                                <Select
                                    value={currTask.assignedTo || 0}
                                    onChange={(e) =>
                                        dispatch(setField({ name: "assignedTo", value: Number(e.target.value) }))
                                    }
                                >
                                    <option value={0} disabled>
                                    Select Individual
                                    </option>
                                    {assignedToList?.map((AssignedTo) => (
                                        <option key={AssignedTo.assignedToId} value={AssignedTo.assignedToId}>
                                            {AssignedTo.assignedToDesc}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        }
                    </div>

                    <div className="flex flex-wrap gap-4">

                        <GreenButton 
                            onClick={() => updateTask(currTask)}
                        >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Update Task
                        </GreenButton>

                        {onEdit && (
                        <GrayButton onClick={handleReset} >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </GrayButton>
                        )}
                    </div>

                </Modal>
                }  

                <TaskTable content={"Task"} taskList={TaskList} handleEdit={handleEdit} handleDelete={deleteTask} />
            </div>
        </div>
    </>
}

export default TaskDetails;