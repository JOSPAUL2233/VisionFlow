import { useQuery } from "@tanstack/react-query";
import taskApi from "../../api/taskApi";
import { useSelector, useDispatch } from "react-redux";
import TaskTable from "../../components/TaskTable";
import { FolderKanban } from "lucide-react";
import FieldLabel from "../../ui/formElements/FieldLabel";
import InputField from "../../ui/formElements/InputField";
import TextField from "../../ui/formElements/TextField";
import DatePicker from "react-datepicker";
import Select from "../../ui/formElements/Select";
import GreenButton from "../../ui/GreenButton";
import GrayButton from "../../ui/GrayButton";

function TaskDetails({statusList,assignedToList}){

  const {currTask,onEdit} = useSelector((state) => state.task);

//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

    //-----------------------------------GET USER LIST-----------------------------------

    const {data:TaskList=[],isLoading,error,isError} = useQuery({
        queryKey : ["task"],
        queryFn : async () => {
            const res = await taskApi.getTaskListByPid(1);
            console.log("taskList res.data:",res.data);
            return res.data.data;
        }
    });

//#endregion----------------------------------------------------------------------------------------------------------------------------------
    const handleEdit = () => {
        
    };

    const handleReset = () => {
        dispatch(resetCurrProject());
    };

    const handleTaskOpen = (id) => {
    };


    return <>
        <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg mr-3">
            <FolderKanban className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">
            {onEdit ? "Edit Project" : "Add New Project"}
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2 col-span-full">
            <FieldLabel>
                Project Name
            </FieldLabel>
            <InputField
                placeholder="Enter Project Name"
                value={currTask.taskName}
                onChange={(e) => dispatch(setTaskField({ name: "taskName", value: e.target.value }))}
            />
            </div>

            <div className="space-y-2 md:col-span-2 lg:col-span-4">
            <FieldLabel>
                Description
            </FieldLabel>
            <TextField
                placeholder="Enter Description"
                value={currTask.description}
                onChange={(e) => dispatch(setTaskField({ name: "description", value: e.target.value }))}
            />
            </div>
            <div className="space-y-2">
                <FieldLabel>
                    Deadline
                </FieldLabel>
                <DatePicker
                    selected={currTask.deadline ? new Date(currTask.deadline) : null}
                    onChange={(date) => dispatch(setTaskField({ name: "deadline", value: date.toISOString() })) }
                    dateFormat="dd-MM-yyyy"
                    className="w-full bg-gray-100 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800"
                    placeholderText="Select a Deadline"
                    
                />
            </div>

            <div className="space-y-2">
                <FieldLabel>
                    Status
                </FieldLabel>
                <Select
                    value={currTask.status || 0}
                    onChange={(e) =>
                        dispatch(setTaskField({ name: "status", value: Number(e.target.value) }))
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

            <div className="space-y-2 col-span-2">
                <FieldLabel>
                    Assigned To
                </FieldLabel>
                <Select
                    value={currTask.assignedTo || 0}
                    onChange={(e) =>
                        dispatch(setProjectField({ name: "assignedTo", value: Number(e.target.value) }))
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

        </div>

        <div className="flex flex-wrap gap-4">

            <GreenButton 
                // onClick={onEdit ? () => updateTask(currTask) : () => updateTask(currTask)}
            >
            {onEdit ? <Edit3 className="h-4 w-4 mr-2" /> : <FolderKanban className="h-4 w-4 mr-2" />}
            {onEdit ? "Update Task" : "Add Task"}
            </GreenButton>

            {onEdit && (
            <GrayButton onClick={handleReset} >
                <X className="h-4 w-4 mr-2" />
                Cancel
            </GrayButton>
            )}
        </div>
        <TaskTable content={"Task"} taskList={TaskList} handleEdit={handleEdit} handleDelete={handleTaskOpen} handleTaskOpen={handleTaskOpen} />

    </>
}

export default TaskDetails;