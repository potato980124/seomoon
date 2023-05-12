var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'database-1.cnhgeyew7wkq.ap-northeast-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'ghdqjawls12',
  database : 'seomoonnotice',
  multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// 공지사항 함수 시작
// 메인페이지  띄어줄 db 내용들 담은 함수

function getDbAtMain(callback){
    connection.query('select*from noticelist ORDER BY id desc LIMIT 3;' + 'select*from photolist ORDER BY id desc LIMIT 8;',(err,rows)=>{
        if(err)throw err;
        let rowNoice = rows[0];
        let rowPhoto = rows[1];
        callback(rowNoice,rowPhoto);
    })
}
/* db에서 데이터 가져오는 함수 번호,제목,글쓴이,등록일,조회 */
function getNotice(callback){
    connection.query('SELECT*FROM noticelist ORDER BY id desc',(err,rows)=>{
        if(err) throw err;
        callback(rows);
    })
};

/* 등록페이지에서 db로 보내주는 함수 제목,중요,공지사항노출,작성자,비밀번호,내용 */
function insertMemo(title,impo,exposure,author,authorpw,notcon,callback){
    connection.query(`INSERT INTO noticelist(noticeTitle,important,exposure,author,authorPw,noticeCon,create_time,joinNum)values('${title}','${impo}','${exposure}','${author}','${authorpw}','${notcon}',now(),'0')`
    ,(err)=>{
        if(err) throw err;
        callback();
    }    
)}
// 공지사항 등록후 공지사항 세부페이지에 가져올 데이터 함수 (id가 일치하는 데이터만 추출)
function getNoticeByid(id,callback){
    connection.query(`select*from noticelist where id=${id}`,(err,row)=>{
        if(err) throw err;
        callback(row);
    })
};
// 공지사항 리스트에서 삭제 버튼 클릭 했을시 db 테이블에서 지울 함수
function deleteByid(id,callback){
    connection.query(`delete from noticelist where id=${id} `,(err)=>{
        if (err) throw err;
        callback();
    })
}

// 수정페이지에서 수정한 데이터들 db로 넘겨 줄 함수
function updateNotice(id,impo,title,exposure,author,authorpw,notcon,callback){
    connection.query(`update noticelist set noticeTitle = '${title}',important = '${impo}', exposure='${exposure}',author='${author}',authorPw = '${authorpw}',noticeCon = '${notcon}',create_time = now()
    where id ='${id}'`,(err)=>{
        if(err)throw err;
        callback();
    })
}







// 현장스케치 동록페이지에서 db로 보내주는 함수
function insertPhotoList(title,impo,exposure,author,authorpw,gallerycon,imgfile,callback){
    connection.query(`INSERT INTO photolist (galleryTitle,important,exposure,author,authorPw,galleryCon,create_time,joinNum,gallerlyImg)values('${title}','${impo}','${exposure}','${author}','${authorpw}','${gallerycon}',now(),'0','${imgfile}')`,
    (err)=>{
        if(err) throw err;
        callback();
    })
}
// 현장 스케치 리스트 페이지에 db 리스트 뽑아주는 함수
function getPhotoList(callback){
    connection.query('SELECT*FROM photolist ORDER BY id',(err,rows)=>{
        if(err) throw err;
        callback(rows);
    })
}

//현장 스케치 세부 페이지에 db 데이터 뽑아주는 함수
function getPhotoListById(id,callback){
    connection.query(`select*from photolist where id=${id}`,(err,row)=>{
        if(err) throw err;
        callback(row);
    })
}

//현장스케치 수정내용 db에 없데이트

function photolistUpdate(id,title,impo,exposure,author,authorpw,gallerycon,imgfile,callback){
    connection.query(`update photolist set galleryTitle = '${title}',important = '${impo}', exposure='${exposure}',author='${author}',authorPw = '${authorpw}',galleryCon = '${gallerycon}',create_time = now(),gallerlyImg = '${imgfile}' where id ='${id}'`,
    (err)=>{
        if(err)throw err;
        callback();
    })
}
//현장스케치 리스트,내용 삭제 함수
function photolistDelete(id,callback){
    connection.query(`delete from photolist where id ='${id}'`,(err)=>{
        if(err)throw err;
        callback();
    })
}

//매대 등록 페이지에서 db로 보내주는 함수

function insertSellerList(storename,menu,menuprice,recomenu,storeimg,storeimg2,storeimg3,storeintro,callback){
    connection.query(`INSERT INTO sellertable (storename,menu,menuprice,recomenu,storeimg,storeimg2,storeimg3,storeintro)values('${storename}','${menu}','${menuprice}','${recomenu}','${storeimg}','${storeimg2}','${storeimg3}','${storeintro}')`,(err)=>{
        if (err) throw err;
        callback();
    })
}
//매대 정보 db에 저장된 데이터 리스트에 뽑아주는 함수
function getSellertable(callback){
    connection.query(`SELECT*FROM sellertable ORDER BY id`,(err,rows)=>{
        if (err) throw err;
        callback(rows);
    })
}
//매대 상세 페이지에 프라이머리키인 id기준으로 db정보 뽑아주는 함수 
function getSellertableByid(id,callback){
    connection.query(`select*from sellertable where id=${id}`,(err,row)=>{
        if(err) throw err;
        callback(row);
    })
}
// 매대 수정 페이지 정보 db에 업데이트 해주는 함수
function updateSellertable(id,storename,menu,menuprice,recomenu,storeimg,storeimg2,storeimg3,storeintro,callback){
    connection.query(`update sellertable set storename = '${storename}',menu = '${menu}', menuprice='${menuprice}',recomenu='${recomenu}',storeimg = '${storeimg}',storeimg2 = '${storeimg2}',storeimg3 = '${storeimg3}',storeintro = '${storeintro}' where id ='${id}'`,(err)=>{
        if(err) throw err;
        callback();
    })
}
// 매대 상세페이지 delete 버튼 을 통해 해당 db 내용 지워주는 함수
function deleteSellerByid(id,callback){
    connection.query(`delete from sellertable where id ='${id}'`,(err)=>{
        if(err) throw err;
        callback();
    })
}


//회원가입 정보 데이터베이스 입력 함수
function insertJoinData(userId,userPw,userRePw,userName,userNum,userSex,userEmail,callback){
    connection.query(`insert into jointable(userId,userPw,userRpw,name,userNum,userSex,userEmail,create_time)values('${userId}','${userPw}','${userRePw}','${userName}','${userNum}','${userSex}','${userEmail}',now())`,(err)=>{
        if(err) throw err; 
        callback();
    })
}
//로그인 정보 확인 데이터 베이스 출력 함수
function loginCheck(id,pw,callback){
    connection.query(`select * from jointable where userId ='${id}' and userPw ='${pw}'`,(err,results)=>{
        if(err) throw err;
        callback(results);
    })
}


module.exports = 
{
    getNotice,getDbAtMain,insertMemo,deleteByid,getNoticeByid,updateNotice,
    insertJoinData,loginCheck,insertPhotoList,getPhotoList,getPhotoListById,photolistUpdate,photolistDelete,
    insertSellerList,getSellertable,getSellertableByid,updateSellertable,deleteSellerByid
};