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


const Record = sequelize.define('deathBlock', {
    id:{
         type: DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
     },
     Name: {
       type: DataTypes.STRING,
       allowNull: false,
       Validate:{
        len:[4,6]
     },

     },
     Age: {
       type: DataTypes.INTEGER,
       validate:{
        isSuitable(value) {
            if (value<50) {
                throw new Error("NOt Suitable !")
            }
        }
       }

     },
     City: {
         type: DataTypes.STRING,
        //  validate:{
        //     isIn:{
        //         args:['salem','salemcity'],
        //         msg:'City is not matched with database record'
        //     }
        //  }
         

     },

     Phone_NO: {
         type: DataTypes.INTEGER,
         validator:{
            numvalidate(value) {
                if(value === null) {
                  throw new Error("Plz Enter the Phone Number")
                }
         }

         }
         //unique: true
       },
 
   },
   {
     freezeTableName: true,
     timestamps:false,
     validate:{
         equalError(){
            if (this.Name === this.City) {
                throw new Error("CiTy cannot be your Name!!")
            } else {
                console.log("synced")
            }
         }
     }

   })
 
Record.sync({alter:true}).then(()=>{
        return Record.create({
            Name:'David',
            Age:76,
            City:'Palani',
            Phone_NO:89099987
        })

}).then((data)=>{
    console.log(data)
    // data.forEach((datas)=>{
    //     console.log(datas.toJSON())
    // })
      
}).catch((err)=>{
       console.log(err)
})
