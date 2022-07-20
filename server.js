const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models');
const dbConfig = require('./config/db.config');
const { role } = require('./models');
const Role = db.role;
const bodyparser = require('body-parser')

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.mongoose.connect(`mongodb://${dbConfig.Host},${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    userUnifiedTopology:true
}).then(()=>{
    console.log("Successfully connect to mongodb..");
    initial();
})
app.use(cors())

//parse request of content-type -application/json
 app.use(express.json())


//parse request of content-type of content-type - application/x-www-form-urlencoded

app.use(bodyparser.urlencoded({extended:false}))


//simple route
app.get('/',(req,res)=>{
    res.json({message:"Welcome to qtonzee"})
}) 



//Set port listen for request

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})


function initial(){
    Role.estimateDocument((err,count)=>{
        if(!err && count === 0){
            new Role({
                name:"user"
            }).save(err =>{
                if(err){
                    console.log("error",err)
                }
                console.log("added moderator to roles collection...")
            });
            new Role({
                name:"admin"
            }).save(err => {
                if(err){
                    console.log("error",err)
                }
                console.log("Added admin to roles collection...")
            })
        }
    });
}