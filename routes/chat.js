import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments, getMessages, getChatDetails, renameGroup, deleteChat } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated)

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

app.put("/removemember", removeMemberValidator(),
    validateHandler, removeMember);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// send attachments
app.post("/message", attachmentsMulter, sendAttachmentsValidator(),
    validateHandler, sendAttachments)

// get messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// get chat details, rename, details
app.route("/:id")
    .get(chatIdValidator(), validateHandler, getChatDetails)
    .put(renameValidator(), validateHandler, renameGroup)
    .delete(chatIdValidator(), validateHandler, deleteChat)


export default app;