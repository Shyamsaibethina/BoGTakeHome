export const createAnimal = async (req, res) => {
    const { name, hoursTrained, dateOfBirth, profilePicture } = req.body;
    const owner = req.user.userId;
  
    if (!name || !hoursTrained) {
      return res.status(400).json({ error: 'Missing some fields, please fill all of the required fields in' });
    }
  
    try {
      const newAnimal = {
        name,
        hoursTrained,
        owner,
        dateOfBirth: dateOfBirth || null,
        profilePicture: profilePicture || null,
      };
  
      await req.db.collection('animals').insertOne(newAnimal);
      res.status(200).json({ message: 'Animal created successfully' });
    } catch (error) {
      console.error('Error when inserting animal into database', error);
      res.status(500).json({ error: 'Error occurred when adding an animal' });
    }
  };
  