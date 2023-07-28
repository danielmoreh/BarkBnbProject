const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Dog = require('./../models/dogModel');

dotenv.config({ path: './config.env' });

mongoose.connect('mongodb://127.0.0.1:27017/natours', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'));

const dogs = JSON.parse(fs.readFileSync(`${__dirname}/dogList.json` , 'utf-8'));

const importDogs = async () =>{
    try{
        await Dog.create(dogs);
        console.log("Dogs imported sucessfully");
    } catch (err){
        console.log(err);
    }
};

const deleteDogs = async () => {
    try {
        await Dog.deleteMany();
        console.log("Dogs deleted sucessfully");
    } catch (err) {
        console.log(err);
    }
}

if(process.argv[2] == '--import'){
    console.log("hello");
    importDogs();
} else if (process.argv[2] == '--delete'){
    deleteDogs();
}