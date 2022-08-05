const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3004
const host = '192.168.1.2'
let login = '*************'//login here
let password = '**********'// password here
let headers = {headers: {'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'}}
let sessionId = '51796579410%3AtLB7sTUEVs4ws7%3A14'
axios.post('http://localhost:8070/auth/login', `username=${login}&password=${password}&verification_code=&proxy=&locale=&timezone=`, headers).then(response => {
    console.log(response.data)
    sessionId = response.data
}).catch(e => {
    e.message
})
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.options('*', cors())
let pkcode

let corsOption = {
    origin: '*',
    crossOrigin: 'cross-origin'
}

app.get('/profile/:username', cors(corsOption), (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    res.set('Access-Control-Allow-Methods', 'GET, DELETE, HEAD, OPTIONS')
    let userName = req.params.username
    axios.post('http://localhost:8070/user/info_by_username', `sessionid=${sessionId}&username=${userName}&use_cache=false`, headers).then(response => {
        response.data.profile_pic_url_hd = corsDown(response.data.profile_pic_url_hd)
        pkcode = response.data.pk
        res.send(response.data)
    }).catch((error) => {
        res.send('error')
        console.log(error.message)
    })
})
app.get('/posts/:username', cors(corsOption), (req, res) => {
    let userName = req.params.username
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    res.set('Access-Control-Allow-Methods', 'GET, DELETE, HEAD, OPTIONS')
    axios.post('http://localhost:8070/user/id_from_username', `sessionid=${sessionId}&username=${userName}`, headers).then(response => {
        pkcode = response.data
        axios.post('http://localhost:8070/media/user_medias', `sessionid=${sessionId}&user_id=${pkcode}&amount=60`).then(response => {
            for (let item of response.data) {
                if (item.resources.length === 0) {
                    item.thumbnail_url = corsDown(item.thumbnail_url)
                } else {
                    for (let resource of item.resources) {
                        if (resource.video_url === null) {
                            resource.thumbnail_url = corsDown(resource.thumbnail_url)
                        }
                    }
                }
            }
            res.send(response.data)
        }).catch((error) => {
        })
    }).catch((error) => {
    })
})
app.get('/stories/:username', cors(corsOption), (req, res) => {
    let userName = req.params.username
    axios.post('http://localhost:8070/user/id_from_username', `sessionid=${sessionId}&username=${userName}`, headers).then(response => {
        pkcode = response.data
        axios.post('http://localhost:8070/story/user_stories', `sessionid=${sessionId}&user_id=${pkcode}&amount=20`, headers).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].video_url == null) {
                    response.data[i].thumbnail_url = corsDown(response.data[i].thumbnail_url)
                }
            }
            res.send(response.data)
        }).catch((error) => {
        })
    }).catch((error) => {
    })
})

function corsDown(target) {
    let p = target.split("/");
    let t = '';
    for (let i = 0; i < p.length; i++) {
        if (i === 2) {
            t += p[i].replaceAll('-', '--').replaceAll('.', '-') + atob('LnRyYW5zbGF0ZS5nb29n') + '/';
        } else {
            if (i !== p.length - 1) {
                t += p[i] + '/';
            } else {
                t += p[i];
            }
        }
    }
    target = encodeURI(t)
    return target;
}

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
