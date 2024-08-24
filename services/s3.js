import AWS from 'aws-sdk';
import { config } from '../config/config.js';

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

export default s3;
