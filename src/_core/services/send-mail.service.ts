import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Email, connect } from "node-mailjet";
import { SendMailParams } from "src/_common/models/send-mail-params.model";

@Injectable()
export class SendMailService {

  private logger: Logger = new Logger(this.constructor.name);

  private mailjet: Email.Client = connect(
    this.configService.get("MJ_APIKEY_PUBLIC"),
    this.configService.get("MJ_APIKEY_PRIVATE")
  );

  constructor(
    private configService: ConfigService,
  ) { }

  async sendMail({ from, to, title, htmlTemplate, customId }: SendMailParams): Promise<any> {
    const request = this.mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": from.email,
              "Name": from.name
            },
            "To": [
              {
                "Email": to.email,
                "Name": to.name,
              }
            ],
            "Subject": title,
            "TextPart": "text",
            "HTMLPart": htmlTemplate,
            "CustomID": customId,
          }
        ]
      });

      try {
        const { body } = await request;
        this.logger.log(`Email from ${from.email} to ${to.email} was sent`);
        return body;
      } catch (error) {
        this.logger.error(`Unable send email from ${from.email} to ${to.email}.`);
        console.log(error);
      }
  }
}