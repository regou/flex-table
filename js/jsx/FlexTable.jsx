

var React = require('react');

import util from './flexTableUtils';


import Cell from './Cell.jsx';

var Head = React.createClass({
    getDefaultProps:function(){
        return {
            updateSort:function(){}
        }
    },
    render:function() {
        var data = this.props.data.thead || {};
        var Component = this;
        var sortIndex = Component.props.sortByColIndex;
        var isReverse = Component.props.isReverse;
        var r = data.map(function(headItem,i){
            var additionProps = {};
            if(i==sortIndex){
                additionProps.isReverse = isReverse;
            }
            if(headItem.sortable!==false){
                additionProps.onClick = Component.props.updateSort.bind(null,i);
                additionProps.baseClassName = 'sortableTh';
            }
            return (<Cell {...additionProps} type="h" key={i} value={headItem}/>);
        });
        return <thead>{r}</thead>;
    }

});


var getRange = function(d,theadData){
    var curMax = undefined;
	var curMin = undefined;
	var rowExcluder = theadData.map(function(thItem,index){//exclude some data
		return {
			index:index,
			autoBg:thItem.autoBg !== false
		}
	});
    d.forEach(function(rowArr){
        rowArr.forEach(function(cellData,i){
            var comparer = util.getValObj(cellData).value;
            if(rowExcluder[i].autoBg && util.isNumber(comparer)){
				comparer=comparer*1;
				if(curMax==undefined || curMin==undefined){
					curMax = comparer;curMin = comparer;//preInit
				}
                if(comparer>curMax){curMax = comparer;}
				if(comparer<curMin){curMin = comparer;}
            }
        })
    });
	var res = [curMin,curMax];
	if(typeof curMin!=="number" || typeof curMax!=="number"){res = [0,0]}
    return res;
};
var sortRow = function(d,index){
	var getVal = function(rowArr){
		return util.getValObj(rowArr[index]).value;
	};

	return d.sort(function (a, b) {
		if (getVal(a) > getVal(b)) {
			return 1;
		}
		if (getVal(a) < getVal(b)) {
			return -1;
		}
		return 0;
	});
};


var Body = React.createClass({
        getDefaultProps:getDefSortData,
        render: function(){
            var r = [];
            var Component = this;
            var d = Component.props.data.tbody || {};
            var theadData = Component.props.data.thead || {};
			var range = getRange(d,theadData);


            var sortIndex = Component.props.sortByColIndex;
            var isReverse = Component.props.isReverse;
            if(sortIndex>=0){
                d = sortRow(d,sortIndex);
                if(isReverse){
                    d.reverse();
                }
            }

            d.forEach(function(rowItems,j){
                var items = rowItems.map(function(rowItem,i){
                    var additionProps = {
                        colIndex:i,
                        postProcess:Component.props.postProcess,
                        preProcess:Component.props.preProcess
                    };
                    if(i==sortIndex){
                        additionProps.isReverse=isReverse;
                    }
                    if(theadData[i].autoBg!==false){
                        additionProps.autoBg = true;
                    }
                    return <Cell {...additionProps} range={range} type="d" key={i} value={rowItem}/>;
                });
                r.push(<tr key={j}>{items}</tr>)
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
            <Head {...this.state} updateSort={this._updateSortBy} data={this.props.tableData}/>
            <Body {...this.state}
                preProcess={this.props.preProcess}
                postProcess={this.props.postProcess}
                data={this.props.tableData}/>
        </table>);
    }
});

export default FlexTable;