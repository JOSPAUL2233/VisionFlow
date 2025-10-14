import { FolderKanban } from "lucide-react";

function TaskReviewTable({taskList,updateStatus}){
    return <>
        <div className="bg-white/80 backdrop-blur-sm shadow-xl mt-10 rounded-2xl border border-white/20 overflow-hidden">
          
          {(!taskList || taskList.length === 0) ? (

            <div className="p-12 text-center">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FolderKanban className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Tasks found</h3>
              <p className="text-slate-600">Tasks under review will appear here!</p>
            </div>

          ) : null}
        </div>
    </>
}

export default TaskReviewTable;