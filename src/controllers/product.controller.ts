import {Request,Response} from 'express';
import path from 'path';
import fs from 'fs-extra';

import Product from '../models/productos';

export async function getProducts(req:Request, res:Response):Promise<Response>{
    const products = await Product.find();
    return res.json(products);
}

export async function getProduct(req:Request, res:Response):Promise<Response>{
    const product = await Product.findById(req.params.id);
    return res.json(product);
}

export async function createProduct(req:Request,res:Response):Promise<Response> {
    const {name,cantidad,precio,categoria} = req.body;

    const newProduct = {
        name:name,
        cantidad:cantidad,
        precio:precio,
        categoria:categoria,
        imagePath: req.file?.path
    };
    const product = new Product(newProduct);
    await product.save();

    return res.json({
        message:'Product succesfully saved',
        product
    })
}

export async function deleteProduct(req:Request, res:Response):Promise<Response>{
    const product = await Product.findByIdAndRemove(req.params.id);
    if(product){
        await fs.unlink(path.resolve(product.imagePath))
    }
    return res.json({
        message:'Product deleted',
        product
    });
}

export async function updateProduct(req:Request, res:Response):Promise<Response>{

    const {name,cantidad,precio,categoria} = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id,{
        name,
        cantidad,
        precio,
        categoria
    },{new:true});
    return res.json({
        message:'Successfully updated',
        product
    });
}
