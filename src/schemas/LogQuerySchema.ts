
import { z } from 'zod';

const LevelEnum = z.enum(['INFO', 'WARN', 'ERROR', 'DEBUG', 'FATAL']);

export const LogSearchQuerySchema = z.object({
  startTime: z.string().datetime().describe('Data e hora de início da busca (ISO 8601).'),
  endTime: z.string().datetime().describe('Data e hora final da busca (ISO 8601).'),
  level: LevelEnum.optional().describe('Filtra por nível de severidade.'),
});

export type LogSearchQuery = z.infer<typeof LogSearchQuerySchema>;