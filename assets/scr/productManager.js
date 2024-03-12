//Importar fs
const fs = require('fs')

//Creacion de la clase de productos
class ProductManager {
    constructor() {
        this.products = []
        this.path = `${__dirname}/../assets/file.json`
        this.id = 1
    }

    // Funcion inicializar
    async initialize() {
        this.products = await this.readDataFromFile()
    }

    // Funcion para leer archivo
    async readDataFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            if (!data.trim()) {
                console.warn(`Warning: El archivo ${this.path} está vacío\n`)
                return []
            }
            return JSON.parse(data)
        } catch (err) {
            console.error(`Error: no se encontró el archivo ${this.path}`)
            return []
        }
    }

        // Metodo para consultar productos
        async getProducts(limit) {
            try {
                const allProducts = await this.readDataFromFile()
                // Aplicar el límite si viene por query y si es un número positivo
                if (limit > 0) {
                    return allProducts.slice(0, limit)
                }
                if (limit === undefined){
                    return allProducts
                }
                else{
                    const errorTexto = 'Debe proporcionar un dato válido'
                    return errorTexto
                }
                
            } catch (err) {
                console.error('Error, el archivo no se pudo leer')
                return
            }
        }

    // Metodo para obtener productos por ID
    async getProductsId(id) {
        try {
            const allProducts = await this.readDataFromFile()
            const product = allProducts.find(p => p.id === id)
            return product
        }
        catch (err) {
            console.error('No se encontró el producto que buscabas')
            return
        }
    }
}



//exporto la clase
module.exports = ProductManager
