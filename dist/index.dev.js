"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie');

var bcrypt = require('bcrypt');

var _require = require('express'),
    json = _require.json;

var db = require('./database.js');

var users = db.users;
var students = {
  list: [{
    id: 1,
    fname: "Patomporn",
    surname: "Kaenchan",
    major: "CoE",
    gpa: 3.0
  }]
};

require('./passport.js');

var router = require('express').Router(),
    jwt = require('jsonwebtoken');

app.use('/api', router);
router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
})); // router.use(cors())

router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    session: false
  }, function (err, user, info) {
    console.log('Login: ', req.body, user, err, info);
    if (err) return next(err);

    if (user) {
      var token = jwt.sign(user, db.SECRET, {
        expiresIn: '1d'
      }); // req.cookie.token = token

      res.setHeader("Set-Cookie", cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/"
      }));
      res.statusCode = 200;
      return res.json({
        user: user,
        token: token
      });
    } else return res.status(422).json(info);
  })(req, res, next);
});
router.get('/logout', function (req, res) {
  res.setHeader("Set-Cookie", cookie.serialize("token", '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: -1,
    sameSite: "strict",
    path: "/"
  }));
  res.statusCode = 200;
  return res.json({
    message: 'Logout successful'
  });
});
/* GET user profile. */

router.get('/profile', passport.authenticate('jwt', {
  session: false
}), function (req, res, next) {
  res.send(req.user);
});
/* GET user foo. */

router.get('/foo', passport.authenticate('jwt', {
  session: false
}), function (req, res, next) {
  return res.json({
    message: 'foo'
  });
});
router.route('/students').get(function (req, res) {
  return res.json(students);
});
router.post('/students', // passport.authenticate('jwt', { session: false }),
function (req, res) {
  try {
    var newStudent = {};
    newStudent.id = students.list.length ? students.list[students.list.length - 1].id + 1 : 1;
    newStudent.fname = req.body.fname;
    newStudent.surname = req.body.surname;
    newStudent.major = req.body.major;
    newStudent.gpa = req.body.gpa;
    students = {
      "list": [].concat(_toConsumableArray(students.list), [newStudent])
    };
    res.json(students);
  } catch (_unused) {
    res.json({
      status: "Add Fail"
    });
  }
});
router.route('/students/:std_id').get(function (req, res) {
  var ID = students.list.findIndex(function (item) {
    return item.id === +req.params.std_id;
  });

  if (ID >= 0) {
    res.json(students.list[ID]);
  } else {
    res.json({
      status: "Student Error can't find!"
    });
  }
}).put(function (req, res) {
  var ID = students.list.findIndex(function (item) {
    return item.id === +req.params.std_id;
  });

  if (ID >= 0) {
    students.list[ID].fname = req.body.fname;
    students.list[ID].surname = req.body.surname;
    students.list[ID].major = req.body.major;
    students.list[ID].gpa = req.body.gpa;
    res.json(students);
  } else {
    res.json({
      status: "Student Error can't find!"
    });
  }
})["delete"](function (req, res) {
  var ID = students.list.findIndex(function (item) {
    return item.id === +req.params.std_id;
  });

  if (ID >= 0) {
    students.list = students.list.filter(function (item) {
      return item.id !== +req.params.std_id;
    });
    res.json(students);
  } else {
    res.json({
      status: "Student Error can't find!"
    });
  }
});
router.post('/register', function _callee(req, res) {
  var SALT_ROUND, _req$body, username, email, password, id;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          SALT_ROUND = 10;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;

          if (!(!username || !email || !password)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.json({
            message: "Cannot register with empty string"
          }));

        case 5:
          if (!(db.checkExistingUser(username) !== db.NOT_FOUND)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.json({
            message: "Duplicated user"
          }));

        case 7:
          id = users.users.length ? users.users[users.users.length - 1].id + 1 : 1;
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, SALT_ROUND));

        case 10:
          hash = _context.sent;
          users.users.push({
            id: id,
            username: username,
            password: hash,
            email: email
          });
          res.status(200).json({
            message: "Register success"
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(422).json({
            message: "Cannot register"
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get('/alluser', function (req, res) {
  return res.json(db.users.users);
});
router.get('/', function (req, res, next) {
  res.send('Respond without authentication');
}); // Error Handler

app.use(function (err, req, res, next) {
  var statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message
    }
  });
}); // Start Server

app.listen(port, function () {
  return console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=index.dev.js.map
