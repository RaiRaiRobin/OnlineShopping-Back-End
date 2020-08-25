// $(document).on('submit', '#uploadForm', function(e) {
//     e.preventDefault();
//     var FormData = {
//         password: $('#password').val(),
//         email: $('#email').val()
//     }
//     $.ajax({
//         url: 'https://localhost:3000/login/user',
//         method: 'POST',
//         data: FormData,
//         beforeSend: function() {
//             alert("Sending")
//         },
//         success: function(response) {
//             localStorage.setItem("accessToken", response.accessToken);
//             localStorage.setItem("refreshToken", response.refreshToken);
//             alert(response.message);
//             console.log(response);
//             //window.location.href = "home.html";
//         },
//         error: function(jqXHR, status) {
//             alert('Failed to login');
//         }
//     });
// });