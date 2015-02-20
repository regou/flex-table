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
         75,
         "Method of radio chain circuit control resetting or treatment of timer after reconstitution in radio communication system",
         "2003-03-20",
         "2004-02-18"
      ],
      [
         "CN1761260A",
         64,
         "Method for preventing deadlock in a wireless communications system and radio plant",
         "2005-09-15",
         "2006-04-19"
      ],
      [
         "CN1937627A",
         12,
         "Method and apparatus fo handling timers during reestablishing transmitting sides in wireless communications systems",
         "2006-09-20",
         "2007-03-28"
      ],
      [
         "CN101272619A",
         37,
         "Method for enhancing data transmission efficiency for a radio resource control procedure",
         "2008-03-21",
         "2008-09-24"
      ],
      [
         "CN101267286A",
         36,
         "Method and apparatus for improving MIMO function in a wireless communications system",
         "2008-03-14",
         "2008-09-17"
      ],
      [
         "CN101325477A",
         3,
         "Method and apparatus for improving drx operation in a wireless communications system",
         "2008-06-13",
         "2008-12-17"
      ],
      [
         "CN101188494A",
         32,
         "Method and apparatus for configuring signaling radio bearer in a wireless communications system",
         "2007-11-21",
         "2008-05-28"
      ],
      [
         "CN101272561A",
         32,
         "Method and apparatus for handling random access procedure in a wireless communications system",
         "2008-03-21",
         "2008-09-24"
      ],
      [
         "CN101184269A",
         10,
         "Method and apparatus of selecting operating frequency for user equipment in a wireless communications system",
         "2007-11-13",
         "2008-05-21"
      ],
      [
         "CN101232657A",
         5,
         "Method and related apparatus for improving MIMO function in a wireless communication system",
         "2008-01-22",
         "2008-07-30"
      ]
   ]
};



var FlexTable = require('./jsx/FlexTable.jsx');
React.render(<FlexTable className='data-table' tableData={tableData}/>,document.body);