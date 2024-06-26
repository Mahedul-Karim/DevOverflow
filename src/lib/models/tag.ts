import { Schema, models, model, Document } from "mongoose";



const TagSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  questions:[
    {
        type:Schema.Types.ObjectId,
        ref:'Question'
    }
  ],
  followers:[
    {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now()
  }
});


const Tag =models?.Tag || model('Tag',TagSchema);

export default Tag;