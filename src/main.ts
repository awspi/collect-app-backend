import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';
import { AppModule } from './app.module';
import { FastifyLogger } from './common/logger';

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );
  //? 接口版本化管理
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  await app.listen(3001);
}
bootstrap();
