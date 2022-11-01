function NameValidation(fullName){
    var regex = /^[a-z]{3,}\s[a-z]{3,}$/i;
    if(regex.test(fullName))
        return true;
        
    var error = TypeError("Name was not in the correct format");
    throw error;
}

function EmailValidation(email){
    var regex = /^[a-z0-9\.\_]{3,}\@[a-z]{3,}(.com|.org|.net)$/i;
    if(regex.test(email))
        return true; 
    var error = TypeError("Email was not in the correct format");
    throw error;
}

function PasswordValidation(password){
    var regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15})/;
    if(regex.test(password))
        return true; 
    var error = TypeError("Password was not in the correct format");
    throw error;
}

function PhoneValidation(phone){
    var regex = /^(01)(0|1|2|5)[0-9]{8}$/;
    if(regex.test(phone))
        return true; 
    var error = TypeError("Phone was not in the correct format");
    throw error;
}

