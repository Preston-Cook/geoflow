import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY as string;
const resend = new Resend(API_KEY);

export default resend;
