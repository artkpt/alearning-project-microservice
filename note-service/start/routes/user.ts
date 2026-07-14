import UsersController from "#controllers/users_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";


router.post('/users', [UsersController, 'createUser']).use(middleware.auth())