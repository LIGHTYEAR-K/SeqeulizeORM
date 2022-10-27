
const Sequelize=require('sequelize')
const { DataTypes } = require("sequelize");

const sequelize= new Sequelize('deathAdam','postgres','qwerty',{
    dialect:'postgres'
})

sequelize.authenticate().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
     console.log("Error Not Connected")
})

const User = sequelize.define('user',{

    UserName:{
        type:DataTypes.STRING,
        
    },
    Password:{
         type:DataTypes.STRING,
    },
},
    {
        freezeTableName: true,
        timestamps:false,

})

const Comment = sequelize.define('comment',{
    Message:{
        type:DataTypes.STRING,
    },
},
    {
        freezeTableName: true,
        timestamps:false,
})

User.hasMany(Comment,{onDelete:'CASCADE'})
Comment.belongsTo(User,{onDelete:'CASCADE'})

let user,comment;
sequelize.sync({ alter:true }).then(()=>{
    return User.findOne()
}).then((data)=>{
    user=data;
    return Comment.findOne()
}).then((data)=>{
    comment=data;
    comment.setUser(user)
}).catch((err)=>{
      console.log(err)
})







                                   //      Add utlity method
sequelize.sync({ alter:true }).then(()=>{
  
    return User.findOne({where:{UserName:'admin@24'}})
}).then((data)=>{
        user=data;
        return Comment.findAll()
}).then((data)=>{
         comment=data;
         return user.addComment(comment)
}).catch((err)=>{
      console.log(err)
})



                                    // count
sequelize.sync({ alter:true }).then(()=>{
  
    return User.findOne({where:{UserName:'admin@24'}})

}).then((data)=>{
        user=data;
        return user.countComments();
}).then((data)=>{
         console.log(data)
}).catch((err)=>{
      console.log(err)
})


                                    // remove

  sequelize.sync({ alter:true }).then(()=>{
  
    return User.findOne({where:{UserName:'admin@24'}})

}).then((data)=>{
        user=data;
        return Comment.findOne()
}).then((data)=>{
         comment=data;
         return user.removeComment(comment)
}).then((data)=>{
    console.log(data)
}).catch((err)=>{
      console.log(err)
})                                  
   

                          //Belongs to: assign to one value

sequelize.sync({ alter:true }).then(()=>{
    return User.findOne()
}).then((data)=>{
    user=data;
    return Comment.findOne()
}).then((data)=>{
    comment=data;
    comment.setUser(user)
}).catch((err)=>{
      console.log(err)
})