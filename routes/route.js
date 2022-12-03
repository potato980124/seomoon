const { json } = require('body-parser');
const express = require('express');
const { write } = require('fs');
const router = express.Router();
const path = require('path');
const db = require('./../db.js');


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
  db.getNotice((rows)=>{
    res.render('notice',{rows:rows});
  })
})
router.get('/noticeregis',(req,res)=>{
  res.render('noticeregis');
})

// 공지사항 등록페이지에서 포스트로 받아온 값을 db 저장
router.post('/noticewrite',(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let title = param['title'];
  let impo = param['impo'];
  let exposure = param['exposure'];
  let author = param['author'];
  let authorpw = param['authorpw'];
  let notcon = param['notcon'];
  console.log(title);
  console.log(impo);
  console.log(exposure);
  console.log(author);
  console.log(authorpw);
  console.log(notcon);
  db.insertMemo(
  title,impo,exposure,author,authorpw,notcon,()=>{
    res.redirect('/notice');
  });
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

