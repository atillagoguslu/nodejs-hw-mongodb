import { Router } from "express";
import { fetchAllContacts, fetchContactById } from "../controllers/contacts";
import ctrlWrapper from "../utils/ctrlWrapper";
const contactsRouter = Router();

// Starts with /contacts endpoint
contactsRouter.get("/", ctrlWrapper(fetchAllContacts));
contactsRouter.get("/:id", ctrlWrapper(fetchContactById));

// contactsRouter.post("/contacts", createContact);

export default contactsRouter;
