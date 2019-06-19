// Dependency
const express  = require('express');
const app      = express();
const server   = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs-extra')
const sharp = require('sharp');

// Config
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));
app.use(bodyParser.json());

// Static files path
app.use(express.static(__dirname + '/image_file'));
app.use(express.static(__dirname + '/image_destination'));

// Route for make thubnail
app.get('/make_thubnail', function(req, res) {
    try {
        fs.copySync(path.resolve(__dirname,'./image_file/The-BIG-Firms-are-using-Node.Js-for-Web-and-Mobile-App.jpg'), path.resolve('./image_destination/copy-resize2.jpg'));
        sharp(path.resolve(__dirname,'./image_destination/copy-resize2.jpg')).toBuffer().then(
            (data) => {
                sharp(data).resize({
                    width: 80
                }).jpeg({
                    quality: 30
                }).toFile(path.resolve(__dirname,'./image_destination/copy-resize2suc.jpg'), (err, info) => {
                    if (err) {
                        res.json({
                            status: "copy file success & sharp error",
                            message: err
                        })
                    } else {
                        res.json({
                            status: "copy file & sharp success",
                            message: {}
                        })
                    } 
                })
            }
        )
    } catch (error) {
        res.json({
            status: "copy file error",
            message: error
        })
    }

});

// Start
server.listen(3000);
console.log('Open http://localhost:3000');