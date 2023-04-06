import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import toast from "react-hot-toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteUser } from "../slices/userSlice";

const DeleteModal = ({ setOpenDeleteModal, openDeleteModal, userId }) => {
  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteUser(userId))
      .then((res) => {
        if (res.payload) {
          toast.success("User Deleted successfully");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
    setOpenDeleteModal(false);
  };

  return (
    <div>
      <Dialog
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
