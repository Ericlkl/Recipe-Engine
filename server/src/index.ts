import path from 'path';
import app from './app';

require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const PORT = process.env.PORT || 5000;

// Turning on server
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
