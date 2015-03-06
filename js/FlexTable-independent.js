var React = window.React = require('react');
window.Comps = window.Comps || {};

var FlexTableComp = require('./jsx/FlexTable.jsx');
window.Comps.FlexTable = function(userConf,jqEle){
	var defConf = {
		className: "tidy_table",
		tableData:{}
	};
	var conf = _.assign(defConf,userConf);
	_.each(conf.tableData.thead,function(item,i){
		if(typeof item=="object"){
			conf.tableData.thead[i].isRawHtml = true;
		}else{
			conf.tableData.thead[i] = {value:item,isRawHtml:true}
		}
	});


	return React.render(React.createElement(FlexTableComp, conf),jqEle.get(0));
};

module.exports = window.Comps;