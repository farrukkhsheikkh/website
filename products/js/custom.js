// Copy2ClipBoard btn
new Clipboard('.btn', {
    container: document.getElementById('copysign')
});
// Color Hex Codes
$(document).ready(function(){

    $('#heavytext').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = '#' +this.value;
    
    $(".heavytext").css("color", valueSelected);
    
    });
    
    $('#normaltext').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = '#' +this.value;
    
    $(".normaltext").css("color", valueSelected);
    
    });
    
    $('#linktext').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = '#' +this.value;
    
    $(".linktext").css("color", valueSelected);
    
    });
    
    $('#bordertext').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = '#' +this.value;
    
    $(".bordertext").css("border-color", valueSelected);    
    });
});
    
// Signature Copied Alert
$(document).ready(function(){
    $('#btncopy').click(function(){
    alert('Signature has been copied, Cheers!');
});
$('footer+div').remove();
});

// Upload Temp image
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.imagesrc').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageupload").change(function () {
    readURL(this);
});

// Image Save
function uploadEx() {
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL("image/png");
    document.getElementById('hidden_data').value = dataURL;
    var fd = new FormData(document.forms["form1"]);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload_data.php', true);

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            var percentComplete = (e.loaded / e.total) * 100;
            console.log(percentComplete + '% uploaded');
//              alert('Succesfully uploaded');
        }
    };

    xhr.onload = function() {

    };
    xhr.send(fd);
var link = document.createElement('a');
link.download = "email_signature_sheikkh.png";
link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
link.click();
};