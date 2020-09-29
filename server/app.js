const express     = require('express');
const expressWs   = require('express-ws')
const bodyParser  = require('body-parser');
const http        = require('http');
const ejs         = require('ejs').renderFile;
const cmd         = require('./cmd.js');
var config        = require('./config.json');


const webhook_slack = config.webhook_slack;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + config.clientPath));
app.engine('html', ejs);
app.set('view engine', 'html');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

expressWs(app, server)

function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

app.get('/slack/:content', function(req, res) {
  cmd.message('curl -X POST -H \'Content-type: application/json\' --data \'{"text":"'+req.params.content+'"}\' ' + webhook_slack, function(resp){
    res.send('{ "slack": "'+resp+'" }');
  });
});

app.get('/zabbix/:var0/:var1/:var2', function(req, res) {
  cmd.message('zabbix_sender -z zbx-srv.bizsys.com.br -s "'+req.params.var0+'" -k '+req.params.var1+' -o '+req.params.var2, function(resp){
    res.send('{ "zabbix_sender": "'+resp+'" }');
  });
});

app.ws('/echo', (ws, req) => {
    ws.on('message', msg => {
      if(msg!="Conectado") {
      } else {
        ws.send(msg)
      }
      console.log('Socket:',msg)
    })
    ws.on('close', () => {
      console.log('WebSocket was closed')
    })
})

server.listen(8081, function () {
  console.log('Socket at 8081!');
});

app.listen(8080, "0.0.0.0", function () {
  console.log('Server at 8080!');
});
