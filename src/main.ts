import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppDataSource } from './database/ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  setupSwaggerDocumentation(app);

  try {
    const { isInitialized } = await AppDataSource.initialize();
    // here you can start to work with your database
    console.log(`Data source connected: ${isInitialized}`);
  } catch (error) {
    console.log(`Data source connection error: ${error}`);
  }

  await app.listen(process.env.PORT || 3000);
}

function setupSwaggerDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('F1 fantasy app')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('F1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

bootstrap();
