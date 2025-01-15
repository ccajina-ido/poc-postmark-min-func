import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PostmarkService {
  private client: ServerClient;

  constructor() {
    const apiKey = process.env.POSTMARK_API_TOKEN;
    if (!apiKey) {
      throw new Error('Postmark API token not found in environment variables.');
    }
    this.client = new ServerClient(apiKey);
  }

  async sendEmail(to: string, subject: string, textBody: string): Promise<void> {
    try {
      await this.client.sendEmail({
        From: process.env.POSTMARK_FROM_EMAIL,
        To: to,
        Subject: subject,
        TextBody: textBody,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}