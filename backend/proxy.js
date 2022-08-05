'use strict'
const port = 3003
const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const cors = require("cors");
const host = '192.168.1.2'
app.use('/static', express.static(path.join(__dirname, './static')))
app.use(cors())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'))
})
app.options('*', cors())
app.get('/video/:url',cors(),(req, res) => {
    const url = req.params.url
    res.set('Access-Control-Allow-Origin','*')
    res.set('Cross-Origin-Resource-Policy','cross-origin')
    res.set(`Content-Disposition`,`attachment; filename=${url}.${mediaType(url)}`)
    axios.get(url, {
        responseType: 'stream',
  })
        .then((stream) => {
            res.writeHead(stream.status, stream.headers)
            stream.data.pipe(res)
        })
        .catch(err => console.error(err.message))
})
function mediaType(url) {
if (/.mp4/.test(url)){
    return 'mp4'
}else if (/.jpg/.test(url)){
    return 'jpg'
}
}
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
