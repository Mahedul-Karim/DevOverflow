import { Schema, models, model } from "mongoose";

const InteractionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    action:{
        type:String,
        required:true
    },
    question:{
        type:Schema.Types.ObjectId,
        ref:'Question'
    },
    answer:{
        type:Schema.Types.ObjectId,
        ref:'Answer'
    },
    tags:[
        {
            type:Schema.Types.ObjectId,
            ref:'Tag'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Interaction =
  models?.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
