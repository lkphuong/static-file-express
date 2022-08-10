const express = require('express')
const port = 3000
const app = express()
const fs = require('fs')
app.use(express.json())
// setup static file in folder public
app.use(express.static('public'))

// setup multer
const multer  = require('multer')
const upload = multer({ dest: 'public/' })



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', upload.single('file'), function (req, res) {
   fs.renameSync(req.file.path,  req.file.path + "." + req.file.originalname.split('.').pop())
    res.status(200).json({message: 'Success', data:  req.file.path + "." + req.file.originalname.split('.').pop()})
})

app.delete('/delete', function (req, res) {
  console.log(fs.existsSync(req.body.delete))
    if(fs.existsSync(req.body.delete)) {
      fs.unlinkSync(req.body.delete)
    }
    res.status(200).json({message: 'Success', data: []})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})