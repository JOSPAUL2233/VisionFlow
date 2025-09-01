import { Users, UserPlus, Edit3, Trash2, X, Mail, Phone, User, Cone } from "lucide-react";
import DeleteButton from "../ui/DeleteButton";
import EditButton from "../ui/EditButton"
import UserCol from "../ui/tableElements/UserCol";
import Col from "../ui/tableElements/Col";
import Td from "../ui/tableElements/Td";
import Tr from "../ui/tableElements/Tr";
import { resetCurrUser } from "../features/users/UserSlice";
import { useSelector } from "react-redux";


function TableList({content,list,handleEdit,handleDelete}){


  const {currUser} = useSelector(state=>state.user);

    return <>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
          
          {(!list || list.length === 0) ? (

            <div className="p-12 text-center">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No {content}s found</h3>
              <p className="text-slate-600">Add your first {content} to get started</p>
            </div>

          ) : (

            <div className="overflow-x-auto">
              <div className="p-8 border-b border-slate-200">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">{content} List</h2>
                    <p className="text-slate-600">Total {content}s: {list.length}</p>
                  </div>
                </div>
              </div>
              
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Full Name
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      LogIn Name
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Role
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Contact
                    </th>
                    <th className="px-8 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Email
                    </th>
                    <th className="px-8 py-4 text-center font-semibold text-slate-700 border-b border-slate-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {list.map((user) => (

                    <Tr key={user.userId}>
                      <Td>
                        <UserCol id={user.userId} letter={user.firstName.charAt(0).toUpperCase()}>
                            {user.firstName} {user.lastName}
                        </UserCol>
                      </Td>
                      <Td>
                        <Col>
                            {user.loginName}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            {user.roleName}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            <Phone className="h-4 w-4 mr-2 text-slate-500" />
                            {user.phoneNo}
                        </Col>
                      </Td>
                      <Td>
                        <Col>
                            <Mail className="h-4 w-4 mr-2 text-slate-500" />
                            {user.mailId}
                        </Col>
                      </Td>
                      <Td>
                        <div className="flex justify-center gap-4">
                          <EditButton onClick={() => handleEdit(user)}/>
                          <DeleteButton onClick={() => handleDelete(user)}/>
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
export default TableList;