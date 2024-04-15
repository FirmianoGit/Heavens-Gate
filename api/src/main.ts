import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação - HeavensGate')
    .setDescription(
      'HeavensGate é uma aplicação para controle de presença e gerenciamento de membros de uma determinada congregação religiosa, fruto de um desafio proposto pela empresa TekSystem, a aplicação visa solucionar um problema proposto aos integrantes do grupo de desenvolvimento ',
    )
    .setVersion('1.0')
    .addTag('Membros')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
