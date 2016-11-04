// Copyright 2015-2016, Grant Lee
// Based on the "Simple Hello World Node.js sample for Google App Engine"
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';

var express = require('express');
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var app = express();

// to serve static files
app.use(express.static('public'));

// setup for mustache views
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// setup for express form post body parsing
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get('/', function (req, res) {
    var welcomeMsgs = ["Welcome!", "歡迎!", "Willkommen!", "Bienvenido!", "ようこそ!"];
    var welcome = welcomeMsgs[Math.floor(Math.random() * welcomeMsgs.length)];
    res.status(200).render("home.mustache", {msg: welcome});
});

var members = require('./Members');
var LOG = require('./Logger');

app.post('/members', function (req, res) {
    if (req.body.delete) {
        // handle deletion
        members.deleteMember(parseInt(req.body.id)).then(function() {
            res.status(302).redirect("/members");
        }).fail(function(err) {
            LOG.error(err.message);
            res.status(500).send(err.message);
        });

    } else {
        // handle update or insert
        var id = req.body.id;
        var memberData = {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            gender: req.body.gender
        };
        members.saveMember(id, memberData).then(function() {
            res.status(302).redirect("/members");
        }).fail(function(err) {
            LOG.error(err.message);
            res.status(500).send(err.message);
        });
    }
});

app.get('/members', function (req, res) {
    members.fetchMembers(parseInt(req.params.id)).then(function (entities) {
        res.status(200).render("members.mustache", { entities: entities });
    }).fail(function (err) {
        LOG.error(err.message);
        res.status(500).send(err.message);
    });
});
app.get('/members/:id', function (req, res) {
    members.fetchMemberById(parseInt(req.params.id)).then(function (entity) {
        if (entity) {
            res.status(200).render("member.mustache", { entity: entity });
        } else {
            LOG.info("Member not found.");
            res.status(404).send("Member not found.");
        }
    }).fail(function (err) {
        LOG.error(err.message);
        res.status(500).send("Error fetching member.");
    });
});

// Start the server
var server = app.listen(process.env.PORT || '3131', function () {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
    LOG.info('App listening on port ' + server.address().port);
});
// [END app]
