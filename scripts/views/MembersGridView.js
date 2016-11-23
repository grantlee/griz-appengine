var React = require('react');
var AppStore = require('../stores/AppStore');
var MemberRow = require('./MemberRowView');

var MembersGridView = React.createClass({
    componentDidMount: function() {
        AppStore.addChangeListener(this.handleChange);
        $('select.dropdown').dropdown();
    },
    handleChange: function() {
        this.setState({
            members: AppStore.getAllMembers()
        });
    },
    componentDidUpdate(prevProps, prevState) {
        $('select.dropdown').dropdown();
    },

    render: function() {
        var members = [];
        if (this.state && this.state.members) {
            for (var key in this.state.members) {
                var member = this.state.members[key];
                members.push(<MemberRow key={member.id} member={member} />);
            }
        }
        return (
            <table className="ui celled table members-grid">
            <thead>
                <tr>
                    <th>Members</th>
                    <th colSpan="5"></th>
                </tr>
            </thead>
            <tbody>{members}</tbody>
            </table>
        )
    }
});
module.exports = MembersGridView;
