const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    envVars[match[1].trim()] = val;
  }
});

cloudinary.config({
  cloud_name: envVars['CLOUDINARY_CLOUD_NAME'],
  api_key: envVars['CLOUDINARY_API_KEY'],
  api_secret: envVars['CLOUDINARY_API_SECRET'],
});

cloudinary.api.ping(function(error, result) {
  if (error) {
    console.error("Ping Error:", JSON.stringify(error, null, 2));
  } else {
    console.log("Ping Success:", result);
  }
});
