import { Router } from "express";
import { fetchAllContacts, fetchContactById } from "../controllers/contacts";

const contactsRouter = Router();

// Starts with /contacts endpoint
contactsRouter.get("/", fetchAllContacts);
contactsRouter.get("/:id", fetchContactById);

// contactsRouter.post("/contacts", createContact);

export default contactsRouter;
