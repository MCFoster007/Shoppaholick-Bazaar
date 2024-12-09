import express from 'express';
import fetch from 'node-fetch';
import { Item } from '../../models/Item.js';

const router = express.Router();

router.get('/products', async (_, res) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log(data);
        try {
            const products = await Item.create({title: data.title, price: data.price, description: data.description, category: data.category, image: data.image});
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});

export default router;