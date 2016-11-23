var Datastore = require('@google-cloud/datastore');
var config = require('./config');
var Q = require('q');
var datastore = Datastore({
    projectId: config.projectId
});

/**
 * This module handles all of the CRUD for a Member Entity in Cloud Datastore
 * The functions use Q to return a promise since the API calls are asynchronous
 */
module.exports = {

    fetchMemberById: function(id) {
        var self = this;
        var deferred = Q.defer();
        var query = datastore.createQuery("members");
        var key = datastore.key(['members', id]);
        query.filter('__key__', key);
        datastore.runQuery(query, function(err, entities) {
            if (!err && entities && entities.length > 0) {
                self.addMetadata(entities[0]);
                deferred.resolve(entities[0].data);
            } else {
                deferred.reject(new Error("Error fetching member."));
            }
        });
        return deferred.promise;
    },

    fetchMembers: function() {
        var self = this;
        var deferred = Q.defer();
        var query = datastore.createQuery("members");
        query.order("name");

        datastore.runQuery(query, function(err, entities) {
            if (!err && entities) {
                var members = {};
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    self.addMetadata(entity);
                    members[entity.key.id] = entity.data;
                }
                deferred.resolve(members);
            } else {
                deferred.reject(new Error("Error fetching members."));
            }
        });
        return deferred.promise;
    },

    saveMember: function(id, memberData) {
        var deferred = Q.defer();
        var key = (id) ? datastore.key(['members', parseInt(id)]) : datastore.key(['members']);
        var entity = {
            key: key,
            data: memberData
        };

        if (id) {
            // update
            datastore.update(entity, function (err) {
                if (err) {
                    deferred.reject(new Error("Error updating member."));
                } else {
                    deferred.resolve();
                }
            });
        } else {
            // save
            datastore.save(entity, function (err) {
                if (err) {
                    deferred.reject(new Error("Error saving member."));
                } else {
                    deferred.resolve();
                }
            });
        }
        return deferred.promise;
    },

    deleteMember: function(id) {
        var deferred = Q.defer();
        var key = datastore.key(['members', parseInt(id)]);
        datastore.delete(key, function (err) {
            if (err) {
                deferred.reject("Error deleting member.");
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    },

    addMetadata: function(entity) {
        entity.data.id = entity.key.id;
    }


};
