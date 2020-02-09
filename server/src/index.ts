// Library
import path from 'path';
// Server Application
import app from './app';

// Read .env file to get enviornemt variable
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

// Set Up PORT number for listening
const PORT = process.env.PORT || 5000;

// Turning on server
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
