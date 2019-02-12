const mongoose=require('mongoose');


let todoModel = mongoose.model('Todo',{
    heading:{
        type:String
    },
    description:{
        type:String,
        default:null
    },
    completedAt:{
        type:Number,
        default:null
    },
    deletedAt:{
        type:Number,
        default:null
    }
});

let newTodo =(heading,description,completedAt,deletedAt)=>{
    return new todoModel({
        heading,
        description,
        completedAt,
        deletedAt,
    }).save();
};

module.exports={newTodo};