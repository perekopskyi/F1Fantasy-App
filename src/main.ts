import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  setupSwaggerDocumentaion(app);
  await app.listen(3000);
}

function setupSwaggerDocumentaion(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('F1 fantasy app')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('F1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();