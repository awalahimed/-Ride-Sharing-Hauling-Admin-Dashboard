import express from 'express';
import { ensureAuthenticated } from '../middlewares/productAuthMiddle.js';

const productRouter = express.Router();

productRouter.get('/', ensureAuthenticated, (req, res)=>{
res.status(200).json([
{
    name: "product 1",
    description: "product 2 description",
    price:100
},
]);

});
export default productRouter;