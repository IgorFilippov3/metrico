import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AppController } from 'src/app.controller';
import { MetricsModule } from 'src/metrics/metrics.module';
import { UsersModule } from 'src/users/users.module';
import { CoreModule } from 'src/_core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { GoogleModule } from './google/google.module';
import { PaymentsModule } from './payments/payments.module';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  { path: "/api", module: AuthModule },
  { path: "/api", module: MetricsModule },
  { path: "/api", module: UsersModule },
  { path: "/api", module: PagesModule },
  { path: "/api", module: GoogleModule },
  { path: "/api", module: PaymentsModule },
];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, "../browser/dist/browser"),
      exclude: ["/api*"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get("DATABASE_URL"),
        type: "postgres",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        
        ssl: false,
      }),
    }),
    RouterModule.forRoutes(routes),
    CoreModule,
    AuthModule,
    MetricsModule,
    UsersModule,
    PagesModule,
    GoogleModule,
    PaymentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
