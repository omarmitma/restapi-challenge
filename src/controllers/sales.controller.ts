import {Request,Response} from 'express';
import Sales from '../models/sales';

import Product from '../models/productos';

export async function getSales(req:Request, res:Response):Promise<Response>{
    const sales = await Sales.find();
    return res.json(sales);
}

export async function getSale(req:Request, res:Response):Promise<Response>{
    const sale = await Sales.findById(req.params.id);
    return res.json(sale);
}


export async function createSales(req:Request,res:Response):Promise<Response> {
    const {pago,products} = req.body;
    
    const newSale = {
        pago:pago,
        products:products,
    };
    const sale = new Sales(newSale);
    await sale.save();
    products.forEach(async(orden:any) =>{
        console.log(orden);
        const items_a_procesar = await Product.findById(orden._id)
    
        await Product.findByIdAndUpdate(orden._id, { 
            cantidad: items_a_procesar.cantidad - orden.cant
        })
    })
    
    

    return res.json({
        message:'Sale succesfully saved',
        sale
    })
}

export async function deleteSales(req:Request,res:Response):Promise<Response>  {
    console.log(req.params.id);
    const Sale = await Sales.findByIdAndRemove(req.params.id);
    return res.json({
        message:'Sale deleted',
        Sale
    });
}