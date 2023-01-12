import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/base.exception.filter';
import { AllExceptionsFilter } from './common/exception/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
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

  //? 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  //? 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3001);
}
bootstrap();
