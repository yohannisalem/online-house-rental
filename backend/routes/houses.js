const router = require("express").Router();
const {upload} = require('../helpers/filehelper');
const {multipleFileUpload,getallMultipleFiles, findFilesById, findFilesByDistrict, deleteHouse,findFilesBySefer, searchHouses,updateHousesInfo,autoCompleteSearch, notify} = require("../controllers/FileUpload");
const {RequestHousesForRent} = require('../controllers/HouseRequest')
const {contractSigning} = require('../controllers/Admin')
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.post('/requestHouses',RequestHousesForRent)
router.get('/getMultipleFiles', getallMultipleFiles);
router.get('/getFilesById/:id', findFilesById);
router.get('/getFilesByDistrict/:district', findFilesByDistrict);
router.get('/getFilesBySefer/:sefer', findFilesBySefer);
router.get('/getHouses/:search', searchHouses);
router.get('/autocompleteSearch',autoCompleteSearch)
router.post('/updateHouse/:id',updateHousesInfo)
router.post('/sendContractForm',contractSigning)
router.delete('/deleteHouse/:id',deleteHouse)
router.post('/subscribe',notify)





module.exports = {
    routes: router
}

