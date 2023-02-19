// import express from "express";
import cors from "cors";

import helmet from "helmet";

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { HttpExceptionFilter, NotFoundExceptionFilter } from "./filters/exception.filter";

import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // @ts-ignore
  app.use(new helmet());

  // app.use(express.urlencoded({ extended: true }));
  // app.use(express.json({ limit: "100mb" }));

  const corsConfig = { credentials: true, origin: true };
  // app.use(cors(corsConfig));
  // app.options("*", cors(corsConfig));

  // app.use(cookieParser());
  // @ts-ignore
  // app.use(logger);

  // app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter(), new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
  .setTitle("Health Declaration")
  .setDescription("Health Declaration API")
  .setVersion("1.0.0")
  .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("/swagger", app, document)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
