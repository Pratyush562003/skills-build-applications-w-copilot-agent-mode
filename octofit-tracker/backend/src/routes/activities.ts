import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user workout').sort({ completedAt: -1 }));
});

router.get('/:id', async (request, response) => {
  const activity = await Activity.findById(request.params.id).populate('user workout');
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.json(activity);
});

router.post('/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(await activity.populate('user workout'));
});

router.put('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, {
    returnDocument: 'after',
    runValidators: true,
  }).populate('user workout');
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.json(activity);
});

router.delete('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id);
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.status(204).send();
});

export default router;
