
window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

document.addEventListener('deviceready', onDeviceReady, false);
if(sessionStorage){
    var usr = sessionStorage.getItem("usuario");
}else{
    sessionStorage.setItem("usuario", "invitado");
}
var Newuser = {};//variable para almacenar nuevos usuarios
var AllUsers = [];//variable para almacenar a todos los usuarios
var registros = localStorage.getItem("Registros");

let myLatitude = 0; // Variable global para almacenar la latitud
let myLongitude = 0; // Variable global para almacenar la longitud

function sesion(){
    usuarioActivo = sessionStorage.getItem("usuario");
    if (usuarioActivo == "invitado"){
        alert("Primero inicia sesión")
        window.location.href ="../index.html";
    }
    else{
     var respuesta  =    confirm("Deseas cerrar sesión " + usuarioActivo +" ?");
        if(respuesta == true){
            sessionStorage.clear();
            window.location.href="../index.html"
        }
        else{
            alert("Puedes seguir navegando!")
        }
    }
}
function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position){
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
    
    myLatitude = position.coords.latitude; // Guarda la latitud actual en la variable global
    myLongitude = position.coords.longitude; // Guarda la longitud actual en la variable global
}

function calculatelocation(){
    event.preventDefault();
    if (myLatitude === 0 || myLongitude === 0) {
        alert("Activa la localización primero");
        return;
    }
    const knownLatitude = 22.4325322; // Latitud conocida
    const knownLongitude = -102.2509288;
    const distance = calculateDistance(myLatitude, myLongitude, knownLatitude, knownLongitude);
    alert("Estás a aproximadamente " + distance.toFixed(2) + " Kilómetros de la sucursal mas cercana en Luis Moya.");
}

// Función para calcular la distancia entre dos puntos geográficos utilizando la fórmula de Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    //calculamos la diferencia de las distancias
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    //haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //calculamos angulo entre los puntos
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance  = R * c; // Distancia en kilómetros
    return distance;
}

function deg2rad(deg) { //dirección con respecto a la posición
    return deg * (Math.PI/180);
}
function onError(error) {//error para la geolocalización
    console.error('Código de error: ' + error.code + '\n' + 'Mensaje de error: ' + error.message);
}
//variables para transición 
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

//transición entrada
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
//transición salida
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


if (registros) {//si encuentra registros existentes los desencripta de JSON a txt
    AllUsers = JSON.parse(registros);
}else{
   var admon = {//variable base de usuario admin
        "nombres": "admin",
        "apellidos": "confidential",
        "correo": "admin@correo.com",
        "contraseña": "poposhi18"
    };
    AllUsers.push(admon);
    localStorage.setItem("Registros", JSON.stringify(AllUsers));//guardamos al admin primero
}
function Registrarse() {//funcion para registrarse y validar campos de registro
    //variables de los campos del registro
    event.preventDefault();
    var names = document.getElementById("names").value;
    var lastnames = document.getElementById("lastnames").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    //patron de email
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //validaciones
    if (names && lastnames && email.match(validRegex) && pass) {//validación
        if (usuarioRepetido()) {
            alert("Este usuario ya existe!");
        } else {
            Newuser = {//formato para nuevo usuario
                "nombres": names,
                "apellidos": lastnames,
                "correo": email,
                "contraseña": pass
            };
            //Registro de nuevo usuario + alerta + animación
            AllUsers.push(Newuser);
            localStorage.setItem("Registros", JSON.stringify(AllUsers));
            alert("Usuario " + names + " registrado correctamente");
            limpiarRegister();
            container.classList.remove("sign-up-mode");
        }
    } else {
        alert("Por favor, completa todos los campos correctamente");
    }
}

function usuarioRepetido() {//validar que el usuario no sea uno ya existente
    for (var i = 0; i < AllUsers.length; i++) {
        if (AllUsers[i].correo === document.getElementById("email").value) {
            return true;
        }
    }
    return false;
}
function limpiarRegister(){
    document.getElementById("names").value = "";
            document.getElementById("email").value = "";
            document.getElementById("lastnames").value = "";
            document.getElementById("pass").value = "";
}
function login(){//función para iniciar sesión
//variables de los campos de iniciar sesión
event.preventDefault();
var LoginEmail = document.getElementById("loginCorreo").value;
var LoginPass = document.getElementById("loginPass").value;

if(LoginEmail && LoginPass){//validaciones
    if(LoginEmail === "admin@correo.com" && LoginPass === "poposhi18"){
        alert("Bienvenido ADMIN");
    }else if(validarUsuario()){//usuario aceptado + alert + navegación
        sessionStorage.clear();
        sessionStorage.setItem("usuario", LoginEmail);
        alert("Bienvenido!");
       window.location.href ="pages/home.html";
    }else{
        alert("Credenciales invalidas papi")
    }
}
else{
alert("Rellena primero los campos")
}
}

function validarUsuario (){//validamos usuario dentro de los registros
    var LoginEmail = document.getElementById("loginCorreo").value;
   var LoginPass = document.getElementById("loginPass").value;
    for(var i = 0; i < AllUsers.length; i++){
        if(LoginEmail == AllUsers[i].correo && LoginPass == AllUsers[i].contraseña){
            return true;
        }
    }
    return false;
}