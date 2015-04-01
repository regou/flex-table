var React = require('react');

import tableData from './fakeData';
import BarChart from './jsx/BarChart.jsx';
import FlexTable from './jsx/FlexTable.jsx';



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