/** @jsx React.DOM */



var React = require('react');
var util = require('./flexTableUtils');

var Head = React.createClass({
    render:function() {
        var r = this.props.data.map(function(headItem,i){
            return (<Cell type="h" key={i} value={headItem}/>);
        });
        return <thead>{r}</thead>;
    }

});



var getMax = function(d){
    var curMax = 0;
   d.forEach(function(rowArr){
       rowArr.forEach(function(cellData){
           var comparer = typeof(cellData)==='object' ? cellData.value:cellData;
           if(util.isNumber(comparer)){
               comparer=comparer*1;
               if(comparer>curMax){
                   curMax = comparer;
               }
           }
       })
   });
    return curMax;
};
var Body = React.createClass({

    render: function(){
        var r = [];
        var Component = this;
        var d = Component.props.data;
        var max = getMax(d);
        d.forEach(function(rowItems,i){
           var items = rowItems.map(function(rowItem,i){
               return <Cell max={max} type="d" key={i} value={rowItem}/>;
           });
            r.push(<tr key={i}>{items}</tr>)
        });
        return <tbody>{r}</tbody>;
    }
});


var Cell = React.createClass({
    render: function(){
        var max = this.props.max;
        var val = this.props.value;
        var type = this.props.type || 'd';
        var result = null;
        var cName ='';

        if(util.isNumber(val)){
            result = util.numComma(val);
            cName = util.colorfullCell(val,max);
        }else{
            result = val;
        }

        if(type==='h'){
            return <th className={cName}>{result}</th>;
        }else{
            return <td className={cName}>{result}</td>;
        }

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