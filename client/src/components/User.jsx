import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import DeleteModal from "./DeleteModal";
import AddEditUser from "./AddEditUser";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUser, retrieveSearchUser } from "../slices/userSlice";
import moment from "moment";

const User = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const error = useSelector((state) => state.users.error);
  console.log("errros---", error);

  console.log("users---", users);
  useEffect(() => {
    dispatch(retrieveUser());
    // setUsers(users);
  }, []);

  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserData, setCurrentUserData] = useState({});
  const [addData, setAddData] = useState(false);

  const handleDelete = (id) => {
    setOpenDeleteModal(true);
    setCurrentUserId(id);
  };

  const handleEdit = (data) => {
    setAddData(false);
    setCurrentUserData(data);
    setOpenEditModal(true);
  };

  const handleAddUser = () => {
    setAddData(true);
    setOpenEditModal(true);
  };

  const handleChange = (e) => {
    dispatch(retrieveSearchUser(e.target.value));
  };

  return (
    <div>
      <Toaster />
      <Box
        width="100%"
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{ boxShadow: 5 }}
      >
        <div>
          <TextField
            // error
            id="outlined-error"
            label="search"
            placeholder="Search here"
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleAddUser} sx={{ ml: 5 }}>
            Add New User
          </Button>
        </div>
        {users && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Date Of Birth</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={`${item?._id}-${index}`}>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.mobile}</td>
                    <td>{moment(item?.dob).format("MM/DD/YYYY")}</td>
                    <td>
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(item)}
                          sx={{ mr: 5 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {openDeleteModal && (
          <DeleteModal
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            userId={currentUserId}
          />
        )}
        {openEditModal && (
          <AddEditUser
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            userId={currentUserId}
            userData={currentUserData}
            isEdit={!addData}
          />
        )}
      </Box>
    </div>
  );
};

export default User;
