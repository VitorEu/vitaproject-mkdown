import express from "express";
import contentHandler from "./util/contentHandler";

const router = express.Router();

router.post("/editor", contentHandler.saveContent);
router.get("/editor/:uuid", contentHandler.getContent)

export default router;