const admins_schema = require('./AdminSchema')
const nss_notification_updates_schema = require('./UpdatesSchema')

exports.allSchemas = ()=>{
    
    admins_schema.admin_table()
    nss_notification_updates_schema.nss_notification_updates_table()


}
