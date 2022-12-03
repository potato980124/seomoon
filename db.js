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

/* db에서 데이터 가져오는 함수 번호,제목,글쓴이,등록일,조회 */
function getNotice(callback){
    connection.query('SELECT*FROM noticelist ORDER BY id DESC',(err,rows)=>{
        if(err) throw err;
        callback(rows);
    })
};
// 공지사항 등록후 공지사항 세부페이지에 가져올 데이터 함수
function getNoticeDetail(callback){
    connection.query('SELECT*FROM noticelist ORDER BY id DESC',(err,rows)=>{
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

module.exports = 
{
    getNotice,insertMemo,getNoticeDetail
};