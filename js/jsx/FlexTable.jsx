/** @jsx React.DOM */



var React = require('react');
var util = require('./flexTableUtils');
var _ = require('lodash');

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


var Body = (function(){
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
    return React.createClass({
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
})();



var Cell = (function(){
    function getSortType (isReverse){
        if(typeof isReverse === "boolean"){return isReverse ? 'desc':'asc'}
    }
    function postHandler(){
        var postProcess = this.props.postProcess || function(){};
        postProcess(this,this.props);
    };
    function preHandler(result,Component){
        var preProcess = Component.props.preProcess;
        if(typeof preProcess==="function"){
            return preProcess(result,Component);
        }else{
            return result;
        }
    };
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

            var sortType = getSortType(this.props.isReverse);
            if(sortType){
                cName +=' sort_'+sortType;
                if(type!=='h'){cName += '_cell'}
            }


            result = preHandler(result,this);

            if(type==='h'){
                return <th onClick={this.props.onClick} className={cName}>{result}</th>;
            }else{
                return <td className={cName}>{result}</td>;
            }

        },
        componentDidUpdate:postHandler,
        componentDidMount:postHandler
    });


    postHandler.bind(Cell);

    return Cell;
})();

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