import sgMail from "@sendgrid/mail";

export interface EmailServiceModel {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class EmailService {
  private fromEmail: string;
  private fromName = "UpBar";

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    this.fromEmail = process.env.FROM_SENDGRID_EMAIL!;
  }

  async sendEmail(serviceEmail: EmailServiceModel): Promise<void> {
    try {
      await sgMail.send({
        ...serviceEmail,
        from: { email: this.fromEmail, name: this.fromName },
      });
    } catch (error: any) {
      console.log(error.response.body);
    }
  }
}
