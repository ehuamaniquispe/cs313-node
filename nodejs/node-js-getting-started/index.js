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



app.listen(PORT, function(){//chnage made aja
  console.log('Listening at port 5000')
});