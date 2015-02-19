function delHtmlTag (str){
    var regex = /(<([^>]+)>)/ig;
    var result = str.replace(regex, " ");
    return result;
};

var d3 = require('d3');

function colorfullCell(value,maxValue){


    var color = d3.scale.linear()
        .domain([0,maxValue])
        .range([0,4]);

    if(isNumber(+value)){
        var classname = 'table-cell-lv'+Math.round(color((+value)));
        return classname;
    }
};


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
function numComma (str) {
    if(isNumber(str)){
        var str = str.toString();
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
        return str;
    }

};


module.exports = {
    delHtmlTag:delHtmlTag,
    isNumber:isNumber,
    numComma:numComma,
    colorfullCell:colorfullCell
};