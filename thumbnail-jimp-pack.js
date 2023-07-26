const AWS=require("aws-sdk");
const s3Client = new AWS.S3({region:'us-east-2'})
const jimp= require('jimp')
async function get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };

        let data = await s3Client.getObject(params).promise();
      
        if (!data) {
            throw Error(`Failed to get file ${fileName}, from ${bucket}`);
        }

        // if (/\.json$/.test(fileName)) {
        //     data = JSON.parse(data.Body.toString());
        // }
        return data;
}

async function write(data, fileName, bucket, ACL, ContentType) {
        const params = {
            Bucket: bucket,
            Body: Buffer.isBuffer(data) ? data : JSON.stringify(data),
            Key: fileName,
            ACL,
            ContentType,
        };
        console.log('params', params);

        const newData = await s3Client.putObject(params).promise();
        
        if (!newData) {
            throw Error('there was an error writing the file');

        }

        return newData;
    }

const resizeImage = async ({ bucket, file, width, height }) => {
    const imageBuffer = await get(file, bucket);
    const jimpImage = await jimp.read(imageBuffer.Body);
    const mime = jimpImage.getMIME();
    console.log(mime)
    jimpImage.write('orignal.png');
    // //resize(w,h).write('resize1.png');
     const resizedImageBuffer = await jimpImage.resize(width, height).getBufferAsync(mime);

    // // const shortFileName = file.split('/')[1];
    // // const newFileName = `resized/${width}x${height}/${shortFileName}`;
     const newFileName = "thumbnail-"+file;
    // newFileName="thumbNail"+file;



     await write(resizedImageBuffer, newFileName, bucket, 'public-read', mime);
    // return newFileName;
};
 resizeImage({ bucket:"thumbnailpoc", file:'download.png', width:200, height:200 }).then(success=>{
     console.log("success")
 }).catch(err=>console.log(err))