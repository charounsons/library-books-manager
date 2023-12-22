import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Enable CORS with custom options (Optional)
  // app.enableCors({
  //   origin: 'http://localhost:4200', // specify the allowed origin
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify the allowed HTTP methods
  //   allowedHeaders: ['Content-Type', 'Authorization'], // specify the allowed headers
  // });
  await app.listen(3000);
}
bootstrap();
