//4klhom mzbot 

document.forms[0].elements["Email"].onblur = function(){
    try{
        EmailValidation(this.value);
        this.nextElementSibling.innerText = "";
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }catch(e){
        this.nextElementSibling.innerText = e.message;
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
    }
}

document.forms[0].elements["Password"].onblur = function(){
    try{
        PasswordValidation(this.value);
        this.nextElementSibling.innerText = "";
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }catch(e){
        this.nextElementSibling.innerText = e.message;
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
    }
}



document.forms[0].onsubmit = function(e){
    //debugger;
    e.preventDefault();
    var password = this.elements["Password"].value;
    var email = this.elements["Email"].value;


    try{
        PasswordValidation(password);
        EmailValidation(email);

        //validate user exists
        var XHR = new XMLHttpRequest();

        XHR.open("get","./Data/Users.json",false);

        XHR.onreadystatechange = function(){
            var found = false;
            var user = {};
            if(XHR.readyState == 4 && XHR.status == 200){
                var Data = JSON.parse(XHR.responseText);
                for(item of Data){
                    if(item.email == email && item.password == password){
                        found = true;
                        user = item;
                    }
                }
            }

            if(found){
                var Exp = new Date();
                Exp.setDate(Exp.getDate()+1);
                CreateCookie("FullName",user.username,Exp);
                CreateCookie("Email",user.email,Exp);
                document.forms[0].submit();
            }
            else{
                //e.preventDefault();
                alert("User not found");
            }
        }



        XHR.send();

    }catch{
        //e.preventDefault();
        alert("Please fill correct data");
    }
}


try{
    if(GetCookie("FullName") && GetCookie("Email")){
        location.replace("./Home.html");
    }
}catch{

}