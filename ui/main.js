console.log('Loaded!');
var button = document.getElementById("clickme");
var count = 0;
button.onclick = function(){
    // Create request object
    var request = new XMLHttpRequest();
    // capture response and store it in variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                var counter = request.responseText;
                var display = document.getElementById("display").innnerHTML=count.toString();
            }
        } //if request is not done, do nothing
    };
    
    // make request
    request.open("GET","http://pradhanrishi10.imad.hasura-app.io/counter",true);
    request.send(null);
};
