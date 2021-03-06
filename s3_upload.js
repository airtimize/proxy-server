const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Set the region 
AWS.config.update({region: 'us-west-1'});

// Create S3 service object
s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
const uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
const file = process.argv[3];

// Configure the file stream and obtain the upload parameters
const fs = require('fs');
const fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
const path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
