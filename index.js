const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
var app = express();

app.set('view engine', 'ejs');

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

  var lettersStamped = [
  {w:"1"  ,p:0.55},
  {w:"2"  ,p:0.70},
  {w:"3"  ,p:0.85},
  {w:"3.5",p:1}
  ];
  var lettersMetered = {1:0.50,2:0.65,3:0.80,3.5:0.95};
  var largeEnvelopesFlats = {1:1,2:1.2,3:1.4,4:1.6,5:1.8,6:2,7:2.2,8:2.4,9:2.6,10:2.8,11:3,12:3.2,13:3.4};
  var firstClassPackageServiceRetail = {1:3.8,2:3.8,3:3.8,4:3.8,5:4.6,6:4.6,7:4.6,8:4.6,9:5.3,10:5.3,11:5.3,12:5.3,13:5.9 };

  var price = lettersStamped.find(x=>x.w==weight).p;
  console.log(prince);

 })


app.listen(PORT, function(){//chnage made aja
  console.log('Listening at port 5000')
});