var React = require('react');
var tableData = {
   "thead": [
      "NAME",
      "COUNT",
      "TITLE",
      "APD",
      "PBD"
   ],
   "tbody": [
      [
         "CN1476182A",
         1714,
         "Method of radio chain circuit control resetting or treatment of timer after reconstitution in radio communication system",
         "2003-03-20",
         "2004-02-18"
      ],
      [
         "CN1761260A",
         3012,
         "Method for preventing deadlock in a wireless communications system and radio plant",
         "2005-09-15",
         "2006-04-19"
      ],
      [
         "CN1937627A",
         1223,
         "Method and apparatus fo handling timers during reestablishing transmitting sides in wireless communications systems",
         "2006-09-20",
         "2007-03-28"
      ],
      [
         "CN101272619A",
         1076,
         "Method for enhancing data transmission efficiency for a radio resource control procedure",
         "2008-03-21",
         "2008-09-24"
      ],
      [
         "CN101267286A",
         2333,
         "Method and apparatus for improving MIMO function in a wireless communications system",
         "2008-03-14",
         "2008-09-17"
      ],
      [
         "CN101325477A",
         323,
         "Method and apparatus for improving drx operation in a wireless communications system",
         "2008-06-13",
         "2008-12-17"
      ],
      [
         "CN101188494A",
         145,
         "Method and apparatus for configuring signaling radio bearer in a wireless communications system",
         "2007-11-21",
         "2008-05-28"
      ],
      [
         "CN101272561A",
         2100,
         "Method and apparatus for handling random access procedure in a wireless communications system",
         "2008-03-21",
         "2008-09-24"
      ],
      [
         "CN101184269A",
         1023,
         "Method and apparatus of selecting operating frequency for user equipment in a wireless communications system",
         "2007-11-13",
         "2008-05-21"
      ],
      [
         "CN101232657A",
         53,
         "Method and related apparatus for improving MIMO function in a wireless communication system",
         "2008-01-22",
         "2008-07-30"
      ]
   ]
};

var postProcess = {
   cell:function(cellComp,props){
      console.log(props);
   }
};


var FlexTable = require('./jsx/FlexTable.jsx');
React.render(<FlexTable postProcess={postProcess} className='data-table' tableData={tableData}/>,document.body);