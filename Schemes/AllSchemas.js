const admins_schema = require('./AdminSchema')
const nss_notification_updates_schema = require('./UpdatesSchema')
const nss_downloads=require('./Downloadschema')
const nss_latest_news=require('./LatestNewsSchema')
exports.allSchemas = ()=>{
    
    admins_schema.admin_table()
    nss_notification_updates_schema.nss_notification_updates_table()
    nss_downloads.nss_download_table()
    nss_latest_news.nss_latest_news_table()


}
