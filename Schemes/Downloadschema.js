const con =require('../apis/config')

exports.nss_download_table = () => {
    try {
        const updates_sql =`CREATE TABLE IF NOT EXISTS nss_downloads(
            id int AUTO_INCREMENT PRIMARY KEY,
            title varchar(500) NOT NULL,
            file_path varchar(500) NOT NULL);`; 
         con.query(updates_sql,(err,result)=>{
        if(err){
            console.log(err)
            console.log("NSS downloads Updates Table not Created")
        }else{
            // console.log(result)
        }
      });
    } catch (err) {
      console.log(err + "Server Unreachable");
    }
  };
  