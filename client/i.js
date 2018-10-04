const express = require('express');
const cors = require('cors')
const path = require('path')

const app = express();


app.use(express.static(__dirname))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.listen(5000); // listens on port 3000 -> http://localhost:3000/