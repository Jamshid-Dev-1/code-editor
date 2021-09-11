const Code = require("../models/file");
const redis = require("redis");
const {
    nanoid
} = require("nanoid");
const fs = require('fs');
const path = require('path');


const client = redis.createClient();

exports.fetchCodes = async (req, res) => {
    const {
        nanoCode
    } = req.params;

    client.get(nanoCode, function (err, val) {
        if (val) {
            return res.json({
                success: true,
                codes: val
            });
        }
        Code.findOne({
                nanoCode
            })
            .then((data) => {
                res.json({
                    success: true,
                    payload: data
                });
            })
            .catch((err) => {
                res.status(400).json({
                    msg: err.message
                });
            });
    });

};

exports.updateCodes = async (req, res) => {
    const {
        codes
    } = req.body;
    const {
        nanoCode
    } = req.params;

    let ruleArr = ['body', 'html', 'crptssefmmekkll', '*'];

    client.setex(nanoCode.toString(), 3600, JSON.stringify(codes));

    ruleArr.forEach((item, index) => {
        if (codes.css.includes(item)) {
            console.log(item, ' error------------')
            return res.status(400).json({
                msg: `${item} not allowed in css`
            });
        }
        if (index == ruleArr.length - 1) {
            return updateFunc();
        };
    });

    function updateFunc() {
        Code.updateOne({
                nanoCode
            }, {
                codes
            })
            .then(async (data) => {
                const code = await Code.findOne({
                    nanoCode
                });
                fs.writeFile('public/main.css', codes.css, function (err, result) {
                    if (err) throw err;
                });
                res.json({
                    success: true,
                    payload: code,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    msg: err.message
                });
            });
    }

};

exports.createRoom = async (req, res) => {
    Code.create({
            codes: {
                html: '',
                css: ''
            },
            nanoCode: nanoid()
        })
        .then((data) => {
            res.json({
                success: true,
                payload: data
            });
            client.setex(data.nanoCode.toString(), 99, JSON.stringify(data.codes));
        })
        .catch((err) => {
            res.status(400).json({
                msg: err.message
            });
        });
};