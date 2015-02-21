/** @jsx React.DOM */

var React = require('react');
var util = require('./flexTableUtils');


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


module.exports = Cell;