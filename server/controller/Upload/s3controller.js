
const { uploadFile, downloadFile, deleteFile, listFiles, uploadFile2 }= require('../../services/uploadService/s3Service')



// List All Files from S3
module.exports = {
    // Upload File from S3
    getListFiles:async (req, res) => {
        const { success, data } = await listFiles()
        if (success) {
          return res.json({ success, data })
        }
        return res.status(500).json({ success: false, message: 'Error Occured !!!'})
    },


   // Upload File from S3
   S3Upload:async (req, res) => {
       
       let data=await  uploadFile2(req.files[0]).promise();
       console.log("data.Location :=>",data.Location);
        return res.json({ success: true, data: data })
      },


   S3MultiFileUpload:async (req, res) => {
        const files = req.files;
        let url=[];  
      for (const file of files) {
        const newPath = await uploadFile2(file)
        url.push(newPath)
     
      }
        uploadFile2(req.files[0])
        return res.json({ success: true, data: url})
      },
   // downloadfile File from S3
   downloadfile:async (req, res) => {
        const filename = req.query.filename
        console.log(req.query,"filenames")
        const { success, data } = await downloadFile(filename)
        if (success) {
          return res.json({ success, data })
        }
        return res.status(500).json({ success: false, message: 'Error Occured !!!'})
      },
      // Delete File from S3
      deleteFile:async (req, res) => {
        const filename = req.query.filename
        const { success, data } = await deleteFile(filename)
        if (success) {
          return res.json({ success, data })
        }
        return res.status(500).json({ success: false, message: 'Error Occured !!!'})
      },
}




// router.get('/list', async (req, res) => {
//   const { success, data } = await listFiles()
//   if (success) {
//     return res.json({ success, data })
//   }
//   return res.status(500).json({ success: false, message: 'Error Occured !!!'})
// });

// // Upload File to S3
// router.post('/upload', uploadFile.single('file'), async (req, res) => {
//   return res.json({ success: true, data: req.file })
// });

// // Download File from S3
// router.get('/download/:filename', async (req, res) => {
//   const filename = req.params.filename
//   const { success, data } = await downloadFile(filename)
//   if (success) {
//     return res.json({ success, data })
//   }
//   return res.status(500).json({ success: false, message: 'Error Occured !!!'})
// });

// router.delete('/delete/:filename', async (req, res) => {
//   const filename = req.params.filename
//   const { success, data } = await deleteFile(filename)
//   if (success) {
//     return res.json({ success, data })
//   }
//   return res.status(500).json({ success: false, message: 'Error Occured !!!'})
// });

