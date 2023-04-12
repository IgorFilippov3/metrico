import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { stringify } from "querystring";
import axios from "axios";
import { GoogleUserModel } from "./models/google-user.model";
import { Subscription } from "src/_common/models/subscription.enum";

@Injectable()
export class GoogleService {
  private logger: Logger = new Logger(this.constructor.name);
  private SERVER_ADDRESS: string = this.configService.get("SERVER_ADDRESS");
  private GOOGLE_CLIENT_ID: string = this.configService.get("GOOGLE_OAUTH_CLIENT_ID");
  private GOOGLE_CLIENT_SECRET: string = this.configService.get("GOOGLE_OAUTH_CLIENT_SECRET");

  constructor(
    private configService: ConfigService,
  ) { }

  getGoogleAuthUrl(subscription?: Subscription): string {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options: any = {
      redirect_uri: `${this.SERVER_ADDRESS}/api/google/auth/callback`,
      client_id: this.GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    }

    if (subscription) {
      options.state = subscription;
    }

    return `${rootUrl}?${stringify(options)}`;
  }

  async getGoogleUser(code: string): Promise<GoogleUserModel> {
    const { id_token, access_token } = await this.getTokens({
      code,
      clientId: this.GOOGLE_CLIENT_ID,
      clientSecret: this.GOOGLE_CLIENT_SECRET,
      redirectUri: `${this.SERVER_ADDRESS}/api/google/auth/callback`,
    });

    const googleUser: GoogleUserModel = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    return googleUser;
  }

  private getTokens({
    code,
    clientId,
    clientSecret,
    redirectUri,
  }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }): Promise<{
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }> {
    const url: string = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    return axios
      .post(url, stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        throw new Error(error.message);
      });
  }
}