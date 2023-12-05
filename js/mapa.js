function iniciarMap(){
    var coord = {lat:22.4325322 ,lng: -102.2509288};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}