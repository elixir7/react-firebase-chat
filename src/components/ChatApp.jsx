var React = require('react');
var ChatMessage = require('./ChatMessage.jsx');

var ChatApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      text: ''
    };
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase('https://react-firebase-chat.firebaseio.com/messages');
    this.bindAsArray(firebaseRef.limitToLast(15), 'items');
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  removeItem: function(key) {
    var firebaseRef = new Firebase('https://react-firebase-chat.firebaseio.com/messages');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      this.firebaseRefs['items'].push({
        text: this.state.text
      });
      this.setState({
        text: ''
      });
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1>React + Firebase Chat App</h1>
              </div>
              <div className="panel-body">
                <h3>Messages: {this.state.items.length}</h3>
                <div className="chat-messages">
                  <ChatMessage items={ this.state.items } removeItem={ this.removeItem } />
                </div>
                <form className="form-group" onSubmit={ this.handleSubmit }>
                  <div className="input-group">
                    <input type="text" placeholder="Write your message here..." className="form-control" onChange={ this.onChange } value={ this.state.text } />
                    <span className="input-group-btn">
                      <button type="btn" className="btn btn-primary">
                        <i className="fa fa-comment"></i>
                        </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChatApp;
