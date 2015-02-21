function delHtmlTag (str){
    var regex = /(<([^>]+)>)/ig;
    var result = str.replace(regex, " ");
    return result;
};

function linear (o){
    var domain = o.domain;
    var range = o.range;
     return function(val){
         if(val<=domain[0]){return range[0]};
         if(val>=domain[1]){return range[1]};

         var maxDist = domain[1] - domain[0];
         var dist = val - domain[0];
         var present = dist/maxDist;
         return (range[1]-range[0])*present + range[0];


     }
};

function colorfullCell(value,maxValue){

    var color = linear({
        domain:[0,maxValue],
        range:[0,4]
    });

    if(isNumber(+value)){
        var classname = 'col-number table-cell-lv'+Math.round(color((+value)));
        return classname;
    }
};


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
var numFormat = (function(){
    if(window.Intl && Intl.NumberFormat){
        return new Intl.NumberFormat().format;
    }else{
       return function(str){
           var str = str.toString();
           return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       }
    }
})();
function numComma (str) {
    if(isNumber(str)){
        return numFormat(str);
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