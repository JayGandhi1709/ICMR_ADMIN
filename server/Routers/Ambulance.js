import express from "express";
import bodyParser from "body-parser";
import { AMBULANCEController,AMBULANCEGet } from "../controller/Ambulance.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/AMBULANCE", jsonparser, AMBULANCEController);
router.get("/AMBULANCE", jsonparser, AMBULANCEGet);

export default router;
