// app.js
import express from 'express';
import morgan from './src/configs/morgan.js';
import logger from './src/configs/loggers.js';
import mongoose from 'mongoose'; 
import config from './src/configs/config.js';
import courseRouter from './src/routers/courseRoute.js';
import moduleRouter from './src/routers/moduleRouter.js';
import cors from 'cors';
import lessonRouter from './src/routers/LessonRouter.js';
import masterRouter from './src/routers/MasterRouter.js';
import analyticsRouter from './src/routers/analyticsRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:2999',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(morgan.errorHandler);
app.use(morgan.successHandler);

app.use(express.json({ limit: '550mb' }));
app.use(express.urlencoded({ extended: true, limit: '550mb' }));

app.get('/core', (req, res) => {
  res.send('I am working');
});

app.use("/core/courses", courseRouter);
app.use("/core/modules", moduleRouter);
app.use("/core/lessons", lessonRouter);
app.use("/core/master", masterRouter);
app.use("/core/analytics", analyticsRouter)


mongoose.connect(config.mongoDbUri).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});