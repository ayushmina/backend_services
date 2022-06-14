
const cloudinary = require('../../services/cloudinary/cloudinary');

exports.upload_ON_Cloudinary =async (req, res) => {
    try{
    const uploader = async (path) =>{
       
       let data= await cloudinary.uploads(path, 'uploads');
       return data;
        }
    
      const urls = []
      req.files &&
        req.files.map((val) => {
          val.path = (`./uploads/${val.filename}`);
        });
      const files = req.files;
    
      
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
     
      }
  
      res.status(200).json({
        message: 'images uploaded successfully',
        data: urls
      })
    }catch(error){
        console.log(error,"error")
        throw error
    }
   
    }
