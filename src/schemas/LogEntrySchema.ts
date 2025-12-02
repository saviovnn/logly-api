import { z } from 'zod';

export const LogEntrySchema = z.object({
  timestamp: z.string().datetime().describe('Timestamp do evento em formato ISO 8601.'),
  level: z.enum(['INFO', 'WARN', 'ERROR', 'DEBUG', 'FATAL']).describe('Nível de severidade do log.'),
  message: z.string().min(1).describe('A mensagem principal do log.'),
  
  service: z.string().min(1).describe('Nome do microserviço/aplicação que gerou o log.'),
  environment: z.enum(['production', 'staging', 'development']).default('production').describe('Ambiente de origem do log.'),
  traceId: z.string().uuid().optional().describe('ID de rastreamento para correlacionar logs de uma única requisição.'),
  
  metadata: z.record(z.string(), z.any()).optional().describe('Quaisquer dados JSON extras não definidos no schema.'),
});

export type LogEntryPayload = z.infer<typeof LogEntrySchema>;