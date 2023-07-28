const Dog = require('./../models/dogModel');
const apiFeatures = require('../utils/apiFeatures');

exports.getAllDogs = async (req,res) => {
    try {
        const features = new apiFeatures (Dog.find() , req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const dogs = await features.query;

        res.status(200).json({
            status: 'success',
            results: dogs.length,
            data: {
                dogs
            } 
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });      
    }
};

exports.getDog = async (req,res) => {
    try{
        const dog = await Dog.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                dog
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createDog = async (req, res) => {
    try {
        const newDog = await Dog.create(req.body);
        console.log(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                newDog
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateDog = async (req,res) => {
    try {
        const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the new object
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                dog
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err 
        });
    }
}; 

exports.deleteDog = async (req,res) => {
    try {
        await Dog.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });        
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

