import { ObjectId } from 'mongodb';

export const createTrainingLog = async (req, res) => {
  const { date, description, hours, animal, trainingLogVideo } = req.body;
  const user = req.user.userId;

  if (!date || !description || !hours || !animal) {
    return res.status(400).json({ error: 'Missing some fields, please fill all of the required fields in' });
  }

  try {
    const checkAnimal = await req.db.collection('animals').findOne({ _id: new ObjectId(animal) });

    if (!checkAnimal) {
      return res.status(400).json({ error: 'Animal does not exist in DB' });
    }

    if (checkAnimal.owner.toString() !== user.toString()) {
      return res.status(400).json({ error: 'Animal does not belong to the user inputted' });
    }

    const newTrainingLog = {
      date,
      description,
      hours,
      animal,
      user,
      trainingLogVideo: trainingLogVideo || null,
    };

    await req.db.collection('trainingLog').insertOne(newTrainingLog);
    res.status(200).json({ message: 'Training log created successfully' });
  } catch (error) {
    console.error('Error when inserting a training log into database', error);
    res.status(500).json({ error: 'Error occurred when adding a training log' });
  }
};
