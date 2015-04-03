# patsnap-flex-table
flex table for inSight

`$ > npm install -g gulp`

`$ > npm install`

`$ > npm run dev`

Then open index.html, then play with the demo

<img src="https://raw.github.com/regou/patsnap-flex-table/master/rdimg.jpg" >


### Single table cell config expample:

Every single table cell data can be a `String`, `Number` or a configuration `Object`

```javascript 
{
  value:'5',//define the value of the cell,if not set,you must handle it on pre/postprocess
  autoBg:true,//the cell need auto Background color highlight,default is true
  sortable:true,//Config if the column is sortable.Only aceept on thead default is true
  isRawHtml:false//Set true if value is a html string(no html escaping),default is false
}
```

### Usage:
```jsx
  <FlexTable tableData={exampleTableData}
    preProcess={preProcess} //handle passed celldata
    postProcess={postProcess}//hanlde generated <td> dom element
    className='data-table' />
```


```javascript
var exampleTableData = {
    "thead": [
        "NAME",
        {value:"COUNT",autoBg:true},
        "TITLE",
        "APD",
        "PBD",
        {value:"Trend",sortable:false}
    ],
    "tbody": [
        [
            "CN1476182A",
            1714,
            "Method of radio chain circuit control resetting or treatment of timer",
            "2003-03-20",
            "2004-02-18",
            {
                type:'chart',
                data:[3, 0, 3, 6]
            }
        ],
        [
            "CN1761260A",
            3012,
            "Method for preventing deadlock in a wireless communications system",
            "2005-09-15",
            "2006-04-19",
            {
                type:'chart',
                data:[3, 0, 3, 6]
            }
        ],
        [
            "CN1937627A",
            1223,
            "Method and apparatus fo handling timers systems",
            "2006-09-20",
            "2007-03-28",
            {
                type:'chart',
                data:[3, 8, 0.5, 9]
            }
        ]        
    ]
};
```




