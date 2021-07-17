const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
https: app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.post('/test', (req, res) => {
    var source = req.body.code.split(/\r\n|\r\n/).join('\n');
    var file = 'test.js';

    fs.writeFile(file, source, 'utf8', function (error) {
        console.log('write end');
    });
    var fail = [];
    var success = '';
    var compile = spawn('node', [file]);
    compile.stdout.on('data', function (data) {
        var str = data.toString().split('\r');
        var good = '';
        str.map(function (e, i) {
            good += e;
        });
        success += good;
    });
    compile.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        var str = data.toString().split('\r\n');
        var err = [];
        str.map(function (e, i) {
            if (i > 3) err.push(e);
        });
        console.log(err);

        fail = fail.concat(err);
    });
    compile.on('exit', code => {
        console.log(`process has finished and exited with code: ${code}`);
        console.log(success);
        res.json({
            success: success.toString('utf8'),
            fail: fail.toString('utf8'),
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
