//Register new user submit form
$(document).on('submit', '#registerForm', function(e) {
    e.preventDefault();
    var FormData = {
        username: $('#username').val(),
        password: $('#password').val(),
        email: $('#email').val()
    }
    $.ajax({
        url: 'http://localhost:3000/register/user',
        method: 'POST',
        data: FormData,
        beforeSend: function() {
            alert("Sending...")
        },
        success: function(response) {
            console.log(response);
            /* console.log(response.status);
            localStorage.setItem("user_code", response.token);
            console.log(response.token);
            alert(response.message);
            window.location.href = "home.html"; */
        },
        error: function(jqXHR, status) {
            alert('Failed to register');
        }
    });
});
