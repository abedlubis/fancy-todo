$('#login-form').submit(function(e){
    e.preventDefault();
    var input = {
        email : $('#emailLogin').val(),
        password : $('#passwordLogin').val()
    }
    $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/login/',
            dataType: 'json',
            data: input
        })
        .done(function(dataLogin){
            console.log(dataLogin,"ccccccc")
            localStorage.setItem('token', dataLogin.token)
            checkLogin()
            $('#main-page').prepend(`
            <div class="alert alert-success" role="alert">
                berhasil login
            </div>
            `)
            setTimeout(() => {
                $('.alert').hide()
            }, 3000);
        })
        .fail(function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.responseText
        console.log(errorMessage)
        $('.sign').prepend(`
            <div class="alert alert-danger" role="alert">
                ${errorMessage}
            </div>
        `)
    })
})
$('#register-form').submit(function(e){
    e.preventDefault();
    var input = {
        email : $('#emailsignup').val(),
        password : $('#passwordsignup').val(),
        firstName : $('#firstNameSignUp').val(),
        LastName : $('#LastnameSignUp').val()
    }
    $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/register/',
            dataType: 'json',
            data: input
        })
        .done(function(dataLogin){
            checkLogin()
            $('.sign').prepend(`
                <div class="alert alert-danger" role="alert">
                    Berhasil Daftar, login dahulu
                </div>
            `)
        })
        .fail(function(error){
        console.log(error.responseJSON)
        $('.sign-container').prepend(`
            <div class="alert alert-danger" role="alert">
                ${error.responseJSON.message}
            </div>
        `)
    })
})
function checkLogin(){
    if(localStorage.getItem('token')){
        $('#app').show()
        fetchTask()
        fetchGroup()
        $('#login').hide()
        $('#signup').hide()
    }else{
        $('#login').show()
        $('#app').hide()
        $('#signup').hide()   
    }
}

function showLoginForm(){
    $('#login').show()
    $('#app').hide()
    $('#signup').hide()  
}

function showSignUpForm(){
    $('#signup').show()  
    $('#login').hide()
    $('#app').hide()
}

function logOut(){
    localStorage.removeItem('token')
    signOutGoogle()
    checkLogin()
}

function onSignIn(googleUser) {
    var tokenId = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/googlesign/',
        dataType: 'json',
        data: {
            token: tokenId
        }
    })
    .done(function(dataLogin){
        console.log(dataLogin,"ccccccc")
        localStorage.setItem('token', dataLogin.token)
        checkLogin()
    })
    .fail(function(error){
        console.log(error)
    })
}

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
