import TopicsController from "#controllers/topics_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";

router.get('/topics', [TopicsController, 'getTopic'])

router.post('/topics', [TopicsController, 'createTopic']).use(middleware.auth())