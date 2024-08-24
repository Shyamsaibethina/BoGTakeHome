import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3.js';
import { config } from '../config/config.js';

const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.aws.bucketName,
    acl: 'public-read',
    key: (req, file, cb) => {
      const type = req.body.type;
      const id = req.body.id;
      cb(null, `${type}/${id}-${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
