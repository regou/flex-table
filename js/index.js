var React = require('react');


var FlexTable = require('./jsx/FlexTable.jsx');

   window.qqaa=1500000;

var tableData = {
   thead:['Name','Age'],
   tbody:[
      ['wx',2],
      ['wx2',4]
   ]
};


React.render(<FlexTable tableData={tableData}/>,document.body);