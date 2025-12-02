import mongoose from 'mongoose';
import type { LogEntryPayload } from '../schemas/LogEntrySchema'; 

const LogEntrySchema = new mongoose.Schema(
  {
    timestamp: { type: Date, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true },
    service: { type: String, required: true },
    environment: { type: String, required: true },
    traceId: { type: String },
    metadata: { type: Object }, 
  },
  {
    collection: 'log_entries',
    versionKey: false,
    timeseries: {
      timeField: 'timestamp', 
      metaField: 'metadata', 
      granularity: 'hours', 
    },
  }
);

export const LogEntryModel = mongoose.model<LogEntryPayload>('LogEntry', LogEntrySchema);