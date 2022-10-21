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


const User = sequelize.define('blackAdam', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const Datas = this.getDataValue('Name');
        return Datas.toUpperCase();
      }
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    City: {
        type: DataTypes.STRING,
      },
    Phone_NO: {
        type: DataTypes.INTEGER,
      },

  },{
    freezeTableName: true,
    timestamps:false
  })


//   User.sync({alter:true}).then(()=>{
//    //const fires= User.build({ Name: "qwerty" ,Age:25,City:'Theni',Phone_NO:734099988});
// //    return User.create({
// //     id:4,
// //     Name: 'Suresh',
// //     Age:  90,
// //     City:'TB road',
// //     Phone_NO:789887784
// //   })
//      return User.bulkCreate( [{
//         id:1,
//         Name: 'Suresh',
//         Age:  90,
//         City:'TB road',
//         Phone_NO:789887784

//      },
//      {
//         id:2,
//         Name: 'MOhan',
//         Age:  80,
//         City:'KOnguNagar(0)',
//         Phone_NO:86945699
//      },
//      {
//         id:3,
//         Name: 'Naren',
//         Age:  78,
//         City:'KOnguNagar(Don)',
//         Phone_NO:824564699
//      },
//      {
//         id:4,
//         Name: 'Nsk',
//         Age:  78,
//         City:'KOnguNagar(sub)',
//         Phone_NO:676945699
//      }
//     ]

//      );
//   })
//   .then((data)=>{
//     data.forEach((datas)=>{
//         console.log(datas.toJSON())
//     })
//     console.log("Successfully Synced")
//   }).catch((Err)=>{
//     console.log(Err)
//   })

//                              Model Querying

User.sync({alter:true}).then(()=>{
   return User.findAll({ attributes:['Name','City']});
   return User.findAll({ attributes:[['Name','UserName'],['City','Location']]});
   return User.findAll({ attributes:[[sequelize.fn('AVG',sequelize.col('Age')),'HowOLd']]});
   return User.findAll({ attributes:{ exclude:['Age','Phone_NO']}});
   return User.findAll({where:{Age:67}});
   return User.findAll({attributes:['Name'],where:{Age:67}});
   return User.findAll({limit:2});  //two Values from Table
   return User.findAll({order:[['Age','ASC']]});  // Ordering
   return User.destroy({truncate:true}); // Delete Entire rows
   return User.update({Age:'97'},{where:{Name:'Nsk'}}) 
   return User.destroy({where:{Name:'yyes'}}) //Delete Specfic Values
  })
   .then((data)=>{
     console.log(data)
     console.log("Successfully Synced")
   }).catch((Err)=>{
     console.log(Err)
   })
 
   
//                                      Finders

// User.sync({alter:true}).then(()=>{
// return User.findByPk(4)
// return User.findOne({where:{Name:'Naren'}});
// return  User.findOrCreate({where:{id:5,Name:'radis',Age:66}})
// return User.findAndCountAll({where:{Name:'Naren'},raw:true})
//   const {count ,rows}= data;
//   console.log(count)
//   console.log(rows)
//  })
//  .then((data)=>{
//       console.log(data.toJSON())
//       console.log("Successfully Synced")
//  }).catch((Err)=>{
//      console.log(Err)
// })
     