var React = require('react');
var ReactDOM = require('react-dom');
var MembersMainView = require('./views/MembersMainView');
var MemberCardView = require('./views/MemberCardView');
var MemberCreateView = require('./views/MemberCreateView');

ReactDOM.render(<MembersMainView />, document.getElementById('main-view'));
ReactDOM.render(<MemberCardView />, document.getElementById('view-member-modal'));
ReactDOM.render(<MemberCreateView />, document.getElementById('create-member-modal'));