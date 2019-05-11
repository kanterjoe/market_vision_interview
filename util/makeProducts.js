const random = require("generate-random-data");
const db = require("../models");

for (let i=0; i< 5; i++) {
    db.Product.create(
        {
            name: random.lastName(),
            description: random.lorems(),
            category: random.pickOne(['Games','Nature', 'Philosophy', "Hardware", "Birds"]),
            image: `https://picsum.photos/200/300?random=${random.natural(1,10000)}`,
        }
    )
}
