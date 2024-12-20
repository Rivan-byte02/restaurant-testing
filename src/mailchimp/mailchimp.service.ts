import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailchimpService {
  private readonly apiKey = process.env.API_KEY; // Replace with your API Key
  private readonly baseUrl = process.env.BASE_URL;

  async sendEmail(toEmail: string, subject: string, body: string): Promise<void> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/messages/send.json`,
        {
          key: this.apiKey,
          message: {
            from_email: 'rivanakbar02@gmail.com',
            subject: subject,
            to: [{ email: toEmail, type: 'to' }],
            html: body,
          },
        },
      );
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email via Mailchimp:', error.response?.data || error.message);
      throw new Error('Failed to send email');
    }
  }
}
