var React = require('react');
var MemberActions = require('../actions/MemberActions');

function Header(props) {
    return (
        <h1 className="ui header">{props.headerText}</h1>
    )
}
var NavigationBar = React.createClass({

    handleAddMember: function() {
        MemberActions.addMember();
    },

    render: function() {

        return (
            <div>
                <Header headerText={this.props.headerText} />

                <button className="ui right floated labeled positive icon button" onClick={this.handleAddMember}>
                    <i className="right plus icon"></i>
                    Add Member
                </button>

                <div className="ui secondary  menu">
                    <a href="/" className="item">Home</a>
                    <a href="/members" className="item active">Members</a>
                </div>

            </div>
        )
    }
});
module.exports = NavigationBar;
