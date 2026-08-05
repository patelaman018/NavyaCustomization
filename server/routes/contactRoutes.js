import express from 'express';
import { createContact, validateContact, getContacts } from '../controllers/contactController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/contact', validateContact, createContact);
router.get('/contacts', adminAuth, getContacts);

export default router;
