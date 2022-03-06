const express = require('express');
const ShortUrl = require('./models/ShortUrl');
const connecion = require('./connections/mongoose')
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

connecion.connect();

app.get('/', async (req, res)=>{
    let allUrls = await ShortUrl.find({});
    res.render('index',{urls:allUrls});
});

app.post('/short', async (req, res)=>{
    console.log(req.body)
    await ShortUrl.create({full:req.body.full});
    res.redirect('/');
});

app.get('/:shortid', async (req,res)=>{

    let url = await ShortUrl.findOne({short:req.params.shortid});

    console.log("url:::: ", url)
    if(url == null)
    {
        return res.sendStatus(400);
    }

    url.clickCount++;
    url.recentClick = Date.now();
    url.save();

    res.redirect(url.full);
});

app.post('/deleteUrl', async (req, res)=> {
    let id = Object.keys(req.body)[0];
    let result = await ShortUrl.findOneAndDelete({short:id});
    if (result == null) return res.sendStatus(500);
    res.redirect('/');
});

app.listen(PORT, (err,res)=>{
    if(err) throw err;
    console.log(`Server started at ${PORT}`)
})