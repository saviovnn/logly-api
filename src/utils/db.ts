import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  if (!MONGO_URI) {
    console.error("❌ Erro: MONGO_URI não definida no .env.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    
    console.log("✅ MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Falha na conexão com o MongoDB:", error);
    process.exit(1); 
  }
}