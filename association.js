const Sequelize=require('sequelize')
const { DataTypes, HasOne } = require("sequelize");

const sequelize= new Sequelize('deathAdam','postgres','qwerty',{
    dialect:'postgres'
})

sequelize.authenticate().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
     console.log("Error Not Connected")
})

const System = sequelize.define('system',{
    Sys_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    SystemName:{
        type:DataTypes.STRING,
        unique:true
    },
},
    {
        freezeTableName: true,
        timestamps:false,

})

const Model = sequelize.define('model',{
    mod_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    modelName:{
        type:DataTypes.STRING,
        unique:true
    },
},
    {
        freezeTableName: true,
        timestamps:false,

})
let system,model
System.hasOne(Model,{foreignKey:'Sys_id'});

sequelize.sync({alter:true}).then(()=>{
return System.create({
    SystemName:'Avita notebook'
})
}).then((data)=>{
    system = data;
    return system.createModel({
        modelName:'Avita'
    }) 
}).then((data)=>{
    console.log(data.toJSON())
}).catch((err)=>{
  console.log(err);
})




//                      hasOne()  method to assign primarykey(one to one)
// sequelize.sync({alter:true}).then(()=>{
//     return Model.findOne({ where:{ modelName:'Dell'}
//     }).then((data)=>{
//         model = data;
//         return System.findOne({where:{ SystemName:'DellE4504'}})  
//     }).then((data)=>{
//         system = data;
//         system.setModel(model);
//     }).catch((err)=>{
//       console.log(err);
//     })
    
//     })



//                    Get value by child    
// sequelize.sync({alter:true}).then(()=>{
//     return System.findOne({ where:{ SystemName:'DellE4504'}
// }).then((data)=>{
//         system = data;
//         return system.getModel();  
//}).then((data)=>{
//         console.log(data.toJSON())
//}).catch((err)=>{
//       console.log(err);
//})
    
//})



//                     set value while Creating
// sequelize.sync({alter:true}).then(()=>{
//     return System.create({
//         SystemName:'Avita notebook'
//     })
//     }).then((data)=>{
//         system = data;
//         return system.createModel({
//             modelName:'Avita'
//         }) 
//     }).then((data)=>{
//         console.log(data.toJSON())
//     }).catch((err)=>{
//       console.log(err);
//     })