const random = require("generate-random-data");
const db = require("../models");
const axios = require('axios');
// for (let i=0; i< 5; i++) {
//     db.Product.create(
//         {
//             name: random.lastName(),
//             description: random.lorems(),
//             category: random.pickOne(['Games','Nature', 'Philosophy', "Hardware", "Birds"]),
//             image: `https://picsum.photos/id/${random.natural(1,10000)}/300/300`,
//         }
//     )
// }
//
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
 