const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const env = require("dotenv");
env.config();

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

(async () => {
  const filePath = "./tempfiles/users.json"; // Replace with the path to your file

  // Read the file from the local filesystem
  try {
    const fileContent = fs.readFileSync(filePath);

    const fileExtension = path.extname(filePath);
    const contentType = getContentType(fileExtension);

    const params = {
      Bucket: "nbc-myuploads",
      Key: `file${fileExtension}`,
      Body: fileContent,
      ContentType: contentType
    };

    await s3.upload(params).promise();
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
})();

// Function to determine the content type based on file extension
function getContentType(fileExtension) {
  switch (fileExtension) {
    case ".json":
      return "application/json";
    case ".txt":
      return "text/plain";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    // Add more cases for other file types if needed
    default:
      return "application/octet-stream";
  }
}
