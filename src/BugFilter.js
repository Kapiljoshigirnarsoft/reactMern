var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  render: function() {
    console.log("Rendering BugFilter");
    return (
      // <div>A way to filter the list of bugs would come here.</div>
      <button onClick={this.submit}>Test Filter</button>
    )
  },

  submit: function(e){
  	this.props.submitHandler({priority: "P1"});
  }
});

module.exports = BugFilter;