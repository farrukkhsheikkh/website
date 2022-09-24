

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBUIjalmE7Pt-koa3DczCHeVlY_0nOmHEI",
    authDomain: "fahb-transport.firebaseapp.com",
    databaseURL: "https://fahb-transport.firebaseio.com",
    projectId: "fahb-transport",
    storageBucket: "fahb-transport.appspot.com",
    messagingSenderId: "931088747852",
    appId: "1:931088747852:web:ba7c1496e899d196a793e9",
    measurementId: "G-LL9GFSD8R7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  /* Firebase Collectin */
  var messageRef = firebase.database().ref('messages');
    
  var input = document.querySelector("#bookphone");
  window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: function(callback) {
      $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "us";
        callback(countryCode);
      });
    },
    utilsScript: "js/utils.js?1603274336113" // just for formatting/placeholders etc
  });
 
  $(document).ready(function(){
    $('input.timepicker').timepicker({});
});


$('.timepicker').timepicker({
    timeFormat: 'h:mm p',
    interval: 30,
    defaultTime: '11',
    startTime: '10:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

    $("#ridekilometer").keyup(function () {
        var riderates = $("#riderates").val();   
        var ridekilometer = $("#ridekilometer").val();   
        var ttlride = ridekilometer * riderates + 100;
        $("#ridettl").text(ttlride);
    })
  

var directionDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;  

    function initialize() {
        var start = document.getElementById("start");
        var end = document.getElementById("end");
        var autocompletePickpUp = new google.maps.places.Autocomplete(start);
        var autocompleteDelivery = new google.maps.places.Autocomplete(end);
        var myl = new google.maps.LatLng(25.0216522,67.3116653);
        var myOptions = {
            zoom:17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: myl,
        } 
        
        var startsearch = document.getElementById('start');
        var startoptions = {
          componentRestrictions: {
            country: 'pk'
          }
      };

      var autocompletestart = new google.maps.places.Autocomplete(startsearch, startoptions);

      var endsearch = document.getElementById('end');
      var endoptions = {
        componentRestrictions: {
          country: 'pk'
        }
    };


    var autocompletend = new google.maps.places.Autocomplete(endsearch, endoptions);
      
            
        

        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        autocompletePickpUp.bindTo('bounds', map); 
        autocompleteDelivery.bindTo('bounds', map);   

    }

    function calcRoute() { 

        var startValue =start.value;
        var endValue = end.value;
        var distanceInput = document.getElementById("distanceKm");
//        var distanceMl = document.getElementById("distanceMl");
//        var price = document.getElementById("price");

        var request = {
            origin:startValue, 
            destination:endValue,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                distanceInput.value = response.routes[0].legs[0].distance.value / 1000; 
        //        distanceMl.value =  response.routes[0].legs[0].distance.value * 0.000621371;
         //       price.value = distanceMl.value * 2.50;
                var ridemin = distanceInput.value * 30;
                //var minride = 300;

                if (ridemin < 250){
                  var minridecharg = 250;
                $("#ridecharges i").text(Math.round(minridecharg));
                $("#minridecharges").text('Your ride charges: ' + ridemin + ', Minimum Charges "' + minridecharg + '" applied on less than 250 PKR');
                }
                else{
                  $("#ridecharges i").text(Math.round(ridemin));
                }
            }
                            
            
 
        });         
    }
 
$("#end").on("change", function(){
  calcRoute();

})
$("#start").on("change", function(){
  calcRoute();
});

function resetsearch(){
  $("#start").val('');
  $("#end").val('');
  $("#bookname").val('');
  $("#bookphone").val('');
  $("#ridecharges i").text('000');
  
}



