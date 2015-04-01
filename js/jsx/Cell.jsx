
var React = require('react');
import util from './flexTableUtils';


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
        return preProcess(result,Component,val);
    }else{
        return typeof result==="string" ? result : val;
    }
};

var Cell = React.createClass({
    render: function(){

        var valObj = util.getValObj(this.props.value);
        var val = valObj.value;
        var type = this.props.type || 'd';
		var isRawHtml = valObj.isRawHtml;
        var result = null;
        var cName = this.props.baseClassName || '';


        var sortType = getSortType(this.props.isReverse);
        if(sortType){
            cName +=' sort_'+sortType;
            if(type!=='h'){cName += '_cell'}
        }

        if(type!=='h' && util.isNumber(val)){
            cName += ' flextable-col-number';

			var range = this.props.range;
			result = util.numComma(val);
			result = result==0 ? '-':result;
            if(this.props.autoBg){
                cName += util.colorfullCell(val,range);
            }
        }else{
            result = valObj;
        }


        result = preHandler(val,result,this);

        if(type==='h'){

            return isRawHtml ? (<th onClick={this.props.onClick} className={cName} dangerouslySetInnerHTML={{__html: result}}></th>) : (<th onClick={this.props.onClick} className={cName}>{result}</th>);
        }else{
			return isRawHtml ? (<td className={cName} dangerouslySetInnerHTML={{__html: result}}></td>) : (<td className={cName}>{result}</td>);
        }

    },
    componentDidUpdate:postHandler,
    componentDidMount:postHandler
});
postHandler.bind(Cell);


export default Cell;