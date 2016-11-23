var React = require('react');
var ReactDOM = require('react-dom');
var MemberActions = require('../actions/MemberActions');
var AppStore = require('../stores/AppStore');

var MemberCardView = React.createClass({

    componentDidMount: function() {
        AppStore.addChangeListener(this.handleChange);
        $(".ui.modal.member-view").modal({
            onHidden: function() {
                MemberActions.selectMember(null);
            }
        });

    },

    handleChange: function() {
        var member = AppStore.getSelectedMember();
        this.setState({
            member: member
        });
        if (member == null) {
            $(".ui.modal.member-view").modal("hide");
        } else {
            $(".ui.modal.member-view").modal("show");
        }
    },

    handleCancel: function() {
        MemberActions.cancelSelectMember();
    },

    handleDelete: function() {
        MemberActions.deleteMember(this.state.member.id);
    },

    render: function() {
        var member = this.state && this.state.member ? this.state.member : {};
        var imageSrc =  "/images/image.png";
        if (member.gender == 'male') {
            imageSrc ="/images/matthew.png"
        } else if (member.gender == 'female') {
            imageSrc ="/images/kristy.png";
        }
        return (
            <div className="ui modal member-view">
                <div className="header">View Member</div>
                <div className="image content">
                    <div className="ui medium image">
                        <img src={imageSrc} />
                    </div>
                    <div className="description">
                        <div className="ui header">{member.name}</div>
                        <div className="meta">
                            <span className="date">{member.title}</span>
                        </div>
                        <div className="meta">
                            Please email me at:&nbsp;<a href="mailto:{member.email}">{member.email}</a>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui button" onClick={this.handleCancel}>Cancel</div>
                    <div className="ui button negative" onClick={this.handleDelete}>Delete</div>
                </div>
            </div>
        )

    }
});

module.exports = MemberCardView;