const admins_schema = require('./AdminSchema')
const nss_notification_updates_schema = require('./UpdatesSchema')
const nss_downloads=require('./Downloadschema')
exports.allSchemas = ()=>{
    
    admins_schema.admin_table()
    nss_notification_updates_schema.nss_notification_updates_table()
    nss_downloads.nss_download_table()


}
