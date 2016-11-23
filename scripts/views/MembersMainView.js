var React = require('react');
var MembersGridView = require('./MembersGridView');
var NavigationBar = require('./NavigationBar');
var MemberActions = require('../actions/MemberActions');

var MembersMainView = React.createClass({
    componentDidMount: function() {
        MemberActions.loadMembers();
    },
    render: function () {
        return (
            <div>
                <NavigationBar headerText="Members Page" />
                <MembersGridView />
            </div>
        )
    }
});
module.exports = MembersMainView;