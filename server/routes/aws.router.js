const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

router.post(`/aws}`, (req, res) => {
    const { fileName, fileType } = req.body;
    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Expires: 60, // Expires in 60 seconds
        ContentType: fileType,
        ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${s3Params.Bucket}.s3.amazonaws.com/${fileName}`,
        };
        res.json(returnData);
    });
});

module.exports = router;
