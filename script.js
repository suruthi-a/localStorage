const validateForm = () => {
    var name = $("#name").val();
    var age = $("#age").val();
    var address = $("#address").val();
    var email = $("#email").val();

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(age == ""){
        alert("Age is required");
        return false;
    }else if (age<1) {
        alert("Age must not be zero or less than zero");
        return false;
    }

    if(address == ""){
        alert("Address is required");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    }else if (!email.includes("@")){
       alert("Invalid Email Address"); 
       return false;
    }
    return true;
};


function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += 
        '<td><button onclick = "deleteData(' + index +
        ')" class = "btn btn-danger">Delete</button><button onclick = "updateData('+ index +
        ')" class = "btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#Table tbody").innerHTML = html;
}

document.onload = showData();


function AddData(){
    if (validateForm() == true)
    {
        var name = $("#name").val();
        var age = $("#age").val();
        var address = $("#address").val();
        var email =  $("#email").val();

        var peopleList;
        
        if(localStorage.getItem("peopleList") == null)
        {
            peopleList = [];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name:name,
            age:age,
            address:address,
            email:email,
        });

        localStorage.setItem("peopleList",JSON.stringify(peopleList));
        showData();
        $("#name").val("");
        $("#age").val("");
        $("#address").val("");
        $("#email").val("");
    }
};


function deleteData(index)
{
    var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.splice(index,1);
        localStorage.setItem("peopleList",JSON.stringify(peopleList));
        showData();
};


function updateData(index){
    $("#Submit").hide();
    $("#Update").show();

    var peopleList;
    if(localStorage.getItem("peopleList") == null){
            peopleList = [];
    }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    $("#name").val(peopleList[index].name) ;
    $("#age").val(peopleList[index].age) ;
    $("#address").val(peopleList[index].address)  ;
    $("#email").val(peopleList[index].email) ;

    document.querySelector("#Update").onclick = function() {
        if (validateForm() == true) {
            peopleList[index].name = $("#name").val();
            peopleList[index].age = $("#age").val() ;
            peopleList[index].address = $("#address").val()  ;
            peopleList[index].email = $("#email").val() ;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            $("#name").val("");
            $("#age").val("") ;
            $("#address").val("") ;
            $("#email").val("") ;

            $("#Submit").show();
            $("#Update").hide();
        }
    }
};