import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../slices/userSlice";

const AddEditUser = ({ setOpenEditModal, openEditModal, userData, isEdit }) => {
  let userObj = {
    name: "",
    email: "",
    mobile: "",
    dob: "",
  };

  const dispatch = useDispatch();

  const [Usersdata, setUserData] = useState(isEdit ? userData : userObj);

  const handleClose = () => {
    setOpenEditModal(false);
    setUserData(userObj);
  };

  const handleEdit = async () => {
    if (
      Usersdata.name !== "" &&
      Usersdata.mobile !== "" &&
      userData.email !== "" &&
      Usersdata.dob !== ""
    ) {
      if (isEdit) {
        dispatch(updateUser({ ...Usersdata }))
          .then((data) => {
            if (data) {
              toast.success("Data Updated successfully");
            }
          })
          .catch((err) => {
            toast.error(err);
          });
        setUserData(userObj);
      } else {
        setUserData(userObj);
        dispatch(createUser({ ...Usersdata }))
          .then((data) => {
            console.log("data in component0000--", data);
            if (data.payload.success === true) {
              toast.success(data.payload.message || "User added successfully");
            } else {
              toast.error("Something went wrong");
            }
          })
          .catch((e) => {
            console.log("errr-", e);
            toast.error(e);
          });
      }
    } else {
      toast.error("Data is required");
    }

    setUserData(userObj);
    setOpenEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Dialog open={openEditModal} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Add"}</DialogTitle>
        <DialogContent sx={{ height: "40%" }}>
          <TextField
            autoFocus
            required
            margin="normal"
            name="name"
            label="Name"
            fullWidth
            type="text"
            helperText={!Usersdata?.name ? "Name is required" : "Name added"}
            error={!Usersdata?.name}
            variant="outlined"
            value={Usersdata?.name || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            name="email"
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={Usersdata?.email || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            name="mobile"
            label="Mobile"
            fullWidth
            maxLength="10"
            minLength="10"
            type="mobile"
            error={Usersdata?.mobile === ""}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={Usersdata?.mobile || ""}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            name="dob"
            fullWidth
            type="date"
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEditUser;
