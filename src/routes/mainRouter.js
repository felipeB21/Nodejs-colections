const { Router } = require("express");
const mainController = require("../controller/mainController");
const userController = require("../controller/userController");
const router = Router();
const validatorRegister = require("../validator/register");
const validatorLogin = require("../validator/login");
const middlewareRegister = require("../middleware/register");
const middlewareLogin = require("../middleware/login");
const authLogin = require("../middleware/auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/uploads", // Ruta donde se guardarán los archivos
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const postController = require("../controller/postController");

router.get("/", mainController.home);
router.get("/upload", mainController.upload);
router.get("/signin", authLogin, mainController.signin);
router.get("/signup", authLogin, mainController.signup);
router.post(
  "/signup",
  validatorRegister,
  middlewareRegister,
  userController.processRegister
);
router.post(
  "/signin",
  validatorLogin,
  middlewareLogin,
  userController.processLogin
);
router.get("/profile/:id", mainController.displayUserProfile);
router.get("/discover", postController.getPost);
router.post("/upload", upload.array("file"), postController.processPost);

module.exports = router;
