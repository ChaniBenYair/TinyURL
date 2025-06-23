import express from "express";
import LinkConrtoller from "../Controllers/LinkConrtoller.js";

const LinkRouter = express.Router();

LinkRouter.get("/", LinkConrtoller.getList);
LinkRouter.get("/:id", LinkConrtoller.getById);
LinkRouter.post("/", LinkConrtoller.add);
LinkRouter.put("/:id", LinkConrtoller.update);
LinkRouter.delete("/:id", LinkConrtoller.delete);

export default LinkRouter;
