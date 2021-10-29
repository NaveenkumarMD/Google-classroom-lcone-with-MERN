const mailer=require('nodemailer')
const AnnouncementMailtemplate=require('../Mail templates/Announcementtemplate')
const WorkMailtemplate=require('../Mail templates/WorkMailtemplate')
const sendMail=(maildata)=>{
    const {to,text,subject,html}=maildata
    return new Promise((resolve,reject)=>{
        const mailoptions={
            from:process.env.MAIL_USERNAME,
            password:process.env.MAIL_PASSWORD,
            to,
            text,
            subject,
            html
        }
        const transporter=mailer.createTransport({
            service:'gmail',
            auth:{
                user:mailoptions.from,
                pass:mailoptions.password
            }
        })
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                reject(err)
            }
            resolve("Mail sent successfully")
        })
    })
}

const AnnouncementMail=(maildata)=>{
    //send mail to all the users using sendMail function
    const {users,subject,content,Announcedby,room_name,time}=maildata
    users.forEach(user=>{
        const mailoptions={
            to:user,
            subject:subject,
            html:AnnouncementMailtemplate(Announcedby,room_name,time,content)

        }
        sendMail(mailoptions)
    })

}
 
const WorkMailer=(maildata)=>{
    console.log(maildata)
    const {subject,Assignedby,room_name,time,content,users,due }=maildata
    users.forEach(user=>{
        const mailoptions={
            to:user,
            subject:subject,
            html:WorkMailtemplate(Assignedby,room_name,time,content,due)

        }
        sendMail(mailoptions)
    })
}
//export all the functions
module.exports={
    sendMail,
    AnnouncementMail,
    WorkMailer
}