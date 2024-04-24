const con =require('../../Backend_Console/apis/config')

exports.nss_latest_news_table = () => {
    try {
        const updates_sql =`CREATE TABLE IF NOT EXISTS nss_latest_news(
            id int AUTO_INCREMENT PRIMARY KEY,
            date varchar(150) NOT NULL ,
            title varchar(500) NOT NULL,
            file_path varchar(500) NOT NULL);`; 
         con.query(updates_sql,(err,result)=>{
        if(err){
            console.log(err)
            console.log("NSS Latest News Table not Created")
        }else{
            // console.log(result)
        }
      });
    } catch (err) {
      console.log(err + "Server Unreachable");
    }
  };
  