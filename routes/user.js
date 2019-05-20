const router = require("express").Router();
const jwt = require("jsonwebtoken");

const db = require('../models');

const UNAUTHORIZED_ERROR = {status: 401, message: "Incorrect username or password"};
const createUser = userData => db.User.create(userData)
                                        .then(dbData => ({...dbData, new:true}));
const checkPassword = (passedData, dbData)  => (passedData.password === dbData.password) ? Promise.resolve(dbData) : Promise.reject(UNAUTHORIZED_ERROR);

router.route('/')
    .get( (req,res,err) => {
        res.send("Ok")
    })
    .post(  (req,res,err) => {
        console.log((/[a-zA-Z0-9]{3,}/i).test(req.body.username || ""))
        if (!(/[a-z][a-z0-9]{2,}/i).test(req.body.username || "") || !(/[a-z0-9 ]{6,}/i).test(req.body.password || "")) {
            return res.json(400, {message: "Invalid Username or Password. Password must be greater than 6 characters."})
        }
        const userData = {name: req.body.username, password: req.body.password};

        db.User.findOne({name: req.body.username})
            //check if found
            .then(data => data? checkPassword(userData, data) : createUser(userData))
            .then(data => res.json({
                data: {...data._doc},
                token: jwt.sign({
                        data: {...data._doc}
                    },
                    process.env.JWT_SECRET)
            }))
            .catch(err => res.json(err.status || 500, err))
    })
;
module.exports = router;