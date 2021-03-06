

const sendToSES = async (req, res) => {

  const AWS = require("aws-sdk")
  const sendToEmail = "sandrofillinich@gmail.com"

  console.log(req)

  if (req?.body?.name && req?.body?.email && req?.body?.message) {
    const { name, email, message } = req.body

    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: 'us-east-2'
    })

    const ses = new AWS.SES({ apiVersion: "2010-12-01" })

    const params = {
      Destination: {
        ToAddresses: [sendToEmail] // Email address/addresses that you want to send your email
      },
      //   ConfigurationSetName: <<ConfigurationSetName>>,
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data:
              `<html>
                  <body>
                    From: ${name}
                    <br />
                    Message: ${message}
                  </body>
              </html>`
          },
          Text: {
            Charset: "UTF-8",
            Data: ""
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "From Contact Form"
        }
      },
      Source: sendToEmail,
      ReplyToAddresses: [email]
    }

    ses.sendEmail(params).promise().then(data => {
        console.log("email submitted to SES", data);
        res.status(200).send(`Message sent`)
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(`Message unsuccesfully sent, error: ${error}`)
    })
  } else {
    return res.status(400).send("Bad request")
  }

}

module.exports = sendToSES