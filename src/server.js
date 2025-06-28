import app from './app.js'
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import connectDB from './config/db.js';

const PORT = process.env.PORT 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
connectDB();

app.get('/', (req, res) => {
    res.sendStatus(200)
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})