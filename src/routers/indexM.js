const {Router}= require('express');
const router = Router();


const { getMarcas }=require('../controllers/index.controlles');

router.get('/',getMarcas);

module.exports=router;