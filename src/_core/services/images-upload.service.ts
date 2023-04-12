import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3, config, Credentials } from "aws-sdk";
import { fromBuffer } from "file-type";

@Injectable()
export class ImagesUploadService {
  private logger: Logger = new Logger(this.constructor.name);
  private s3: S3 = new S3();
  private s3BucketName: string = this.configService.get("S3_BUCKET_NAME");

  constructor(private configService: ConfigService) {
    const credentials = new Credentials({ 
      accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY")
    });
    const region = this.configService.get("REGION");
    config.update({ 
      credentials, 
      region 
    });
  }

  async uploadImageFromBuffer(buffer: Buffer): Promise<string> {
    try {
      const { ext, mime } = await fromBuffer(buffer);
      const objectUrl: string = await this.putObject(buffer, ext, mime);
      return objectUrl;
    } catch (e) {
      this.logger.error("uploadImageFromBuffer");
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  private putObject(buffer: Buffer, ext: string, mime: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const name: string = `${Date.now().toString()}-img.${ext}`;

      this.s3.putObject({
        Bucket: this.s3BucketName,
        Key: name,
        Body: buffer,
        ACL: "public-read",
        ContentType: mime,
      }, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(name);
      })
    });
  }
}