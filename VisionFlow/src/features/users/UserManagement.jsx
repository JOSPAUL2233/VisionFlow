import React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrUser,resetCurrUser,setOnEdit, setField } from "./UserSlice";
import usersApi from "../../api/usersAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Users, UserPlus, Edit3, Trash2, X, Mail, Phone, User } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import TableList from "../../components/TableList";
import Headline from "../../ui/Headline";
import InputField from "../../ui/formElements/InputField";
import FieldLabel from "../../ui/formElements/FieldLabel";
import GreenButton from "../../ui/GreenButton";
import GrayButton from "../../ui/GrayButton";
import Select from "../../ui/formElements/Select";
import Modal from "../../components/Modal";


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
    roleName:"",
    userId: 0,
    roleId: 0,
    returnId: 0,
  };  

  const [isModalOpen, setIsModalOpen] = useState(false);
  //could also be handled locally also
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
        setIsModalOpen(false);
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
        setIsModalOpen(false);
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
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    if(currUser.userId == user.userId){
      dispatch(resetCurrUser());
    }
    deleteUser(user.userId);
  }

  const handleOnClose = () => {
    setIsModalOpen(false);
    dispatch(resetCurrUser());
  }
  
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

        <Headline Icon={<Users className="h-8 w-8 text-white" />} Headline={"User Management"} SubHeadline={"Manage your team members and user accounts"}/>

        <div className="mb-6">
          <GreenButton onClick={() => setIsModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Register User
          </GreenButton>
        </div>


{/*----------------------------------------------------------ADD/EDIT USER---------------------------------------------------------- */}
        
        <Modal isOpen={isModalOpen} onClose={handleOnClose}>
        
        {/* <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-0 border border-white/20"> */}
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
              <FieldLabel>
                <User className="h-4 w-4 mr-2 text-slate-500" />
                First Name
              </FieldLabel>
              <InputField 
                placeholder="Enter first name"
                value={currUser.firstName}
                onChange={(e) => dispatch(setField({name:"firstName", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel>
                <User className="h-4 w-4 mr-2 text-slate-500" />
                Last Name
              </FieldLabel>

              <InputField 
                placeholder="Enter last name"
                value={currUser.lastName}
                onChange={(e) => dispatch(setField({name:"lastName", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel>
                <User className="h-4 w-4 mr-2 text-slate-500" />
                Role
              </FieldLabel>
              <Select
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
              </Select>
            </div>
            
            <div className="space-y-2">
              <FieldLabel>
                <Phone className="h-4 w-4 mr-2 text-slate-500" />
                Phone Number
              </FieldLabel>
              <InputField 
                placeholder="Enter phone number"
                value={currUser.phoneNo}
                onChange={(e) => dispatch(setField({name:"phoneNo", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel>
                <Mail className="h-4 w-4 mr-2 text-slate-500" />
                Email Address
              </FieldLabel>
              <InputField 
                type="email"
                placeholder="Enter email address"
                value={currUser.mailId}
                onChange={(e) => dispatch(setField({name:"mailId", value:e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel>
                <User className="h-4 w-4 mr-2 text-slate-500" />
                LogIn Name
              </FieldLabel>
              <InputField 
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
              <InputField 
                  type="password"
                  placeholder="Enter password"
                  value={currUser.password}
                  onChange={(e) => dispatch(setField({name:"password", value:e.target.value}))}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4">

            <GreenButton
              onClick={onEdit ? () => updateUser(currUser) : () => registerUser(currUser)}
            >
              {onEdit ? <Edit3 className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
              {onEdit ? "Update User" : "Add User"}
            </GreenButton>

            {onEdit && (
              <GrayButton onClick={handleReset} >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </GrayButton>
            )}
          </div>
        {/* </div> */}

        </Modal>
{/*----------------------------------------------------------USER LIST---------------------------------------------------------- */}
        <TableList content={"User"} list={list} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default UserManagement;