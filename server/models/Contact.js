import { pool } from '../config/db.js';

// Select list aliases snake_case columns back to the camelCase keys the API and
// the admin frontend expect (_id, companyName, businessType, bottleSize, createdAt).
const COLS = `id AS "_id", name, company_name AS "companyName", phone, email, city,
              business_type AS "businessType", bottle_size AS "bottleSize", quantity, message,
              created_at AS "createdAt"`;

// Insert one inquiry and return the saved row (camelCase shape).
export const createContact = async (d) => {
  const { rows } = await pool.query(
    `INSERT INTO contacts
       (name, company_name, phone, email, city, business_type, bottle_size, quantity, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING ${COLS}`,
    [
      d.name,
      d.companyName ?? null,
      d.phone,
      d.email,
      d.city ?? null,
      d.businessType ?? null,
      d.bottleSize ?? null,
      d.quantity ?? null,
      d.message
    ]
  );
  return rows[0];
};

// List every inquiry, newest first.
export const getAllContacts = async () => {
  const { rows } = await pool.query(`SELECT ${COLS} FROM contacts ORDER BY created_at DESC`);
  return rows;
};
