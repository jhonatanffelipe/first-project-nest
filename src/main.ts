import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configureService = app.get(ConfigService);

  const port = configureService.get<number>('PORT', 3000);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('First API with NestJS')
    .setDescription('API to manage the First API with NestJS application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port).then(() => {
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
  });
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
