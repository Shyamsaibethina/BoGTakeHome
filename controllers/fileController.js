import { updateDocumentWithFile } from '../models/db.js';

export const uploadFile = async (req, res) => {
  const { type, id } = req.body;

  if (!type || !id || !req.file) {
    return res.status(400).json({ error: 'Missing required fields or file' });
  }

  try {
    const fileUrl = req.file.location;
    await updateDocumentWithFile(req.db, type, id, fileUrl);
    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
