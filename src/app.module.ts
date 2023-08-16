import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { databaseConfig } from './config/database';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    AuthModule,
    UserModule
  ],
})
export class AppModule {}
