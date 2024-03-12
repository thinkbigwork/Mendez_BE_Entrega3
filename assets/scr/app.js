const ProductManager = require('./ProductManager')

const express = require('express')

const app = express()

const productsManager = new ProductManager()
const productsbd = productsManager.getProducts()

console.log('Muestra productsManager' + productsbd)

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit // Obtener el valor del query parameter ?limit=
        console.log('limit es: ' + limit)   
      
        const products = await productsManager.getProducts(limit)
        res.json(products)

    } catch (err) {
        res.json({ err: 'Error al obtener productos' })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const productId = +req.params.id
        const product = await productsManager.getProductsId(productId)
        if (!product) {
            res.json({ err: 'El producto no existe, ID: ' + req.params.id })
            return
        }
        res.json(product)
        return

    } catch (err) {
        res.json({ err: 'Error al obtener productos con ID: ' + req.params.id })
        
    }
})

const main = async () => {
    try {
        await productsManager.initialize()
        app.listen(8080, () => {
            console.log('Servidor listo')
        })
    } catch (err) {
        res.json({ err: 'Error al iniciar la app'})
    }
}

main()
