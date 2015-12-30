var React = require('react');

var ChatMessage = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <div key={ index }>
          <p>
            <em>Anonym: </em>
            { item.text }
            <i className="fa fa-minus-circle pull-right" onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: '#DC4E41', marginLeft: '10px', cursor: 'pointer' }}></i>
          </p>
        </div>
      );
    };
    return (
      <div>
        { this.props.items.map(createItem) }
      </div>
    );
  }
});

module.exports = ChatMessage;
