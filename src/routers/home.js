import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Hello World",
    data: {},
  });
});

export default homeRouter;
