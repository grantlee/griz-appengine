var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = "change";

var AppStore = assign({}, EventEmitter.prototype, {

    _members: {},
    _selectedMember: null,
    _memberToAdd: null,

    setMembers: function(members) {
        this._members = members;
        this._selectedMember = null;
        this._memberToAdd = null;
        this.emitChange();
    },
    getAllMembers: function() {
        return this._members;
    },

    getSelectedMember: function() {
        return this._selectedMember;
    },

    setSelectedMember: function(member) {
        this._selectedMember = member;
        this.emitChange();
    },

    getMemberToAdd: function() {
        return this._memberToAdd;
    },

    setMemberToAdd: function(member) {
        this._memberToAdd = member;
        this.emitChange();
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {

    switch (action.actionType) {

        case AppConstants.MEMBERS_LOADED:
            var members = action.members;
            AppStore.setMembers(members);
            break;

        case AppConstants.MEMBER_SELECT:
            var member = action.member;
            AppStore.setSelectedMember(member);
            break;

        case AppConstants.MEMBER_CANCEL_SELECT:
            AppStore.setSelectedMember(null);
            break;

        case AppConstants.MEMBER_ADD:
            var member = action.member;
            AppStore.setMemberToAdd(member);
            break;
        case AppConstants.MEMBER_CANCEL_ADD:
            AppStore.setMemberToAdd(null);
            break;
    }
});
module.exports = AppStore;
