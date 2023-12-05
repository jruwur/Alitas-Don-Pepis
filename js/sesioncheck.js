var usuarioActivo = sessionStorage.getItem("usuario");
if(usuarioActivo == "invitado" || usuarioActivo == null || usuarioActivo == undefined){
    alert("Primero inicia sesión papí");
    window.location.href="../index.html";
}else{
    console.log("sesion iniciada correctamente de " + usuarioActivo);
}