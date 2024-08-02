import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoBack from "../GoBack/index.js";
import { AddGroup } from "../Store/Action.js";

const ToDosGroup = () => {
  const dispatch = useDispatch();
  const dummyData = useSelector((state) => state.data);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userGroups, setUserGroups] = useState([]);
  const [group, setGroup] = useState("");
  useEffect(() => {
    const selectedUser = dummyData.filter((user) => user.id == userId);
    if (selectedUser) {
      setUserGroups(selectedUser[0].toDoGroup);
    }
  }, [userId, dummyData]);

  const newID = userId - 1;

  const handleAdd = () => {
    dispatch(AddGroup({ group, newID }));
    handleClose();
    setGroup("");
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
          <GoBack navigate={navigate} />
          <Typography variant="h5">{dummyData[userId - 1].user}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Todos Group</Typography>
            <Button variant="contained" onClick={handleOpen}>
              ADD
            </Button>
          </Box>
          {userGroups === undefined ? (
            <Typography>No data found</Typography>
          ) : (
            <>
              {userGroups.map((item, index) => {
                const allTasksComplete =
                  Array.isArray(item.task) &&
                  item.task.every((task) => task.status);
                return (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    key={index}
                  >
                    <Typography
                      onClick={() => {
                        navigate(
                          `/Home?userId=${userId}&groupId=${item.groupId}`
                        );
                      }}
                      sx={{
                        cursor: "pointer",
                        textDecoration: allTasksComplete
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.groupName}
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                );
              })}
            </>
          )}
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
            Add Todos Group
          </Typography>
          <TextField
            fullWidth
            autoFocus
            focused
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Enter Todo Group"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
            <Button
              onClick={() => handleAdd()}
              sx={{ mt: 2 }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ToDosGroup;
