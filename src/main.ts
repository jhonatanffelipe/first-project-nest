import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configureService = app.get(ConfigService);

  const port = configureService.get<number>('PORT', 3000);

  await app.listen(port).then(() => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
