import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
const sendGridKey = process.env.SENDGRID_KEY

dotenv.config()

export const sendEmail = (user, token) => {
  sgMail.setApiKey(sendGridKey)

  const msg = {
    to: user.email,
    from: process.env.SENDGRID_FROM,
    templateId: process.env.TEMPLATE_ID,
    dynamicTemplateData: {
      clientUrl: `${process.env.CLIENT_URL}/change-password?token=${token}`,
    },
  }

  sgMail.send(msg)
}
