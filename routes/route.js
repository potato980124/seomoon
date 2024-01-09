const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('./../db.js');


router.get('/',(req,res)=>{
  db.getDbAtMain((rowNoice,rowPhoto)=>{
    res.render('index',{rowNoice:rowNoice,rowPhoto:rowPhoto});
  })
})

router.get('/joinsuc',(req,res)=>{
  res.render('joinsuc');
})
//로그인페이지
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
//회원가입페이지
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
    res.redirect('/joinsuc');
  })
})






// 파일 업로드 할 때 
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.resolve(__dirname, '../public/uploads/'));
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);//파일의 확장자
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);//파일명 + 날짜 + 확장자명
    }
  }),
  limits :{fileSize: 1024 * 1024 * 10} //2메가까지 업로드 가능 
})
//야시장 안내 페이지
router.get('/introsub',(req,res)=>{
  res.render('introsub');
})
//야시장 매대위치 페이지
router.get('/locationsub',(req,res)=>{
  db.getSellertable((rows)=>{
    res.render('location',{rows:rows});
  })
})
// 야시장 오시는길 페이지
router.get('/direction',(req,res)=>{
  res.render('direction');
})
//매대등록 페이지
router.get('/sellerregis',(req,res)=>{
  res.render('sellerregistration')
})
router.post('/sellerinfo',upload.array('storeimg',3),(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let storename = param['storename'];
  let menu = param['menu'];
  let menuprice = param['menuprice'];
  let recomenu = param['recomenu'];
  let storeimg = '';
  let storeimg2 = '';
  let storeimg3 = '';
  let storeintro = param['storeintro'];
  for (let i = 0; i < req.files.length; i++) {
    if(req.files[i] && req.files[i].filename && i==0){
      storeimg = 'uploads/'+req.files[i].filename;
    } else if(req.files[i] && req.files[i].filename && i==1){
      storeimg2 = 'uploads/'+req.files[i].filename;
    } else if(req.files[i] && req.files[i].filename && i==2){
      storeimg3 = 'uploads/'+req.files[i].filename;
    }
  }
  db.insertSellerList(storename,menu,menuprice,recomenu,storeimg,storeimg2,storeimg3,storeintro,()=>{
    res.redirect('/locationsub');
  })
})
//매대 수정 페이지
router.get('/sellerretouch',(req,res)=>{
  let id = req.query.id;
  db.getSellertableByid(id,(row)=>{
    res.render('sellerretouch',{row:row[0]});
  })
})
router.post('/sellerretouchinfo',upload.array('storeimg',3),(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let storename = param['storename'];
  let menu = param['menu'];
  let menuprice = param['menuprice'];
  let recomenu = param['recomenu'];
  let storeimg = 'uploads/'+req.files[0].filename;
  let storeimg2 = 'uploads/'+req.files[1].filename;
  let storeimg3 = 'uploads/'+req.files[2].filename;
  let storeintro = param['storeintro'];
  db.updateSellertable(id,storename,menu,menuprice,recomenu,storeimg,storeimg2,storeimg3,storeintro,()=>{
    res.redirect('/locationsub');
  });
})


//매대 상세 페이지
router.get('/sellerdetail',(req,res)=>{
  let id = req.query.id;
  db.getSellertableByid(id,(row)=>{
    res.render('sellerdetail',{row:row[0]});
  })
})
//매대 상세 페이지에서 해당 db 내용 삭제 
router.get('/deleteseller',(req,res)=>{
  let id = req.query.id;
  db.deleteSellerByid(id,()=>{
    res.redirect("/locationsub");
  })
})


// ----- 공지----
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




//포토 갤러리 시작
//현장 스케치 리스트
router.get('/photolist',(req,res)=>{
  db.getPhotoList((rows)=>{
    console.log(rows);
    res.render('photolist',{rows:rows});
  })
})


// 현장스케치 등록 
router.get('/photowrite',(req,res)=>{
  res.render('photoregis');
})

router.post('/photowrite',upload.single('imgfile'),(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let impo = param['impo'];
  let title = param['title'];
  let exposure = param['exposure'];
  let author = param['author'];
  let authorpw = param['authorpw'];
  let gallerycon = param['photocon'];
  let imgfile = '';
  if (req.file && req.file.filename) {
    imgfile = 'uploads/'+req.file.filename;
  }
  db.insertPhotoList(title,impo,exposure,author,authorpw,gallerycon,imgfile,()=>{
    res.redirect('/photolist');
  })
})

// 현장스케치 세부 페이지
router.get('/detailphoto',(req,res)=>{
  let id = req.query.id;
  db.getPhotoListById(id,(row)=>{
    res.render('detailphoto',{row:row[0]});
  })
})

//현장스케치 수정 페이지
router.get('/photoretouch',(req,res)=>{
  let id = req.query.id;
  db.getPhotoListById(id,(row)=>{
    res.render('photoretouch',{row:row[0]});
  })
})
//현장스케치 수정한 내용 db 저장
router.post('/photoretouch',upload.single('imgfile'),(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let impo = param['impo'];
  let title = param['title'];
  let exposure = param['exposure'];
  let author = param['author'];
  let authorpw = param['authorpw'];
  let gallerycon = param['photocon'];
  if (req.file && req.file.filename) {
    imgfile = 'uploads/'+req.file.filename;
  }
  db.photolistUpdate(id,title,impo,exposure,author,authorpw,gallerycon,imgfile,()=>{
    res.redirect('/photolist');
  })
})
//현장스케치 삭제
router.get('/deletephotolist',(req,res)=>{
  let id = req.query.id;
  db.photolistDelete(id,()=>{
    res.redirect('/photolist')
  })
})
module.exports = router;