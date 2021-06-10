GREEN='#80C080'
RED='#C08080'


function showMessage(text,color) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")
	x.innerHTML=text
	x.style = "background-color:"+color
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 

function dismissableMessage(text,color) {
    var x = document.getElementById("snackbar")
    //$('#stickypop').append( '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' );  onClick="this.parentNode.classList.remove("show");"    
    x.innerHTML=text + '</label><a href="#" class="close" data-dismiss="alert" aria-label="close"  onClick="this.parentNode.classList.remove("show");" >&times;</a>';
	x.style = "background-color:"+color
    
    x.className = "show";  
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
}