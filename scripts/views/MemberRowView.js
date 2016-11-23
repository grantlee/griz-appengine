var React = require('react');
var MemberActions = require('../actions/MemberActions');

var MemberRowView = React.createClass({
    handleChange: function(val) {
        this.setState(val);
    },
    handleSave: function() {
        var member = this.getMemberData();
        MemberActions.saveMember(member);
    },
    handleView: function() {
        var member = this.getMemberData();
        MemberActions.selectMember(member);
    },
    getInitialState: function() {
        return {}
    },
    getMemberData: function() {
        var member = {
            name: (this.state && this.state.name) ? this.state.name : this.props.member.name,
            title: (this.state && this.state.title) ? this.state.title : this.props.member.title,
            email: (this.state && this.state.email) ? this.state.email : this.props.member.email,
            gender: (this.state && this.state.gender) ? this.state.gender : this.props.member.gender
        };
        if (this.props.member.id) {
            member.id = this.props.member.id;
        }
        return member;
    },
    render: function() {
        var member = this.getMemberData();

        return (
            <tr className="member-entity">
                <td>
                    <div className="ui labeled input">
                        <a className="ui label">Name</a>
                        <input type="text" value={member.name} onChange={(e) => this.handleChange({'name': e.target.value})} />
                    </div>
                </td>
                <td>
                    <div className="ui labeled input">
                        <a className="ui label">Title</a>
                        <input type="title" value={member.title} onChange={(e) => this.handleChange({'title': e.target.value})} />
                    </div>
                </td>
                <td>
                    <div className="ui labeled input">
                        <a className="ui label">Email</a>
                        <input type="text" value={member.email} onChange={(e) => this.handleChange({'email': e.target.value})} />
                    </div>
                </td>
                <td>
                    <div className="ui labeled input">
                        <a className="ui label">Gender</a>
                        <select className="dropdown" value={member.gender}  size="1" onChange={(e) => this.handleChange({'gender': e.target.value})}>
                            <option value="">Not specified</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </td>
                <td width="100%">
                    <button className="green ui button save-member-btn" onClick={this.handleSave}> Save </button>
                    <button className="blue ui button view-member-btn" onClick={this.handleView}> View </button>
                </td>
            </tr>
        );
    }
});
module.exports = MemberRowView;