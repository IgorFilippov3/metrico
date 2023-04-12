import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import * as session from "express-session";
import * as passport from "passport";
import * as compression from 'compression';
import { getConnection, Repository } from "typeorm";
import { TypeormStore } from "typeorm-store";
import sslRedirect from 'heroku-ssl-redirect';
import { resolve } from 'path';
import { Session } from './auth/session.entity';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const repository: Repository<Session> = getConnection().getRepository(Session);
  const logger: Logger = new Logger("bootstrap");
  const port = process.env.PORT || 8080;
  const host = '0.0.0.0';

  app.use(sslRedirect());
  app.use(compression());
  app.use(
    session({
      secret: "nice",
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({ repository }),
      cookie: {
        maxAge: 86400000 * 30,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port, host);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();