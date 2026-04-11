import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email, token) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Infinity Code" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email - Infinity Code",
    html: `
      <div style="max-width:480px;margin:0 auto;font-family:Arial,sans-serif;padding:20px;">
        <h2 style="color:#3b82f6;text-align:center;">Infinity Code</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align:center;margin:30px 0;">
          <a href="${verifyUrl}" style="background:linear-gradient(to right,#3b82f6,#9333ea);color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">
            Verify Email
          </a>
        </div>
        <p style="color:#6b7280;font-size:13px;">This link will expire in 24 hours.</p>
        <p style="color:#6b7280;font-size:13px;">If you didn't create an account, you can ignore this email.</p>
      </div>
    `,
  });
}

export async function sendResetPasswordEmail(email, token) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Infinity Code" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password - Infinity Code",
    html: `
      <div style="max-width:480px;margin:0 auto;font-family:Arial,sans-serif;padding:20px;">
        <h2 style="color:#3b82f6;text-align:center;">Infinity Code</h2>
        <p>You requested a password reset. Click the button below to set a new password:</p>
        <div style="text-align:center;margin:30px 0;">
          <a href="${resetUrl}" style="background:linear-gradient(to right,#3b82f6,#9333ea);color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">
            Reset Password
          </a>
        </div>
        <p style="color:#6b7280;font-size:13px;">This link will expire in 15 minutes.</p>
        <p style="color:#6b7280;font-size:13px;">If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });
}
