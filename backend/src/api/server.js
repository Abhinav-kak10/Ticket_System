const app = require('../app');
const connectDB = require('../shared/config/db');

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});