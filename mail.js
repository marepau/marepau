const mailer = require("nodemailer")
const config = require('./secrets')

const pass = config.emailPass

const getEmailData = (from, name, message) => {
  let html = `<p>${message}<p>
              <br\>
              <p>From: ${from}</p>`

  let data = {
    from,
    to: "marepau@gmail.com",
    subject: `New message from ${name}`,
    name,
    html
  }
  return data
}

const sendEmail = (from, name, message) =>{
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth:{
      user:"marepau@gmail.com",
      pass
    }
  })

  const mail = getEmailData(from, name, message)

  smtpTransport.sendMail(mail, function(error, response){
    if(error){ console.log(error) }
    else {console.log("successfully sent")}
    smtpTransport.close()
  })

}

module.exports = { sendEmail }
