import {
  Box,
  Button,
  Checkbox,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../GoBack/index.js";
import { useDispatch, useSelector } from "react-redux";
import { AddTask, taskStatus } from "../Store/Action.js";

const Home = () => {
  const dispatch = useDispatch();
  const dummyData = useSelector((state) => state.data);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const groupId = queryParams.get("groupId");
  const navigate = useNavigate();
  const [userTask, setUserTask] = useState([]);
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const selectedUser = dummyData.filter(
      (user) => user.id.toString() === userId
    );
    const selectedGroup = selectedUser[0].toDoGroup?.filter(
      (group) => group.groupId.toString() === groupId
    );
    setUserTask(selectedGroup[0].task);
  }, [dummyData]);

  const newID = userId - 1;
  const newGroup = groupId - 1;
  const handleTask = () => {
    dispatch(AddTask({ groupId: newGroup, newID, task }));
    handleClose();
    setTask("");
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
            <Typography variant="h6">
              {dummyData[userId - 1].toDoGroup[newGroup].groupName}
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
              ADD
            </Button>
          </Box>
          {userTask === undefined ? (
            <Typography>No data found</Typography>
          ) : (
            <>
              {userTask.map((item, index) => (
                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  key={item.taskId}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      textDecoration: item.status ? "line-through" : "none",
                    }}
                  >
                    <Checkbox
                      checked={item.status}
                      onChange={() =>
                        dispatch(
                          taskStatus({
                            groupId: newGroup,
                            newID,
                            taskId: item.taskId,
                          })
                        )
                      }
                    />
                    {item.taskName}
                  </Typography>
                  <Typography>-</Typography>
                </Box>
              ))}
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
            Add Task
          </Typography>
          <TextField
            fullWidth
            autoFocus
            focused
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter Task"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
            <Button
              onClick={() => handleTask()}
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

export default Home;
