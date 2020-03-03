import express from 'express';

const app = express();
const port  = process.env.PORT || 3001;
app.use('/', express.static('client'));
app.post('/upload', (req, res) => {
    let data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        console.log(data);
    });
    res.end('done');
});
app.listen(port, () => {
    console.log(`Listening on ${port}, press ^c to stop`)
})
