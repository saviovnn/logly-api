import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger'; 
import { connectDB } from './src/utils/db'; 
import { logs } from './src/routes/logs';

const app = new Elysia()

  .onStart(async () => {
    await connectDB();
  })
  
  .get('/', () => {
    return "Logly API funcionando!";
  })
  .use(logs)

  .use(swagger({
    path: '/doc',
    documentation: {
        info: {
            title: 'Logly API Documentation',
            version: '1.0.0'
        }
    }
  }));
  
app.listen(3000, () => {
    console.log(`Logly API rodando em http://localhost:${app.server?.port}`);
    console.log(`Documentação em http://localhost:${app.server?.port}/doc`);
});