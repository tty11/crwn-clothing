const express = require("express");
const xssFilters = require("xss-filters");
const cp = require('child_process');
const util = require("util");
const app = express();
app.get("/", (req, res) => {
  const unsafeFirstname = req.query.firstname;
  const safeFirstname = xssFilters.inHTMLData(unsafeFirstname);
  res.send(util.format("<h1>Tom%s</h1>", safeFirstname));
});

app.listen(3000);

const db = require("./db");

const router = express.Router();

router.get("/email", (req, res) => {
  const AdmZip = require("adm-zip");
  const fs = require("fs");

  const zip = new AdmZip("zip-slip.zip");
  const zipEntries = zip.getEntries();
  zipEntries.forEach(function (zipEntry) {
    fs.createWriteStream(zipEntry.entryName); // Noncompliant
  });

  const rootDiv = document.getElementById("root");
  const hash = decodeURIComponent(location.hash.substr(1));
  rootDiv.innerHTML = hash;

  let input = req.query.input;
  eval(input); // Noncompliant
  Function(input)(); // Noncompliant
  new Function(input)(); // Noncompliant

  const vm = require("vm");

  vm.runInThisContext(input); // Noncompliant
  const context = {};
  vm.createContext(context);
  vm.runInContext(input, context); // Noncompliant
  vm.runInNewContext(input, context); // Noncompliant
  vm.compileFunction(input)(); // Noncompliant
  new vm.Script(input).runInThisContext(); // Noncompliant

  var Module = require("module");

  let name = req.query.name;
  var mod = new Module(name, module.parent);
  mod._compile(input, name); // Noncompliant

  let username = req.query.username;
  query = { $where: `this.username == '${username}'` }; // Noncompliant
  User.find(query, function (err, users) {
    if (err) {
      // Handle errors
    } else {
      res.render("userlookup", { title: "User Lookup", users: users });
    }
  });

  let query = { user: req.query.user, city: req.query.city };

  db.collection("users")
    .find(query) // Noncompliant: http://website/?user=admin&city[%24ne]=
    .toArray((err, docs) => {});

  const url = req.query.url; // user-controlled input

  res.redirect(url); // Noncompliant

  res.location(url); // Noncompliant
  res.sendStatus(302);


  const tainted = req.query.name;

  res.send(tainted); // Noncompliant

  const libxmljs = require("libxmljs");

  var xml = fs.readFileSync('xxe.xml', 'utf8');

  var xmlDoc = libxmljs.parseXmlString(xml, { noblanks: true, noent: true, nocdata: true }); // Noncompliant: noent set to true

  const reqPath = __dirname + req.query.filename; // user-controlled path

  let data = fs.readFileSync(reqPath, { encoding: 'utf8', flag: 'r' }); // Noncompliant

  const cmd = 'ls '+req.query.arg;

  const out = cp.execSync(cmd); // Noncompliant: example of a command injection, req.query.arg = -la . ;cat /etc/passwd

  const jwt = require('jsonwebtoken');

  let token = jwt.sign({ foo: 'bar' }, key, { algorithm: 'none' }); // Noncompliant: 'none' cipher doesn't sign the JWT (no signature will be included)
  
  jwt.verify(token, key, { expiresIn: 360000 * 5, algorithms: ['RS256', 'none'] }, callbackcheck); // Noncompliant: 'none' cipher should not be used when verifying JWT signature
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    // Sensitive - no session.regenerate after login
    res.redirect('/');
  });
