import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('交作业')
    .setDescription('desc')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/doc', app, document);
};
