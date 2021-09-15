const MultipleFile = require('../models/Houses')
const express = require('express');
const webpush = require('web-push');
const ErrorResponse = require("../utils/errorResponse");

const publicVapidKey = 'BMffGk0gRxLPOSi-eOlXoR1ahY9Ce7uBY3010C06TeMoRYS_6n1A4ItVeOeNYutDlhPK27WW5UMrdyjBEj_-Pxo';
const privateVapidKey = 'QCipepmgJm_noa9A4-0Q-Wjbwm1GL02DSDpX6-ynFwU';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey,privateVapidKey);

//subscribe route
const notify= async (req,res)=>{
    const subscription = req.body;
    //send status 201
    res.status(201).json({})

    //create paylod
    

    //pass the object into sendNotification
    webpush.sendNotification(subscription,
        JSON.stringify({
            title: "kirayBet.com",
            text: "HEY! Take a look at this brand new t-shirt!",
            image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
            tag: "new-product",
            url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
          })
          ).catch(err=> console.error(err));
}

const multipleFileUpload = async (req, res, next) => {
    try {
        let filesArray = [];
        req.body.files.forEach(element => {
            filesArray.push(element);
        });

        const multipleFiles = new MultipleFile({
            housename: req.body.housename,
            description: req.body.description,
            district: req.body.district,
            sefer: req.body.sefer,
            location: req.body.location,
            numberofbeds: req.body.numberofbeds,
            feepermonth: req.body.feepermonth,
            size: req.body.size,
            available: req.body.available,
            propertytype: req.body.propertytype,
            video: req.body.video,
            files: filesArray,
            owneremail:req.body.owneremail,
            ownerusername:req.body.ownerusername
        });
        await multipleFiles.save();
        /* const subscription = req.body;
        webpush
            .sendNotification(subscription,
                JSON.stringify({
                    title: "New Product Available from john ",
                    text: "HEY! Take a look at this brand new t-shirt!",
                    image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
                    tag: "new-product",
                    url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
                })
            ) */
        res.status(201).send('Files Uploaded Successfully');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getallMultipleFiles = async (req, res, next) => {
    try {
        const files = await MultipleFile.find();
        res.header('Content-Range','0-20/20')
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const findFilesById = async (req, res) => {
    const productsId = req.params.id
    try {
        const files = await MultipleFile.find({ '_id': productsId })
        res.send(files)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const findFilesByDistrict = async (req, res) => {
    const houseName = req.params.district
    try {
        const files = await MultipleFile.find({ 'district': houseName })
        res.send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const findFilesBySefer = async (req, res) => {
    const houseBase = req.params.sefer
    try {
        const files = await MultipleFile.find({ 'sefer': houseBase })
        res.send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const searchHouses = async (req, res) => {
    const search = req.params.sefer
    try {
        const houses = await MultipleFile.find({ $text: { $search: `${search}` } })
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const updateHousesInfo = async (req, res) => {

    try {
        const houseId = req.params.id;
        let filesArray = [];
        req.body.files.forEach(element => {
            filesArray.push(element);
        });
        const house = await MultipleFile.findByIdAndUpdate(houseId, {
            housename: req.body.housename,
            description: req.body.description,
            district: req.body.district,
            sefer: req.body.sefer,
            numberofbeds: req.body.numberofbeds,
            feepermonth: req.body.feepermonth,
            size: req.body.size,
            available: req.body.available,
            propertytype: req.body.propertytype,
            video: req.body.video,
            files: filesArray
        })
        res.send(house)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const deleteHouse = async (req, res) => {
    try {
        const houseId = req.params.id
        const deletedHouse = await MultipleFile.findByIdAndDelete(houseId)
        res.send(deletedHouse)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const autoCompleteSearch = async (req, res) => {
    try {
        const searchedHouse = await MultipleFile.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${req.query.term}`,
                        "path": 'district',
                        "fuzzy": {
                            'maxEdits': 2
                        }
                    }

                }
            }])

        res.send(searchedHouse.map(data=>data.district))

    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    multipleFileUpload,
    getallMultipleFiles,
    findFilesById,
    findFilesByDistrict,
    findFilesBySefer,
    searchHouses,
    updateHousesInfo,
    deleteHouse,
    autoCompleteSearch,
    notify
}