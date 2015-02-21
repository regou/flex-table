/** @jsx React.DOM */



var React = require('react');
var util = require('./flexTableUtils');
var _ = require('lodash');


var Cell = require('./Cell.jsx');

var Head = React.createClass({
    getDefaultProps:function(){
        return {
            updateSort:function(){}
        }
    },
    render:function() {
        var Component = this;
        var sortIndex = Component.props.sortByColIndex;
        var isReverse = Component.props.isReverse;
        var r = this.props.data.map(function(headItem,i){
            var additionProps = {};
            if(i==sortIndex){
                additionProps.isReverse = isReverse;
            }
            return (<Cell {...additionProps} onClick={Component.props.updateSort.bind(null,i)} type="h" key={i} value={headItem}/>);
        });
        return <thead>{r}</thead>;
    }

});


function getVal(cellData){
    return typeof(cellData)==='object' ? cellData.value:cellData;
}

var getMax = function(d){
    var curMax = 0;
    d.forEach(function(rowArr){
        rowArr.forEach(function(cellData){
            var comparer = getVal(cellData);
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
var sortRow = function(d,index){
    return _.sortBy(d, function(rowArr) {
        return getVal(rowArr[index]);
    });
};


var Body = React.createClass({
        getDefaultProps:getDefSortData,
        render: function(){
            var r = [];
            var Component = this;
            var d = Component.props.data;
            var max = getMax(d);

            var sortIndex = Component.props.sortByColIndex;
            var isReverse = Component.props.isReverse;
            if(sortIndex>=0){
                d = sortRow(d,sortIndex);
                if(isReverse){
                    d.reverse();
                }
            }

            d.forEach(function(rowItems,i){
                var items = rowItems.map(function(rowItem,i){
                    var additionProps = {
                        colIndex:i,
                        postProcess:Component.props.postProcess,
                        preProcess:Component.props.preProcess
                    };
                    if(i==sortIndex){
                        additionProps.isReverse=isReverse;
                    }
                    return <Cell {...additionProps} max={max} type="d" key={i} value={rowItem}/>;
                });
                r.push(<tr key={i}>{items}</tr>)
            });
            return <tbody>{r}</tbody>;
        }
    });




function getDefSortData(){
    return {
        sortByColIndex:-1,
        isReverse:false
    }
}
var FlexTable = React.createClass({
    getInitialState:getDefSortData,
    _updateSortBy:function(index){
        this.setState({
            sortByColIndex:index,
            isReverse:!this.state.isReverse
        });
    },
    getDefaultProps:function(){
        return {
            className: "",
            tableData: {},
            preProcess: null,
            postProcess: null
        }
    },
    render:function(){
        return (<table className={'ps-flex-table '+this.props.className}>
            <Head {...this.state} updateSort={this._updateSortBy} data={this.props.tableData.thead}/>
            <Body {...this.state}
                preProcess={this.props.preProcess}
                postProcess={this.props.postProcess}
                data={this.props.tableData.tbody}/>
        </table>);
    }
});





module.exports = FlexTable;