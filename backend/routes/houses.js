const router = require("express").Router();
const {upload} = require('../helpers/filehelper');
const {multipleFileUpload,getallMultipleFiles, findFilesById, findFilesByDistrict, deleteHouse,findFilesBySefer, searchHouses,updateHousesInfo,autoCompleteSearch, notify, getDistrict} = require("../controllers/FileUpload");
const {RequestHousesForRent, getRequestedHouse,cancelHouseRequest} = require('../controllers/HouseRequest')
const {contractSigning} = require('../controllers/Admin');
const { getMyHouses } = require("../controllers/LandlordAuth");
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.post('/requestHouses',RequestHousesForRent)
router.get('/getrequestedHouse/:email', getRequestedHouse);
router.get('/getMultipleFiles', getallMultipleFiles);
router.get('/gethousedistrict',getDistrict)
router.get('/getFilesById/:id', findFilesById);
router.get('/getFilesByDistrict/:district', findFilesByDistrict);
router.get('/getFilesBySefer/:sefer', findFilesBySefer);
router.get('/getHouses/:search', searchHouses);
router.get('/returnownershouse/:email',getMyHouses)
router.get('/autocompleteSearch',autoCompleteSearch)
router.put('/updateHouse/:id',updateHousesInfo)
router.delete('/deleteHouse/:id',deleteHouse)
router.delete('/cancelhouserequest/:email',cancelHouseRequest)
router.post('/subscribe',notify)

module.exports = {
    routes: router
}

