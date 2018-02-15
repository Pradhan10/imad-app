console.log('Loaded!');
var button = document.getElementById("clickme");
var count = 0;
button.onclick = function(){
    // make request to counter endpoint 
    // capture response and share result
    // update html
    count = count + 1;
    var display = document.getElementById("display").innnerHTML=count.toString();
};
