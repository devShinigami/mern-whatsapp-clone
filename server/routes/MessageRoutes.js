import { Router } from "express";
import {
  getContactsWithMessages,
  getMessages,
  sentImage,
  sentMessage,
} from "../controllers/MessageController.js";
import multer from "multer";
const router = Router();

const uploadImage = multer({ dest: "uploads/images" });

router.post("/sent-message", sentMessage);
router.get("/get-messages/:from/:to", getMessages);
router.post("/sent-image", uploadImage.single("image"), sentImage);
router.get("/get-initial-contacts/:from", getContactsWithMessages);

export default router;
