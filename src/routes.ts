import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserComplimentsSentController = new ListUserSentComplimentsController();
const listUserComplimentsReceivedController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController(); 
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin ,createTagController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)

router.get("/users/compliments/sent", ensureAuthenticated ,listUserComplimentsSentController.handle)
router.get("/users/compliments/received", ensureAuthenticated ,listUserComplimentsReceivedController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle)

export { router };