const AWS = require("aws-sdk");
const fs = require("fs");
const env = require("dotenv");
env.config();

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

(async () => {
  const bucketName = "nbc-myuploads";
  const key = "file.json"; // Replace with the key/name of the JSON file in the bucket

  const params = {
    Bucket: bucketName,
    Key: key
  };

  try {
    const data = await s3.getObject(params).promise();
    const jsonContent = JSON.parse(data.Body.toString());
    console.log("Downloaded JSON file content:", jsonContent);
  } catch (error) {
    console.error("Error downloading JSON file:", error);
  }
})();
