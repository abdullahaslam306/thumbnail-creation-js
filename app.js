const Sharp = require("sharp");
const path=require('path')
const imagePath = path.join(__dirname + '/Abdullah.JPG');


// Read file from path Resize image and save on server
// console.log(imagePath)
// Sharp(imagePath)
// .resize(300, 250, {
// kernel: Sharp.kernel.nearest
// })
// .toFile('output.png')
// .then( (ImageResult) => {
// response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
// error : false,
// filepath: outputImageName,
// message: CONSTANTS.SUCCESSFUL_MESSAGE
// });
// })
// .catch ( () => {
// response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
// error : true,
// message : CONSTANTS.SERVER_ERROR_MESSAGE
// });
// });

Sharp(imagePath)
  .resize({ width: 100 })
  .toBuffer()
  .then(data => {
    console.log(data)
  });
