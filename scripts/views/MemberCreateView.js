var React = require('react');
var MemberActions = require('../actions/MemberActions');
var AppStore = require('../stores/AppStore');

var MemberCreateView = React.createClass({

    componentDidMount: function() {
        AppStore.addChangeListener(this.handleChange);
    },
    handleChange: function() {
        var member = AppStore.getMemberToAdd();
        if (member != null) {
            this.resetState();
            $(".ui.modal.member-add-view").modal("show");
        } else {
            $(".ui.modal.member-add-view").modal("hide");
        }
    },
    resetState: function() {
        this.setState({
            name: "",
            title: "",
            email: "",
            gender: ""
        });
    },
    getInitialState: function() {
        return {
            name: "",
            title: "",
            email: "",
            gender: ""
        }
    },

    handleFieldChange: function(val) {
        this.setState(val);
    },
    handleCancel: function() {
        MemberActions.cancelAddMember();
    },

    handleAdd: function() {
        MemberActions.saveMember({
            name: this.state.name,
            title: this.state.title,
            email: this.state.email,
            gender: this.state.gender
        });
    },

    render: function() {
        var imageSrc =  "/images/image.png";
        if (this.state.gender == 'male') {
            imageSrc ="/images/matthew.png"
        } else if (this.state.gender == 'female') {
            imageSrc ="/images/kristy.png";
        }

        return (<div className="ui modal member-add-view">
            <div className="header">New Member</div>
            <div className="image content">
                <div className="ui medium image">
                    <img src={imageSrc} />
                </div>
                <div className="description">
                    <table className="ui celled table members-grid">
                        <tbody>
                        <tr>
                            <td>
                                <div className="ui labeled input">
                                    <a className="ui label">Name</a>
                                    <input type="text" value={this.state.name} onChange={(e) => this.handleFieldChange({'name': e.target.value})} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="ui labeled input">
                                    <a className="ui label">Title</a>
                                    <input type="text" value={this.state.title} onChange={(e) => this.handleFieldChange({'title': e.target.value})} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="ui labeled input">
                                    <a className="ui label">Email</a>
                                    <input type="text" value={this.state.email} onChange={(e) => this.handleFieldChange({'email': e.target.value})} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="ui labeled input">
                                    <a className="ui label">Gender</a>
                                    <select className="dropdown" value={this.state.gender}  size="1" onChange={(e) => this.handleFieldChange({'gender': e.target.value})}>
                                        <option value="">Not specified</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="actions">
                <div className="ui button" onClick={this.handleCancel}>Cancel</div>
                <div className="ui button positive" onClick={this.handleAdd}>Add</div>
            </div>
        </div>)
    }
});

module.exports = MemberCreateView;