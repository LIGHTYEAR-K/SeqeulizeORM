const { compareSync } = require('bcrypt')
const Sequelize=require('sequelize')
const {DataTypes,HasOne}=require('sequelize')


const sequelize=new Sequelize('deathAdam','postgres','qwerty',{
    dialect:'postgres'
})

sequelize.authenticate().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
     console.log("Error Not Connected")
})

const Model= sequelize.define('model',{
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
const Brand=sequelize.define('brand',{
    brand_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    brandName:{
        type:DataTypes.STRING,
        unique:true
    },
},
    {
        freezeTableName: true,
        timestamps:false,

})

Brand.hasOne(Model,{onDelete:'CASCADE'})
Model.belongsTo(Brand,{onDelete:'CASCADE'})
let brand,model;

sequelize.sync({ alter: true }).then(()=>{
    return Brand.findOne({where:{brandName:'Google'}})
}).then((data)=>{
     brand=data;
     return Model.findOne({where:{modelName:'Pixel6pro'}})
}).then((data)=>{
    model=data;
    model.setBrand(brand)
}).then((data)=>{
  console.log(data)
    
}).catch((err)=>{
    console.log(err)
})


                 
                 //set

// sequelize.sync({ alter: true }).then(()=>{
//       return Model.findOne({where:{modelName:'Iphone13pro'}})
//  }).then((data)=>{
//         model=data;
//         return Brand.findOne({where:{brandName:'Apple'}})
//  }).then((data)=>{
//          brand=data;
//          brand.setModel(model)
//  }).catch((err)=>{
//       console.log(err)
//  })


          
         // Get
// sequelize.sync({ alter: true }).then(()=>{
//     return Brand.findOne({where:{brandName:'Apple'}})
// }).then((data)=>{
//        brand=data;
//       return brand.getModel()
// }).then((data)=>{
//       console.log(data.toJSON())
// }).catch((err)=>{
//     console.log(err)
// })



          //Create
// sequelize.sync({ alter: true }).then(()=>{
//     return Brand.create({
//         brandName:'Asus'
//     })
// }).then((data)=>{
//        brand=data;
//       return brand.createModel({
//         modelName:'Rog6pro'
//       })
// }).then((data)=>{
//       console.log(data.toJSON())
// }).catch((err)=>{
//     console.log(err)
// })


         // Belongs to set value

// sequelize.sync({ alter: true }).then(()=>{
//     return Brand.findOne({where:{brandName:'Google'}})
// }).then((data)=>{
//      brand=data;
//      return Model.findOne({where:{modelName:'Pixel6pro'}})
// }).then((data)=>{
//     model=data;
//     model.setBrand(brand)
// }).then((data)=>{
//   console.log(data)
    
// }).catch((err)=>{
//     console.log(err)
// })
