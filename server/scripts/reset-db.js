import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/discordclone';

await mongoose.connect(uri);
await mongoose.connection.dropDatabase();
await mongoose.disconnect();
console.log('Database cleared:', uri);
