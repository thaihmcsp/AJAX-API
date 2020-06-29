const express = require('express');
const router = express.Router();
const AccountModel = require('../data/data')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const request = require('request');
//require

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// body-parser

const saltRounds = 10;
//bcrypt

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
// Add header fix CORS error
  
app.get('/', (req, res) => {
    request(
      { url: 'http://localhost:3000/api/account/' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
});
// GET fix CORS error

app.post('/', (req, res) => {
    request(
      { url: 'http://localhost:3000/api/account/' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
});
// POST fix CORS error

app.put('/', (req, res) => {
    request(
      { url: 'http://localhost:3000/api/account/' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
});
// PUT fix CORS error

app.delete('/', (req, res) => {
    request(
      { url: 'http://localhost:3000/api/account/' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
});
// DELETE fix CORS error

router.get('/',function(req,res,next){
    AccountModel.find({})
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        res.status(500).json('loi server')
    })
})
// get all-----------------------------------------------------

router.get('/:id',function(req,res,next){
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    AccountModel.findOne({
        _id:id
    })
    .then(function(data){
        if(data.username == username){
            bcrypt.compare(password, data.password, function(err, result) {
                if(result == true){
                    res.json(data)
                }else{
                    res.json('sai password')
                }
            });          
        }else{
            res.json('sai username')
        }
    })
    .catch(function(err){
        res.status(500).json('loi server')
    })
})
//get by id------------------------------------------------------

router.post('/',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    AccountModel.findOne({
        username: username
    })
    .then(function(data){
        if(data){
            res.json('username ' + username+ ' da ton tai')
        }else{
            bcrypt.hash(password, saltRounds, function(err, hash) {
                return AccountModel.create({
                    username: username,
                    password: hash
                }) 
            });                     
        }
    })
    .then(function(data){
        res.json('Xin chao' + username)
    })
    .catch(function(err){
        res.status(500).json('loi server')
    })
})
// post creat account-----------------------------------------------

router.put('/:id',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var newPass = req.body.newPass;
    var id = req.params.id;
    AccountModel.findOne({
        _id: id
    })
    .then(function(data){
        if(data){
            if(data.username == username){
                bcrypt.compare(password,data.password,function(err, result){   
                    if(result == true){
                        bcrypt.hash(newPass,10,function(err, hash){
                            AccountModel.updateOne({
                                _id:id
                            },{
                                password: hash
                            })
                            .then(function(data){
                                res.json('doi password thanh cong')
                            })
                        })                       
                    }else{
                        res.json(result + 'Nhap sai password')
                    }
                })                
            }else{
                res.json('Nhap sai username')
            }
        }else{
            res.json('Tai khoan khong ton tai')
        }
    })
    .catch(function(err){
        res.status(500).json('loi server')
    })
})
// put update account

router.delete('/:id',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var id = req.params.id;

    AccountModel.findOne({
        _id: id
    })
    .then(function(data){
        if(data){
            if(data.username == username){
                // res.json(data.username)
                // res.json(username)
                // res.json(data.password)
                // res.json(password)
                bcrypt.compare(password,data.password,function(err,result){
                    // res.json(result)
                    if(result == true){
                        return AccountModel.deleteOne({
                            username: username
                        })
                        .then(function(data){
                            res.json('Da xoa tai khoan')
                        })
                    }else{
                        res.json('Nhap sai password')
                    }
                });                
            }else{
                res.json('Nhap sai username')
            }
        }else{
            res.json('Tai khoan khong ton tai')
        }
    })   
    .catch(function(err){
        res.status(500).json('Loi server')
    })
})
// delete - delete account ------------------------------------------

module.exports = router;