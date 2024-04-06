const con =require('../../Backend_Console/apis/config')

exports.nss_notification_updates_table = () => {
    try {
        const updates_sql =`CREATE TABLE IF NOT EXISTS nss_notification_updates(
            id int AUTO_INCREMENT PRIMARY KEY,
            date varchar(150) NOT NULL ,
            title varchar(500) NOT NULL,
            file_path varchar(500) NOT NULL);`; 
         con.query(updates_sql,(err,result)=>{
        if(err){
            console.log(err)
            console.log("NSS Notification Updates Table not Created")
        }else{
            // console.log(result)
        }
      });
    } catch (err) {
      console.log(err + "Server Unreachable");
    }
  };
  