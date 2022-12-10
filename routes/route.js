const { json } = require('body-parser');
const express = require('express');
const { write } = require('fs');
const router = express.Router();
const path = require('path');
const db = require('./../db.js');


router.get('/',(req,res)=>{
  db.getNoticeAtMain((rows)=>{
    res.render('index',{rows:rows});
  })
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
  db.loginCheck(id,pw,(results)=>{
    if(results.length>0){
      res.redirect('/');
    }else{
      res.send(`<script>alert('로그인 정보가 일치하지 않습니다.'); document.location.href='/login';</script>`)
    }
  })
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
  let userNum = param['num'];
  let userSex = param['sex'];
  let userEmail = param['email'];
  db.insertJoinData(userId,userPw,userRePw,userName,userNum,userSex,userEmail,()=>{
    res.redirect('/login');
  })
})
// 등록한 공지 세부사항
router.get('/detailsnotice',(req,res)=>{
  let id = req.query.id;
  db.getNoticeByid(id,(row)=>{
    res.render('detailsnotice',{row:row[0]});
  })
})
// 등록한 공지 리스트
router.get('/notice',(req,res)=>{
  db.getNotice((rows)=>{
    res.render('notice',{rows:rows});
  })
})

// 공지 등록 페이지
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

// 공지사항 수정 페이지
router.get('/noticeretouch',(req,res)=>{
  let id = req.query.id;
  db.getNoticeByid(id,(row)=>{
    res.render('noticeretouch',{row:row[0]});
  })
})
// // 공지사항 수정값 db에 저장
router.post('/noticeretouchdata',(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let impo = param['impo'];
  let title = param['title'];
  let exposure = param['exposure'];
  let author = param['author'];
  let authorpw = param['authorpw'];
  let notcon = param['notcon'];
  db.updateNotice(id,impo,title,exposure,author,authorpw,notcon,()=>{
    res.redirect('/notice');
  })
})

//공지사항 리스트에서 쿼리 id로  삭제 할 때 
router.get('/deleteNoticeList',(req,res)=>{
  let id = req.query.id;
  console.log(id);
  db.deleteByid(id,()=>{
    res.redirect('/notice');
  })
})
module.exports = router;

