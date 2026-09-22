import express from 'express';
import { connectDatabase } from './config/database.js';
import activitiesRouter from './routes/activities.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/activities', activitiesRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error);
    process.exit(1);
  });
