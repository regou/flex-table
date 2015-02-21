var React = require('react');
var tableData = require('./fakeData');
var BarChart = require('./jsx/BarChart.jsx');
var FlexTable = require('./jsx/FlexTable.jsx');




function isChart(cellComp){
   return (typeof cellComp.props.value==="object" && cellComp.props.value.type==='chart');

}
var postProcess = function(cellComp,props){
   if(isChart(cellComp)){
      cellComp.getDOMNode().classList.add('no-padding');
   }
};



var preProcess = function(res,cellComp){
   if(isChart(cellComp)){
      return <BarChart data={res.data}/>;
   }else{
      return res;
   }
};



React.render(<FlexTable preProcess={preProcess}
    postProcess={postProcess}
    className='data-table' tableData={tableData}/>,document.body);