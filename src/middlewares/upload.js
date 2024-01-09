import multer from "multer";

// Set up storage for uploaded files

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        const fileType = file.mimetype.split('/')[0];

        if(fileType=='image'){
            cb(null , "public/images/");
        }
        else if(fileType=='video'){
            cb(null,"public/videos/");
        }
        else{
            cb(new Error("invalid file type"));
        }
     
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Create the multer instance
  const upload = multer({ storage: storage });
  
//   module.exports = upload;
export default upload;



