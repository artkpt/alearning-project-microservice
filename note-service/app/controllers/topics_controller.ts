import type { HttpContext } from '@adonisjs/core/http'

import Topic from "#models/topic";
import { escapeLike } from '../utils/textUtil.js';
import { topicValidator } from '#validators/topic';



export default class TopicsController {
    async getTopic({request}:HttpContext){
        const {search}: Record<string, string | undefined> = request.qs()
        const query = Topic.query()

        let searchContain = (search ?? '')
        searchContain = escapeLike(searchContain.trim())

        // if not trim before when " " is true
        // if not escapeLike brefore, it can't pass % like string. it will sql inject.
        if(searchContain) {
            query.whereILike('name', `${searchContain}%`)
        }
        
        return query.exec()
    }

    // {"name": ""}
    async createTopic({request, response}:HttpContext){
        const {name} = await request.validateUsing(topicValidator)
        const newTopic = await Topic.create({
            name: name
        })
        response.created(newTopic)
    }
}