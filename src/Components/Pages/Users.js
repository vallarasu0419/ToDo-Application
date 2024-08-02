import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddUser } from "../Store/Action";

const Users = () => {
  const dummyData = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  const handleAdd = () => {
    dispatch(AddUser(name));
    handleClose();
    setName("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "90vh",
          justifyContent: "center",
        }}
      >
        <Box sx={{ minWidth: "400px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">User</Typography>
            <Button variant="contained" onClick={handleOpen}>
              ADD
            </Button>
          </Box>
          {dummyData.map((item, index) => (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              key={index}
            >
              <Typography
                onClick={() => {
                  navigate(`/ToDosGroup?id=${item.id}`);
                }}
                sx={{ cursor: "pointer" }}
              >
                {item.user}
              </Typography>
              <Typography align="left">-</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
          </Typography>
          <TextField
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter User"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
            <Button onClick={handleAdd} sx={{ mt: 2 }} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Users;
