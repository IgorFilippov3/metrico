import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { resolve } from 'path';

@Controller()
export class AppController {

  @Get("/about")
  about(@Res() res: Response): void {
    return res.sendFile(resolve(__dirname, "../browser/landing/index.html"));
  }

  @Get("/terms-of-service") 
  terms(@Res() res: Response) {
    res.sendFile(resolve(__dirname, "../browser/landing/terms-of-service.html"));
  }

  @Get("/privacy-policy") 
  policy(@Res() res: Response) {
    res.sendFile(resolve(__dirname, "../browser/landing/privacy-policy.html"));
  }

  // @Get("/pricing") 
  // pricing(@Req() request: Request, @Res() res: Response) {
  //   return request.session["user"]
  //     ? res.sendFile(resolve(__dirname, "../browser/landing/pricing.html")) 
  //     : res.redirect("/about");
  // }
}
