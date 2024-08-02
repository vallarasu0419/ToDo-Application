import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../DummyData.js";

const itemsString = localStorage.getItem("data");
const itemsArray = JSON.parse(itemsString);

const initialState = itemsArray ?? dummyData;

const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    AddUser(state, action) {
      const userName = action.payload;
      state.push({ id: state.length + 1, user: userName });
      localStorage.setItem("data", JSON.stringify(state));
    },

    AddGroup(state, action) {
      const { group, newID } = action.payload;
      if (state[newID].hasOwnProperty("toDoGroup")) {
        const updatedToDoGroup = [
          ...state[newID].toDoGroup,
          { groupId: state[newID].toDoGroup.length + 1, groupName: group },
        ];
        state[newID] = {
          ...state[newID],
          toDoGroup: updatedToDoGroup,
        };
      } else {
        state.push({
          ...state[newID],
          toDoGroup: [{ groupId: 1, groupName: group }],
        });
        state.splice(newID, 1);
      }

      localStorage.setItem("data", JSON.stringify(state));
    },

    AddTask(state, action) {
      const { groupId, newID, task } = action.payload;
      if (state[newID].toDoGroup[groupId].hasOwnProperty("task")) {
        const updatedTask = [
          ...state[newID].toDoGroup[groupId].task,
          {
            taskId: state[newID].toDoGroup[groupId].task.length + 1,
            taskName: task,
            status: false,
          },
        ];
        state[newID].toDoGroup[groupId] = {
          ...state[newID].toDoGroup[groupId],
          task: updatedTask,
        };
      } else {
        const newTask = { taskId: 1, taskName: task, status: false };

        state[newID].toDoGroup[groupId] = {
          ...state[newID].toDoGroup[groupId],
          task: [newTask],
        };
      }

      localStorage.setItem("data", JSON.stringify(state));
    },
    taskStatus(state, action) {
      const { groupId, newID, taskId } = action.payload;
      state[newID].toDoGroup[groupId].task[taskId - 1] = {
        taskId: state[newID].toDoGroup[groupId].task[taskId - 1].taskId,
        taskName: state[newID].toDoGroup[groupId].task[taskId - 1].taskName,
        status:
          state[newID].toDoGroup[groupId].task[taskId - 1].status === true
            ? false
            : true,
      };
      localStorage.setItem("data", JSON.stringify(state));
    },
  },
});

export default DataSlice.reducer;
export const { AddUser, AddGroup, AddTask, taskStatus } = DataSlice.actions;
