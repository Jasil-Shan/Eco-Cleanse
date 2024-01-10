import nodemailer from 'nodemailer'

let otpValue

export function sendVerificationCode(email,role,pass) {
  console.log('ver',email);
  const otp = Math.floor(1000 + Math.random() * 9000);
  let password = "zqcmrhbtvebqrbhu"
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, auth: {
        user: 'ecocleanse55@gmail.com',
        pass: password,
      },
    });

    if(role == 'user'){
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Eco Cleanse Email verification",
      html: `
            <h1>Verify Your Email For Eco Cleanse</h1>
              <h3>use this code in Eco Cleanse to verify your email</h3>
              <h2>${otp}</h2>
            `,
    }

  }else{
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Eco Cleanse Employee Registration",
      html: `
            <h1>Welcome to Eco cleanse </h1>
              <h3>Use this email and password to login</h3>
              <h2>Email :${email}</h2>
              <h2>Password :${pass}</h2>
            `,
    }

  }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error", error, info)
        reject(error)

      } else {
        console.log("success")
        otpValue = otp
        resolve({ success: true, message: "Email sent successfull" })
      }
    });
  })
}


export function verifyOtp(otp) {
  if (otpValue == otp) {
    return true
  } else {
    return false
  }
}
