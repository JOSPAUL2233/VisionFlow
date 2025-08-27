import React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrUser,resetCurrUser,setOnEdit, setField } from "./UserSlice";
import usersApi from "../../api/usersAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Users, UserPlus, Edit3, Trash2, X, Mail, Phone, User } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import TableList from "../../components/TableList";


function UserManagement() {
  const queryClient = useQueryClient();

  const initialUser = {
    loginName: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    mailId: "",
    password: "",
    userRoleId:0,
    userId: 0,
    roleId: 0,
    returnId: 0,
  };  

  const {currUser,onEdit} = useSelector((state) => state.user);
  const dispatch = useDispatch();

//#region-------------------------------------------------------API CRUD HANDLING SECTION-----------------------------------------------------

  //-----------------------------------GET USER LIST-----------------------------------
  const { data: list = [], isLoading, error, isError } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
          const res = await usersApi.getUserList();
          console.log("res:",res);
          return res.data.data;
      },
  });
  //-----------------------------------ADD USER-----------------------------------
  const { mutate: registerUser, isPending: isRegistering } = useMutation({
      mutationFn: async (userDetails) => {
        if (!validateUser(userDetails)) {
          throw new Error("Please fill the details!");
        }
        return await usersApi.registerUser(userDetails);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        handleReset();
        toast.success("User registered successfully 🎉");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to register user ❌");
      },
  });
  //-----------------------------------UPDATE USER-----------------------------------
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
      mutationFn: usersApi.updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        handleReset();
        toast.success("User updated successfully 🎉");
      },
      onError: () => {
        toast.error("Failed to update user ❌");
      },
  });
  //-----------------------------------DELETE USER-----------------------------------
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
      mutationFn: async (id) => {
        return await usersApi.deleteUser(id);  // ✅ await ensures rejection is caught
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("User deleted successfully ✅");
      },
      onError: () => {
        toast.error("Failed to delete user ❌");
      },
  });

  //-------------------------------------GET ROLE LIST---------------------------------
    const { data: roleList = [] } = useQuery({
      queryKey: ["roleList"],
      queryFn: async () => {
          const res = await usersApi.getRoles();
          console.log("get roles:",res);
          return res.data.data;
      },
  });


  const validateUser = (userDetails) => {
    return Object.keys(initialUser).some(
      (key) => initialUser[key] !== userDetails[key]
    );
  }

  const handleEdit = (userDetails) => {
    console.log("inside handleEdit,userDetails:",userDetails)
    dispatch(setOnEdit(true));
    dispatch(setCurrUser(userDetails))
  };

  const handleReset = () => {
    dispatch(resetCurrUser());
  };
//#endregion------------------------------------------------------------------------------------------------------------------------

if (isLoading) {
  return (
    <div className="p-12 text-center text-slate-600">Loading users...</div>
  );
}
if (isDeleting) {
  return (
    <div className="p-12 text-center text-slate-600">Deleting user...</div>
  );
}
if (isRegistering) {
  return (
    <div className="p-12 text-center text-slate-600">Registering user...</div>
  );
}
if (isError) {
  return (
    <div className="p-12 text-center text-red-600">
      Error fetching users: {error.message}
    </div>
  );
}
if (isUpdating) {
  return (
    <div className="p-12 text-center text-slate-600">Updating user...</div>
  );
}

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">  
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-slate-600 text-lg">Manage your team members and user accounts</p>
        </div>

{/*----------------------------------------------------------ADD/EDIT USER---------------------------------------------------------- */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg mr-3">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">
              {onEdit ? "Edit User" : "Add New User"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-500" />
                First Name
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                placeholder="Enter first name"
                value={currUser.firstName}
                onChange={(e) => dispatch(setField({name:"firstName", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-500" />
                Last Name
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                placeholder="Enter last name"
                value={currUser.lastName}
                onChange={(e) => dispatch(setField({name:"lastName", value:e.target.value}))}

              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-500" />
                Role
              </label>
              <select
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                value={currUser.userRoleId || 0}
                onChange={(e) =>
                  dispatch(setField({ name: "userRoleId", value: Number(e.target.value) }))
                }
              >
                <option value={0} disabled>
                  Select role
                </option>
                {roleList.map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-slate-500" />
                Phone Number
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                placeholder="Enter phone number"
                value={currUser.phoneNo}
                onChange={(e) => dispatch(setField({name:"phoneNo", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-slate-500" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                placeholder="Enter email address"
                value={currUser.mailId}
                onChange={(e) => dispatch(setField({name:"mailId", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-500" />
                LogIn Name
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                placeholder="Enter last name"
                value={currUser.loginName}
                onChange={(e) => dispatch(setField({name:"loginName", value:e.target.value}))}

              />
            </div>

            {!onEdit && (
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-slate-400"
                  placeholder="Enter password"
                  value={currUser.password}
                onChange={(e) => dispatch(setField({name:"password", value:e.target.value}))}

                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onEdit ? () => updateUser(currUser) : () => registerUser(currUser)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 transform hover:scale-105 flex items-center"
            >
              {onEdit ? <Edit3 className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
              {onEdit ? "Update User" : "Add User"}
            </button>

            {onEdit && (
              <button
                onClick={handleReset}
                className="bg-slate-500 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40 transition-all duration-200 transform hover:scale-105 flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            )}
          </div>
        </div>

{/*----------------------------------------------------------USER LIST---------------------------------------------------------- */}
        <TableList content={"User"}list={list} handleEdit={handleEdit} deleteUser={deleteUser}/>
      </div>
    </div>
  );
}

export default UserManagement;