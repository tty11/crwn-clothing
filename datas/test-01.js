const express = require("express");
const xssFilters = require("xss-filters");
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
  let test = 0;

  db.query("SELECT email FROM users WHERE id = " + req.query.id).then(
    (record) => {
      // logical flow
      res.send(record[0]);
    }
  );
  var preTax = eval(req.body.preTax);
  var afterTax = eval(req.body.afterTax);
  var roth = eval(req.body.roth);

  const uName = req.query.username;
  const uPass = req.query.userpassword;
  const sql =
    'SELECT * FROM Users WHERE Name = "' +
    uName +
    '" AND Pass = "' +
    uPass +
    '"';
  db.query(sql).then((record) => {
    // logical flow
    res.send(record[0]);
  });

  document.location = document.location.hash.slice(1);
});
