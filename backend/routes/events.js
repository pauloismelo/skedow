const app = require('express')
const router = app.Router();

const mysql = require("mysql2")
const db = require('../db/connection');

router.get(`/events`, (req,res)=>{
    db.query(`select * from TB_EVENTS`, (error, result)=>{
        if (error) res.status(500).json({msg: 'Error in get events', type:'error'});
        if (result) {
            res.send(result);
        }
    })
})


router.post(`/new`, (req,res)=>{
    const {title, datestart, dateend, description, priority} = req.body;
    const {timestart, timeend} = req.body || {};

    let start, end;

    if (timestart){
        start = new Date(datestart+' '+timestart);
    }else{
        start = new Date(datestart+ ' 00:00:00');
    }

    if (timeend){
        end = new Date(dateend+' '+timeend);
    }else{
        end = new Date(dateend+ ' 00:00:00');
    }

    db.query(`insert into TB_EVENTS (title, start, end,description,priority) values (?,?,?,?,?)`, [title, start, end, description, priority], (error, result)=>{
        if (error) res.status(500).json({msg: 'Error in insert event', type: 'error'});
        if (result) {
            db.query('select * from TB_EVENTS where id=?', [result.insertId], (error2, result2)=>{
                if (error2) res.status(500).json({msg: 'Error in select new event', type: 'error'});
                if (result2) {
                    //Create a new object, because I don't return a array
                    const newReg = {
                        id: result.insertId,
                        title: result2[0].title,
                        start: result2[0].start,
                        end: result2[0].end,
                        description: result2[0].description,
                        datereg: result2[0].datereg,
                        userreg: result2[0].userreg,
                        priority: result2[0].priority,
                    }

                    res.status(200).json({msg: 'Event inserted successfully', type: 'success', event: newReg})
                }
            })
            
        }
        ;
        
    })


})


module.exports = router;