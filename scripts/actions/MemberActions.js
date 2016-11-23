import 'whatwg-fetch'
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var MemberActions = {

    checkStatus: function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    },
    parseJSON: function(response) {
        return response.json();
    },

    loadMembers: function() {
        console.log("loading members...");
        fetch('/members')
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(function(data) {
            console.log("loading members data: " + data);
            AppDispatcher.dispatch({
                actionType: AppConstants.MEMBERS_LOADED,
                members: data
            });
        })
        .catch(function(error) {
            console.log('request failed', error)
        });
    },

    saveMember: function(member) {
        console.log("save member: " + JSON.stringify(member));
        var data = {
            member: member
        };
        fetch('/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstants.MEMBERS_LOADED,
                members: data
            });
        })
        .catch(function(error) {
            console.log('request failed', error)
        });
    },

    deleteMember: function(memberId) {
        console.log("delete member: " + memberId);
        var data = {
            id: memberId,
            delete: true
        };
        fetch('/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then(function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstants.MEMBERS_LOADED,
                members: data
            });
        })
        .catch(function(error) {
            console.log('request failed', error)
        });
    },
    selectMember: function(member) {
        console.log("view member: " + (member ? JSON.stringify(member.id) : ""));
        AppDispatcher.dispatch({
            actionType: AppConstants.MEMBER_SELECT,
            member: member
        });
    },
    cancelSelectMember: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.MEMBER_CANCEL_SELECT
        });
    },
    addMember: function() {
        console.log("add member...");
        AppDispatcher.dispatch({
            actionType: AppConstants.MEMBER_ADD,
            member: {}
        });
    },
    cancelAddMember: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.MEMBER_CANCEL_ADD
        });
    }

};

module.exports = MemberActions;