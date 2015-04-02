var React = require('react');
require('react/addons');

import tableData from './fakeData';
import BarChart from './jsx/BarChart.jsx';
import FlexTable from './jsx/FlexTable.jsx';

/*
for(let i=0; i<=1000;i++ ){
   let num = Math.random();
   let rd = num.toString().replace('.','');
   tableData.tbody.push([
      "CN"+rd.slice(0,5)+"A",
      Math.floor(num*1000),
      rd.slice(5,10),
      rd.slice(3,7)+"-01-22",
      rd.slice(3,7)+"-07-30",
      {
         type:'chart',
         data:[rd.slice(11,12), rd.slice(12,13), rd.slice(13,14), rd.slice(14,15)]
      }
   ])
}
*/


function isChart(cellComp){
   return (typeof cellComp.props.value==="object" && cellComp.props.value.type==='chart');

}
var postProcess = function(cellComp,props){
   if(isChart(cellComp)){
      cellComp.getDOMNode().className += (' no-padding');
   }
};



var preProcess = function(res,cellComp,val){
   if(isChart(cellComp)){
      return <BarChart data={res.data}/>;
   }else{
      return val;
   }
};



React.render(<FlexTable preProcess={preProcess}
    postProcess={postProcess}
    className='data-table' tableData={tableData}/>,document.body);