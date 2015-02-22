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
function preHandler(val,result,Component){
    var preProcess = Component.props.preProcess;
    if(typeof preProcess==="function"){
        return preProcess(result,Component);
    }else{
        return val;
    }
};

var Cell = React.createClass({
    render: function(){
        var max = this.props.max;
        var valObj = util.getValObj(this.props.value);
        var val = valObj.value;
        var type = this.props.type || 'd';
        var result = null;
        var cName = this.props.baseClassName || '';


        var sortType = getSortType(this.props.isReverse);
        if(sortType){
            cName +=' sort_'+sortType;
            if(type!=='h'){cName += '_cell'}
        }

        if(util.isNumber(val)){
            cName += ' col-number';
            result = util.numComma(val);
            if(this.props.autoBg){
                cName += util.colorfullCell(val,max);
            }
        }else{
            result = valObj;
        }


        result = preHandler(val,result,this);

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