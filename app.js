const express=require('express');
const https=require('https');
const app=express();
app.set('view engine','ejs');
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send('hello world!');
})

app.get('/joke',(req,res)=>{
    let url='https://v2.jokeapi.dev/joke/Any'
    https.get(url,(responce)=>{
        let data=''
responce.on('data',(chunk)=>{
    data+=chunk;
})

responce.on('end',()=>{
    let jokeData=JSON.parse(data);
    let jokeType=jokeData.type;

if(jokeType=='single'){
    let joke=jokeData.joke;
    res.render('joke1',{joke:joke,type:jokeType})

}else{
    let setup=jokeData.setup;
    let delivery=jokeData.delivery
    res.render('joke2',{setup:setup,delivery:delivery,type:jokeType})
}  
})
    })
})
app.post('/joke',(req,res)=>{
    res.redirect('/joke');
})
app.listen(process.env.PORT|| 3000,(req,res)=>{
    console.log('app is running on port 3000');
})