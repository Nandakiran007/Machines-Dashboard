import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT|| 3001;
  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
