const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()){
        console.log('in GET route to get all devices');
        console.log('user', req.user);
        let queryText = `SELECT * FROM "device"`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/temp', (req, res) => {
    if (req.isAuthenticated()){
        console.log('in GET route to get temp');
        let queryText = `SELECT * FROM desired_temperature WHERE person_id=${req.user} ORDER BY id DESC limit 1`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/data', (req, res) => {
    if (req.isAuthenticated()){
        console.log('in GET route to get data');
        console.log('user', req.user);
        let queryText = `SELECT * FROM "sensor_data" ORDER BY id DESC limit 20`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.post('/', (req, res) => {
    if (req.isAuthenticated()){
        console.log('this is req.body:', req.body);
        const queryText = `INSERT INTO "device" ("device_nickname", "device_build_id", "access_token", "device_location", "device_type", "sensor_type", "person_id" )
        VALUES($1, $2, $3, $4, $5, $6, $7)`;
        pool.query(queryText, [
            req.body.nickname,
            req.body.build_id,
            req.body.access_token,
            req.body.location,
            req.body.device_type,
            req.body.sensor_type,
            req.user.id
        ]).then((result) => {
            console.log('back from db with:', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in POST', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    } 
});

router.delete('/:id', (req, res) => {
    console.log('this is req.params',req.params);
    if(req.isAuthenticated()){
        queryText = `DELETE FROM sensor_data where id = $1;`;
        pool.query(queryText, [req.params.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling DELETE for /data:', error);});
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;