const {Router}= require('express');
const router = Router();


const { getCategoria }=require('../controllers/index.controlles');
const { getMarcasById }=require('../controllers/index.controlles');
const { createMarca}=require('../controllers/index.controlles');
const { updateMarca }=require('../controllers/index.controlles');
const { deleteMarca}=require('../controllers/index.controlles');

router.get('/',getCategoria);


module.exports=router;