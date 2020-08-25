//login submit form
$(document).on('submit', '#loginForm', function(e) {
    e.preventDefault();
    var FormData = {
        password: $('#password').val(),
        email: $('#email').val()
    }
    $.ajax({
        url: 'https://localhost:3000/login/user',
        method: 'POST',
        data: FormData,
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            alert(response.message);
            console.log(response);
            //window.location.href = "home.html";
        },
        error: function(jqXHR, status) {
            alert('Failed to login');
        }
    });
});

$(document).on('click', '#google', function(e) {
    e.preventDefault();
    $.ajax({
        url: 'https://localhost:3000/auth/google',
        method: 'GET',
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            window.location.href = response.message;
        },
        error: function(jqXHR, status) {
            alert('Failed to login');
        }
    });
});

// import * as queryString from 'query-string';

// const urlParams = queryString.parse(window.location.search);

// if (urlParams.error) {
//   console.log(`An error occurred: ${urlParams.error}`);
// } else {
//   console.log(`The code is: ${urlParams.code}`);
// }