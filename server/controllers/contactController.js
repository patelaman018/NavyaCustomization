import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';

// Email is only attempted when real credentials are configured. With the
// default placeholder values we skip it so a failed notification never
// discards a successfully-saved inquiry.
const emailConfigured = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  return Boolean(
    process.env.EMAIL_HOST &&
    user && !user.startsWith('your_email') &&
    pass && pass !== 'your_app_password'
  );
};

const buildTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Build the notification email in the requested `field : "value"` format.
export const buildInquiryEmail = (contact) => {
  const fields = [
    ['name', contact.name],
    ['companyName', contact.companyName],
    ['phone', contact.phone],
    ['email', contact.email],
    ['city', contact.city],
    ['businessType', contact.businessType],
    ['bottleSize', contact.bottleSize],
    ['quantity', contact.quantity],
    ['message', contact.message]
  ];

  const text = fields.map(([k, v]) => `${k} : "${v || ''}"`).join('\n');

  const rows = fields
    .map(
      ([k, v]) =>
        `<div style="margin:3px 0;"><span style="color:#0b2545;font-weight:600;">${k}</span> <span style="color:#94a3b8;">:</span> <span style="color:#0f9d58;">&quot;${escapeHtml(v || '')}&quot;</span></div>`
    )
    .join('');

  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#0b2545;color:#ffffff;padding:16px 20px;border-radius:10px 10px 0 0;">
        <h2 style="margin:0;font-size:18px;">New Quote Request</h2>
        <p style="margin:4px 0 0;font-size:12px;color:#9fb3c8;">Navya Customization &middot; website enquiry</p>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:18px 20px;border-radius:0 0 10px 10px;font-family:'Consolas','Courier New',monospace;font-size:14px;line-height:1.7;">
        ${rows}
      </div>
      <p style="color:#94a3b8;font-size:11px;text-align:center;margin-top:12px;">Received on ${new Date().toLocaleString('en-IN')}</p>
    </div>`;

  return { text, html };
};

export const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('message').notEmpty().withMessage('Message is required')
];

export const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let contact;
  try {
    contact = await Contact.create(req.body);
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return res.status(500).json({ success: false, message: 'Unable to save inquiry' });
  }

  // Notification email is best-effort — never let it fail the request.
  if (emailConfigured()) {
    try {
      const { text, html } = buildInquiryEmail(contact);
      const mailOptions = {
        from: `"Navya Customization" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: contact.email,
        subject: `New Quote Request from ${contact.name}`,
        text,
        html
      };
      await buildTransporter().sendMail(mailOptions);
    } catch (error) {
      console.warn('Inquiry saved, but notification email failed:', error.message);
    }
  } else {
    console.info('Email not configured — skipping notification (inquiry still saved).');
  }

  return res.status(201).json({ success: true, message: 'Inquiry submitted successfully' });
};

// Admin: list every inquiry, newest first.
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return res.status(500).json({ success: false, message: 'Unable to fetch inquiries' });
  }
};
