import {Schema, model} from "mongoose";

const taskSchema = new Schema({
    title: String,
    description: String 
})

const Task = model('Task', taskSchema)

export default Task