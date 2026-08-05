// Simple shared-key gate for admin-only routes.
// The client sends the key in the `x-admin-key` header; it must match ADMIN_KEY.
export const adminAuth = (req, res, next) => {
  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ success: false, message: 'Admin key not configured on the server.' });
  }

  const provided = req.headers['x-admin-key'];
  if (provided !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Invalid admin passcode.' });
  }

  next();
};
