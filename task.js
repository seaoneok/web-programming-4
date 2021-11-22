var modal = document.querySelector(".modal"); 
var task = document.getElementById('#task');

// for counting added tasks
var cnt = 1;

// use to save task information 
// and store it in local storage
var array = new Array();
array = JSON.stringify(array);   
/*
$(document).ready(function(){
*/

// when the user clicks add button, the input modal appears
$(".button").click(function(){
    modal.classList.toggle("show-modal"); 
});

// whe the user clicks close button, the input modal closes
// and reset the inputs
$(".close-button").click(function(){
    $("#url").val('');
    $("#imgTitle").val('');
    $("#imgDescription").val('');
    $("#imgType").val('');
    
    modal.classList.toggle("show-modal"); 
});

// whe the user clicks cancel button, the input modal closes
// and reset the inputs
$("#cancel").click(function(){
    $("#url").val('');
    $("#imgTitle").val('');
    $("#imgDescription").val('');
    $("#imgType").val('');

    modal.classList.toggle("show-modal"); 
});

// whe the user clicks submit button, the input modal closes
// and make the tasks
// and reset the inputs
$("#submit").click((event)=>{
    // if the inputs are in all right format
    if(validate_url() && !validateEmpty("#url") && !validateEmpty("#imgTitle") && !validateEmpty("#imgDescription") && !validateEmpty("#imgType")){
        event.preventDefault();
        var img_url = $("#url").val();
        var title = $("#imgTitle").val();
        var description = $("#imgDescription").val();
        var type = $("#imgType").val();

        // store cnt and array
        localStorage.setItem('cnt',cnt);
        localStorage.setItem('array',array);
        cnt = localStorage.getItem('cnt');
        array = localStorage.getItem('array',array);
        array = JSON.parse(array);
        // store new inputs into the array
        array.push({url:img_url,img_title:title,img_description:description,img_type:type,img_cnt:cnt});
        array = JSON.stringify(array);
        // store array in local storage
        localStorage.setItem('array', array);

        // render the task to the main page
        $("#task").append("<div class='item' id = 'item"+cnt+"'> <img src ='trash.png' id = 'trash' onclick='remove("+cnt+")'> <img src = '" + img_url + "' id = 'image'> <h2 id = 'title'>" + title + "</h2> <a id = 'description'>"+description+"</a><br> <a id = 'type'>"+type+"</a> </div>");
        cnt++;
        localStorage.setItem('cnt',cnt);
        $("#url").val('');
        $("#imgTitle").val('');
        $("#imgDescription").val('');
        $("#imgType").val('');

        modal.classList.toggle("show-modal"); 
    }
    // if the inputs are in wrong format
    // the user cannot submit the modal
    else{
        return false;
    }
});

/*
});
*/

// removing the task function
function remove(this_cnt) {

    // get task array from local storage
    localStorage.getItem('array',array);
    array = JSON.parse(array);
    // delete the element
    var li = document.getElementById('item'+this_cnt);
    $(li).remove();

    // delete the element from the array
    for(let i = 0; i < array.length; i++) {
        if(array[i].img_cnt == this_cnt)  {
        array.splice(i, 1);
        i--;
        }
    }

    array = JSON.stringify(array);

    // store the array
    localStorage.setItem('array',array);
}

// validate if the inputs are empty
function validateEmpty(id){
    var name = $(id).val();
    // if empty, return true so the user cannot submit the form
    if(name == null || name == ''){
        return true;
    }
}

// validate if the url is in right format
function validate_url(){
    var url = $("#url").val();
    var url_reg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    if(url_reg.test(url)){
        return true;
    }
    else{
        return false;
    }
}

var html = '';

// get stored items (array, cnt) from local storage
// so if the page is reloaded or reopened
// the tasks stays the same 
function getFromLocalStorage(){
    var task = document.querySelector('.task');
    const reference = localStorage.getItem('array');

    // if there's a item in localstorage
    if (reference) {
        array = JSON.parse(reference);

        // add the tasks using the stored array
        for(var i = 0; i<array.length; i++){
            console.log(array.length);
            html += "<div class='item' id = 'item"+array[i].img_cnt+"'> <img src ='trash.png' id = 'trash' onclick='remove("+array[i].img_cnt+")'>";
            html += "<img src = '" + array[i].url + "' id = 'image'>";
            html += "<h2 id = 'title'>" + array[i].img_title + "</h2>";
            html += "<a id = 'description'>" + array[i].img_description + "</a><br>";
            html += "<a id = 'type'>" + array[i].img_type + "</a> </div>"
        }

        task.innerHTML += html;

        // store array in localstorage
        // to use it again
        array = JSON.stringify(array);
        localStorage.setItem('array',array);
        cnt = localStorage.getItem('cnt');
    }
    
}

getFromLocalStorage();