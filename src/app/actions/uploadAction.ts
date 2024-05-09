"use server"

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';


export async function uploadToS3(formData: FormData) {
  const file = formData.get('file') as File; // we have binary data here. 
  const s3Client = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    } 
  })
  // 'xxxx.jpg' => ['xxxxx', 'jpg'] => ['jpg'] => 'jpg'
  // slice(-1): 是截取下标从-1开始到结尾。
  const ext = file.name.split('.').slice(-1)[0];
  const newFilename = uniqid() + '.' + ext;  
  console.log('newFilename', newFilename)
  // grab this binary data: 
  const chunks = [];
  // @ts-ignore
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  // Buffer是用于处理二进制数据的对象
  const buffer = Buffer.concat(chunks);

  const bucket = process.env.AWS_BUCKET as string;
  await s3Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: newFilename,
    ACL: 'public-read',
    Body: buffer,
    ContentType: file.type,
  }));
  console.log('imageUrl', `https://${bucket}.s3.amazonaws.com/${newFilename}`)

  return {
    newFilename,
    ext,
    url: `https://${bucket}.s3.amazonaws.com/${newFilename}`,
  };

}