const { json } = require('body-parser');
const express = require('express');
const { write } = require('fs');
const router = express.Router();
const path = require('path');
const { title } = require('process');

router.get('/',(req,res)=>{
  res.render('index');
})
router.get('/introsub',(req,res)=>{
  res.render('introsub');
})
router.get('/login',(req,res)=>{
  res.render('login');
})
router.post('/loginInfo',(req,res)=>{
  let param =JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let pw = param['pw'];
  console.log('userid:'+id);
  console.log('userpw:'+pw);
})
router.get('/join',(req,res)=>{
  res.render('join');
})
router.post('/joinInfo',(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let userId = param['id'];
  let userPw = param['pw'];
  let userRePw = param['repw'];
  let userName = param['name'];
  let userYear = param['year'];
  let userMonth = param['month'];
  let userDate  = param['date'];
  let userNum = param['num'];
  let userSex = param['sex'];
  let userEmail = param['email'];
  console.log(userId);
  console.log(userPw);
  console.log(userRePw);
  console.log(userName);
  console.log(userYear);
  console.log(userMonth);
  console.log(userDate);
  console.log(userNum);
  console.log(userSex);
  console.log(userEmail);
})
router.get('/detailsnotice',(req,res)=>{
  res.render('detailsnotice');
})
router.get('/notice',(req,res)=>{
  res.render('notice');
})
router.get('/noticeregis',(req,res)=>{
  res.render('noticeregis');
})
router.post('/noticeregis',(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let title = param['title'];
  console.log(title);
  let impo = param['impo'];
  console.log(impo);
  let exposure = param['exposure'];
  console.log(exposure);
  let author = param['author'];
  console.log(author);
  let authorpw = param['authorpw'];
  console.log(authorpw);
  let notcon = param['notcon'];
  console.log(notcon);
  res.render('detailsnotice.ejs',{'data':param});
})
router.get('/noticeretouch',(req,res)=>{
  res.render('noticeretouch');
})
router.post('/noticeretouch',(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let title = param['title'];
  console.log(title);
  let impo = param['impo'];
  console.log(impo);
  let exposure = param['exposure'];
  console.log(exposure);
  let author = param['author'];
  console.log(author);
  let authorpw = param['authorpw'];
  console.log(authorpw);
  let notcon = param['notcon'];
  console.log(notcon);
  res.render('detailsnotice.ejs',{'data':param});
})
module.exports = router;

