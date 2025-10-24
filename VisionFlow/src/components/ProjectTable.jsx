import { Users,FolderKanban, UserPlus, Edit3, Trash2, X, Mail, Phone, User, Cone, Clipboard } from "lucide-react";
import DeleteButton from "../ui/DeleteButton";
import EditButton from "../ui/EditButton"
import Col from "../ui/tableElements/Col";
import Td from "../ui/tableElements/Td";
import Tr from "../ui/tableElements/Tr";
import { format } from "date-fns";
import GreenButton from "../ui/GreenButton";
import { useSelector } from "react-redux";


function ProjectTable({content,projectList,handleEdit,handleDelete,handleTaskOpen}){

  const {user} = useSelector((state)=> state.auth)

    return <> 

        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
          
          {(!projectList || projectList.length === 0) ? (

            <div className="p-12 text-center">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FolderKanban className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No {content}s found</h3>
              <p className="text-slate-600">Add your first {content} to get started</p>
            </div>

          ) : (

            <div className="overflow-x-auto">
              <div className="p-8 border-b border-slate-200">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3">
                    <FolderKanban className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">{content} List</h2>
                    <p className="text-slate-600">Total {content}s: {projectList.length}</p>
                  </div>
                </div>
              </div>
              
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Project Name
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Deadline
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Status
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Assigned To
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Assigned By
                    </th>
                    <th className="px-8 py-4 text-center font-semibold text-slate-700 border-b border-slate-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projectList.map((project) => (

                    <Tr key={project.projectId}>
                      <Td>
                        <Col>
                            {project.projectName}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            {project.deadline 
                              ? format(new Date(project.deadline), "dd-MM-yyyy") 
                              : "No Deadline"}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            {project.customStatusDesc}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            {project.assignedToDesc}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            {project.assignedByDesc}
                        </Col>
                      </Td>
                      <Td>
                        <div className="flex justify-center gap-4">
                            
                        {(user.roleId == 1 || user.roleId == 3)&& //admin and manager
                          <>
                            <GreenButton onClick={() => handleTaskOpen(project.projectId)}>
                                <Clipboard className="h-4 w-4 mr-2"/> Tasks
                            </GreenButton>  
                            
                            <GreenButton 
                              onClick={() => handleEdit(project)} 
                              disabled={project.status ==  3|| project.status ==  4}
                            >
                                Update Status
                            </GreenButton>  
                          </>
                        }
                            
                        {(user.roleId == 1 || user.roleId == 2) && //admin and sr.manager
                          <>
                            <EditButton onClick={() => handleEdit(project)}/>
                            <DeleteButton onClick={() => handleDelete(project)}/>
                          </>
                        }
                        
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}
        </div>    
    </>
}
export default ProjectTable;