const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;

//declaring a connection to db
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

var app = express();
app.set('view engine', 'ejs');



    
// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//app.set('json spaces', 40);// stretch  challenge

// app.use('/form', express.static(__dirname +'/public/form.html'));
app.get('/',function(req,res){
  res.sendFile(__dirname +'/public/form.html');
})

app.get('/math', function(req,res){
  let operation = req.query.operation;
  let operand1 = req.query.operand1;
  let operand2 = req.query.operand2;
  let result;
  if(operation == "+"){
    result = operand1*10/10 + operand2*10/10;
  }
  if(operation == "-"){
    result = operand1 - operand2*10/10;
  }
  if(operation == "*"){
    result = operand1 * operand2*10/10;
  }
  console.log(operand1+operation+operand2+'='+result);
  
  res.render('result',{operand1:operand1,operation:operation,operand2:operand2,result:result});

});

//stretch challenges
app.get('/math_service', function(req,res){
  let operation = req.query.operation;
  let operand1 = req.query.operand1;
  let operand2 = req.query.operand2;
  let result;
  if(operation == "+"){
    result = operand1*10/10 + operand2*10/10;
  }
  if(operation == "-"){
    result = operand1 - operand2*10/10;
  }
  if(operation == "*"){
    result = operand1 * operand2*10/10;
  }
  console.log(operand1+operation+operand2+'='+result);
  
  res.json({"result":result});

});



/***************************************
 * week9: postage
 ***************************************/

 app.get('/postage',(req,res)=>{
   res.sendFile(__dirname + '/public/postageform.html');
 })

 app.get('/calculate',(req,res)=>{

  let weight = req.query.weight;
  let mail = req.query.mail;

  console.log(weight);
  console.log(mail);

  var mailArray = [
    "lettersStamped",
    "lettersMetered",
    "largeEnvelope",
    "firstClass"
  ]
  
  var postage = [
  {n:"lettersStamped",w:"1"  ,p:0.55},
  {n:"lettersStamped",w:"2"  ,p:0.70},
  {n:"lettersStamped",w:"3"  ,p:0.85},
  {n:"lettersStamped",w:"3.5",p:1},
    {n:"lettersMetered",w:"1",p:0.50},
    {n:"lettersMetered",w:"2",p:0.65},
    {n:"lettersMetered",w:"3",p:0.80},
    {n:"lettersMetered",w:"3.5",p:0.95},
    {n:"largeEnvelope",w:"1",p:1},
    {n:"largeEnvelope",w:"2",p:1.2},
    {n:"largeEnvelope",w:"3",p:1.4},
    {n:"largeEnvelope",w:"4",p:1.6},
    {n:"largeEnvelope",w:"5",p:1.8},
    {n:"largeEnvelope",w:"6",p:2},
    {n:"largeEnvelope",w:"7",p:2.2},
    {n:"largeEnvelope",w:"8",p:2.4},
    {n:"largeEnvelope",w:"9",p:2.6},
    {n:"largeEnvelope",w:"10",p:2.8},
    {n:"largeEnvelope",w:"11",p:3},
    {n:"largeEnvelope",w:"12",p:3.2},
    {n:"largeEnvelope",w:"13",p:3.4},
    {n:"firstClass",w:"1",p:3.8},
    {n:"firstClass",w:"2",p:3.8},
    {n:"firstClass",w:"3",p:3.8},
    {n:"firstClass",w:"4",p:3.8},
    {n:"firstClass",w:"5",p:4.6},
    {n:"firstClass",w:"6",p:4.6},
    {n:"firstClass",w:"7",p:4.6},
    {n:"firstClass",w:"8",p:4.6},
    {n:"firstClass",w:"9",p:5.3},
    {n:"firstClass",w:"10",p:5.3},
    {n:"firstClass",w:"11",p:5.3},
    {n:"firstClass",w:"12",p:5.3},
    {n:"firstClass",w:"13",p:5.9} 
  ];
 

  var mailChosen = mailArray.find(x=>x==mail);
 
  var price = postage.find(x=>x.n==mailChosen&x.w==weight);

  if(price == undefined){

    let message = "weight not found, try with another weight"
    res.render('postageCalculator1',{message:message});
  }else{
    console.log(price.p);
    res.render('postageCalculator',{weight:price.w,mail:price.n,price:price.p});
  }


 })




app.listen(PORT, function(){//chnage made aja
  console.log('Listening at port 5000')
});

/*******************************************************
 * project 
 ******************************************************/

//showing the login page
  app.get('/project', (req,res)=>{
    res.sendFile(__dirname + '/public/login_project.html');
  });

  //verifying username and pass
  app.get('/verify_login',async (req,res)=>{

    let userName = req.query.userName;
    let password = req.query.password;

    try{
      
      const q = "SELECT familymember_username FROM familymember WHERE familymember_username = $1 and familymember_pass = $2";
      const values = [userName,password];
      const result = await pool.query(q,values);
      //res.send(JSON.stringify(result.rows));

      if(result.rows.length == 0){
        res.send("User name or password not found");
      }
      else {
        // res.send("Welcome"+ JSON.stringify(result.rows.familymember_name));
        res.send("Welcome!");
      }


      //res.render('main-project',{results:JSON.stringify(result), userName:userName, password:password});
    }
    catch(err){
      console.error(err);
      res.send("Error " + err);
    }



    console.log(userName);
    console.log(password);


    
    
  });