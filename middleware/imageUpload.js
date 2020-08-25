const multer = require('multer');
const path = require('path');

const imageFilter = (req, file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        cb(null, true)
    } 
    else {
        cb("Please upload only images.", false);
    }

}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './resources/public/uploads')
  },
  filename: function(req, file, cb){
    cb(null,file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: imageFilter
});

module.exports = uploadImage;

