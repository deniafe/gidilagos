"use server";

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailParams {
    to: string[];
    from: string;
    subject: string;
    htmlContent: string;
  }
  

export async function sendEmail({ to, from, subject, htmlContent }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html: htmlContent,
    });

    return JSON.stringify(data);

  } catch (error) {
    console.log('There was an error sending the email', error);
    return JSON.stringify({ error });
  }
}
