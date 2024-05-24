const cloudinary = require('cloudinary').v2


exports.cloudinaryImageUploader = async(file , folder , hight , quality) => {
    const options = {folder};
    if(hight) options.hight = hight;
    if(quality) options.quality = quality;
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}