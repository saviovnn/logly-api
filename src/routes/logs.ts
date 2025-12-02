
import { Elysia, t } from 'elysia';
import { z } from 'zod';
import type { LogEntryPayload } from '../schemas/LogEntrySchema';
import { LogEntrySchema } from '../schemas/LogEntrySchema';
import { LogEntryModel } from '../models/LogEntryModel';
import type { LogSearchQuery } from '../schemas/LogQuerySchema';
import { LogSearchQuerySchema } from '../schemas/LogQuerySchema';

const LogIngestionSchema = z.array(LogEntrySchema);

export const logs = new Elysia({ prefix: '/api/v1/logs' })
  .post('/', async ({ body }) => {
    const logsArray = body as LogEntryPayload[];
    const result = await LogEntryModel.insertMany(logsArray);
    return new Response(JSON.stringify({ 
      success: true, 
      count: result.length,
      message: 'Logs ingeridos com sucesso.'
    }), {
        status: 201, 
        headers: { 'Content-Type': 'application/json' }
    });
    
  }, {
    body: LogIngestionSchema
  })
  .get('/search', async ({ query }) => {
    const { startTime, endTime, level } = query as LogSearchQuery;
    
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const levelFilter = level ? { level: level } : {};
    
    const pipeline = [
        {
            $match: {
                timestamp: {
                    $gte: startDate, 
                    $lte: endDate    
                },
                ...levelFilter, 
            }
        },
        { $sort: { timestamp: -1 as const } }
    ];

    const results = await LogEntryModel.aggregate(pipeline);

    return { results };
}, {
    query: LogSearchQuerySchema
  });
  
