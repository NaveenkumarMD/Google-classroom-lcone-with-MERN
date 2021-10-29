const mailer=require('nodemailer')

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

module.exports=sendMail