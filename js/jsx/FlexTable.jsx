/** @jsx React.DOM */



var React = require('react');

var Head = React.createClass({
    render:function() {
        var r = this.props.data.map(function(headItem,i){
            return (<th key={i}>{headItem}</th>);
        });
        return <thead>{r}</thead>;
    }

});

var Body = React.createClass({

    render: function(){
        var r = [];
        this.props.data.forEach(function(rowItems,i){
           var items = rowItems.map(function(rowItem,i){
               return <td key={i}>{rowItem}</td>;
           });
            r.push(<tr key={i}>{items}</tr>)
        });
        return <tbody>{r}</tbody>;
    }
});


var FlexTable = React.createClass({
    render:function(){
        return (<table>
            <Head data={this.props.tableData.thead}/>
            <Body data={this.props.tableData.tbody}/>
        </table>);
    }
});




/*Do not direct assign to module.export*/
module.exports = FlexTable;