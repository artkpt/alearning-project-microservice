import AuthController from "#controllers/auth_controller";
import router from "@adonisjs/core/services/router";

router.post('/login', [AuthController, 'login'])
router.post('/refresh', [AuthController, 'refresh'])
router.post('/logout', [AuthController, 'logout'])