$(document).ready(function(){!function(){var e,s,i=3500,n=3800,t=n-3e3,a=50,d=150,o=500,r=o+800,l=600,c=2500;function p(e){var s=f(e);if(e.parents(".cd-headline").hasClass("type")){var c=e.parent(".cd-words-wrapper");c.addClass("selected").removeClass("waiting"),setTimeout(function(){c.removeClass("selected"),e.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")},o),setTimeout(function(){h(s,d)},r)}else if(e.parents(".cd-headline").hasClass("letters")){var v=e.children("i").length>=s.children("i").length;!function e(s,n,t,a){s.removeClass("in").addClass("out");s.is(":last-child")?t&&setTimeout(function(){p(f(n))},i):setTimeout(function(){e(s.next(),n,t,a)},a);if(s.is(":last-child")&&$("html").hasClass("no-csstransitions")){var d=f(n);m(n,d)}}(e.find("i").eq(0),e,v,a),u(s.find("i").eq(0),s,v,a)}else e.parents(".cd-headline").hasClass("clip")?e.parents(".cd-words-wrapper").animate({width:"2px"},l,function(){m(e,s),h(s)}):e.parents(".cd-headline").hasClass("loading-bar")?(e.parents(".cd-words-wrapper").removeClass("is-loading"),m(e,s),setTimeout(function(){p(s)},n),setTimeout(function(){e.parents(".cd-words-wrapper").addClass("is-loading")},t)):(m(e,s),setTimeout(function(){p(s)},i))}function h(e,s){e.parents(".cd-headline").hasClass("type")?(u(e.find("i").eq(0),e,!1,s),e.addClass("is-visible").removeClass("is-hidden")):e.parents(".cd-headline").hasClass("clip")&&e.parents(".cd-words-wrapper").animate({width:e.width()+10},l,function(){setTimeout(function(){p(e)},c)})}function u(e,s,n,t){e.addClass("in").removeClass("out"),e.is(":last-child")?(s.parents(".cd-headline").hasClass("type")&&setTimeout(function(){s.parents(".cd-words-wrapper").addClass("waiting")},100),n||setTimeout(function(){p(s)},i)):setTimeout(function(){u(e.next(),s,n,t)},t)}function f(e){return e.is(":last-child")?e.parent().children().eq(0):e.next()}function m(e,s){e.removeClass("is-visible").addClass("is-hidden"),s.removeClass("is-hidden").addClass("is-visible")}$(".cd-headline.letters").find("b").each(function(){var e=$(this),s=e.text().split(""),i=e.hasClass("is-visible");for(var n in s)e.parents(".rotate-2").length>0&&(s[n]="<em>"+s[n]+"</em>"),s[n]=i?'<i class="in">'+s[n]+"</i>":"<i>"+s[n]+"</i>";var t=s.join("");e.html(t).css("opacity",1)}),e=$(".cd-headline"),s=i,e.each(function(){var e=$(this);if(e.hasClass("loading-bar"))s=n,setTimeout(function(){e.find(".cd-words-wrapper").addClass("is-loading")},t);else if(e.hasClass("clip")){var i=e.find(".cd-words-wrapper"),a=i.width()+10;i.css("width",a)}else if(!e.hasClass("type")){var d=e.find(".cd-words-wrapper b"),o=0;d.each(function(){var e=$(this).width();e>o&&(o=e)}),e.find(".cd-words-wrapper").css("width",o)}setTimeout(function(){p(e.find(".is-visible").eq(0))},s)}),$(".cd-words-wrapper").css("width","200px")}()});



$('#ridebookform').on('submit', function(e) {

 
  var bookrideName = document.getElementById('bookname');
  var bookrideNameValue = (bookrideName).value;

  var bookridePhone = document.getElementById('bookphone');
  var bookridePhoneValue = (bookridePhone).value;

  var bookridefrm = document.getElementById('start');
  var bookridefrmValue = (bookridefrm).value;
  
      var bookrideto = document.getElementById('end');
      var bookridetoValue = (bookrideto).value;

      var bookridetime = document.getElementById('timepick');
      var bookridetimeValue = (bookridetime).value;

      var bookrideseat = document.getElementById('seats');
      var bookrideseatValue = (bookrideseat).value;

      var bookridecharge = $('#ridecharges i').text();
      var bookridechargeValue = (bookridecharge);

      //send data
      saveMessage(bookrideNameValue, bookridePhoneValue, bookridefrmValue, bookridetoValue, bookridetimeValue, bookrideseatValue, bookridechargeValue);
      //e.preventDefault();
      //whatsapp
      window.open('whatsapp://send?phone=+923112129313&text=Name: ' + bookrideNameValue + '%0aPhone: '  + bookridePhoneValue + '%0aPickup From: ' + bookridefrmValue + '%0aDrop Location: ' + bookridetoValue + '%0aPick Time: ' + bookridetimeValue + '%0aSeats: ' + bookrideseatValue + '%0aCharges: ' + bookridechargeValue + '%0aPlease confirm my ride,%0aThanks');


});


$('.inputfield.start i').on('click', function() {
  $('#start').val('');
})
$('.inputfield.end i').on('click', function() {
  $('#end').val('');
})





var latitudeAndLongitude=document.getElementById("latitudeAndLongitude"),
mylocation={
    latitude:'',
    longitude:''
};

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(showPosition);
}
else{
    latitudeAndLongitude.innerHTML="Geolocation is not supported by this browser.";
}

function showPosition(position){ 
    mylocation.latitude=position.coords.latitude;
    mylocation.longitude=position.coords.longitude;
    latitudeAndLongitude = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(mylocation.latitude, mylocation.longitude);

 if (geocoder) {
    geocoder.geocode({ 'latLng': latLng}, function (results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         console.log(results[0].formatted_address); 
         $('#start').val(results[0].formatted_address);
       }
       else {
        $('#starterror').html('Geocoding failed: '+status);
        console.log("Geocoding failed: " + status);
       }
    }); //geocoder.geocode()
  }
  
} //showPosition

$('#getmylocation').on('click', function(e){
  navigator.geolocation.getCurrentPosition(showPosition);
  e.preventDefault();
});


// Save data
  function saveMessage(bookrideNameValue, bookridePhoneValue, bookridefrmValue, bookridetoValue, bookridetimeValue, bookrideseatValue, bookridechargeValue){
    var newMessageRef = messageRef.push();
    newMessageRef.set({
        bookname: bookrideNameValue,
        bookphone:bookridePhoneValue,
        ridefrom: bookridefrmValue,
        rideto: bookridetoValue,
        ridetime:bookridetimeValue,
        rideseat:bookrideseatValue,
        ridecharges: bookridechargeValue

    })
  } 