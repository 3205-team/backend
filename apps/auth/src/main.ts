import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

const PORT = parseInt(process.env.AUTH_PORT, 10) || 4000;
// whitelist: true
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          statusCode: 400,
          error: 'Bad Request',
          message: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    }),
  );
  app.useLogger(app.get(Logger));

  await app.listen(PORT, () => `🚀 Application running at port ${PORT}`);
}
bootstrap();
