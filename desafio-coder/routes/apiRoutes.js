const express = require('express');
const Products = express.Router();

const Contenerdor = require("../Contenedor");
const contenedor = new Contenerdor('./db/products.json')

Products.get('/', async (req, resp)=> {
    resp.send(await contenedor.getAll());
});

Products.get('/:id', async (req, resp)=> {
    const user = await contenedor.getById(req.params.id);
    return (user)
        ? resp.status(200).json(user)
        : resp.status(404).json({error: 'producto no encontrado'});
});

Products.delete('/:id', async(req, resp) => {
    const deletedId = await contenedor.deleteById(req.params.id);
    return (deletedId !== -1)
        ? resp.status(200).json({ deletedId })
        : resp.status(404).json({ error: 'producto no encontrado' });
});

Products.post('/', async(req, resp) => {
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    const newProduct = await contenedor.create({title, price:priceFloat, thumbnail});
    return resp.status(201).json(newProduct);
});

Products.put('/:id', async(req, resp) => {
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    const updatedProduct = await (contenedor.update({
        id: parseInt(req.params.id),
        title,
        price:priceFloat,
        thumbnail
    }));
    return (updatedProduct !== -1)
        ?  resp.status(200).json(updatedProduct)
        : resp.status(404).json({ error: 'producto no encontrado' });
});

module.exports = Products