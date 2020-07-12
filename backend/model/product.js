const { model, Schema } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: Array,
        default: [
            'Laptops',
            'Phones',
            'Acessories',
            'Fashion'
        ]
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },


})

module.export.Product = model('Product', ProductSchema)