var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'seomoonnotice'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// 공지사항 함수 시작
// 메인페이지 공지사항 띄어줄 함수

function getNoticeAtMain(callback){
    connection.query('select*from noticelist ORDER BY id desc LIMIT 3',(err,rows)=>{
        if(err)throw err;
        callback(rows);
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


//회원가입 정보 데이터베이스 입력 함수
function insertJoinData(userId,userPw,userRePw,userName,userNum,userSex,userEmail,callback){
    connection.query(`insert into jointable(userId,userPw,userRpw,name,userNum,userSex,userEmail,create_time)
    values('${userId}','${userPw}','${userRePw}','${userName}','${userNum}','${userSex}','${userEmail}',now())`,(err)=>{
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
    getNotice,getNoticeAtMain,insertMemo,deleteByid,getNoticeByid,updateNotice,
    insertJoinData,loginCheck
};