import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
const sendGridKey = process.env.SENDGRID_KEY

dotenv.config()

export const sendEmail = (user, token) => {
  sgMail.setApiKey(sendGridKey)

  const msg = {
    to: user.email,
    from: 'talha.shakil@kwanso.com', // your email
    subject: 'Reset password requested',
    html: `<a href=${process.env.clientURL}/change-password?token=${token}>${token}</a>`,
  }

  sgMail.send(msg)
}
