const random = require("generate-random-data");
const db = require("../models");
const axios = require('axios');


//Needed some random data
axios.get(`https://picsum.photos/v2/list?page=2&limit=500`)
    .then(({data}) => random.pickSome(data, 5))
    .then(photos => photos.map(photo => db.Product.create(
        {
            name: random.title(),
            description: random.lorems(),
            category: random.pickOne(['Games','Nature', 'Philosophy', "Hardware", "Birds"]),
            image: `https://picsum.photos/id/${photo.id}/300/300`,
            price: random.float(0, 100)
        }
    )))
 