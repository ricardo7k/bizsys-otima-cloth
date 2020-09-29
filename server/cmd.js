var exec = require('child_process').exec;
function action(cmd, callback) {
  console.info("Comando: ", cmd);
  var child = exec(cmd);
  var oresult = "";
  var errored = false;
  child.stdout.on('data', function(data) {
    console.log(`[exec] data: ${data}`);
    oresult += data;
  });
  child.stderr.on('error', function(error) {
    errored = true;
    console.log(`[exec] error: ${error}`);
    // callback(`[exec] error: ${error}`);
  });
  child.on('close', function() {
    if(!errored) {
      console.log(`[exec] result: ${oresult}`);
      callback(`[exec] result: ${oresult}`);
    }
    errored = false;
  });
}
function message(txt, callback) {
  action(txt, callback);
}
module.exports.message = message;
