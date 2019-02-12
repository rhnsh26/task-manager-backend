const {MongoClient}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/testdb',(err,db)=>{
    if(err){
        return console.log("error")
    }
    console.log("db connected");

    db.collection('test-todo').insertOne({
        text:"blah"
    },(err,res)=>{
        if(err){return console.log("Failed")}
        console.log("Success",JSON.stringify(res.ops));
    }
    );
    db.close();
});