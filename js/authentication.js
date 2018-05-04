window.onload = inicializar;
var formAuth;

function inicializar(){
    formAuth = document.getElementById("form-autenticacion");
    formAuthentication.addEventListener("submit", autentificar, false);
    alert("I am an alert box!");
}

function autentificar(event){
    var usuario = event.target.email.value;
    var contrasena = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
    .then(function(result){
        alert("Autenticación correcta!");
    })
    .catch(function(error) {
      alert("No se ha realizado la Autenticación!");

});

}
