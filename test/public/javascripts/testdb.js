var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/test",{ useNewUrlParser: true } );
mongoose.connection.once("open",function () {
    console.log("database successful");
});


//将mongoose.Schema 赋值给一个变量
var Schema = mongoose.Schema;

//创建Schema（模式）对象
var userModel = new Schema({

    username:String,
    password:String

});

//通过Schema来创建Model
//Model代表的是数据库中的集合，通过Model才能对数据库进行操作
//mongoose.model(modelName, schema):
//modelName 就是要映射的集合名 mongoose会自动将集合名变成复数
var userModel = mongoose.model("users" , userModel);

//向数据库中插入一个文档
//StuModel.create(doc, function(err){});
var username = "chen@gmail.com";
var password = String(11);

// userModel.create({
//     username:username,
//     password: password
// },function (err) {
//     if(!err){
//         console.log("Successful inserted");
//     }
// });



var result = userModel.findOne({username:username, password:password},function (err , docs) {
    if(!err){
        console.log("did find the users");
    }
});

if(result != null){
    console.log("already exsit");
}else{
    userModel.create({
        username:username,
        password: password
    },function (err) {
        if(!err){
            console.log("Successful inserted");
        }
    });

}
