//For Submission Form - Pressing Search Button
function displayFunction() {

    //delete 'search' button
    var node = document.getElementById("search-button");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
    //Add 'textarea'
    var ta = document.createElement("textarea");
    ta.classList.add("form-control");
    ta.classList.add("textarea-override");
    ta.setAttribute("id", "usr");
    ta.rows = "5";
    ta.disabled = true;
    //Add 'br' tag
    var br = document.createElement('br');
    //Add attachement button
    var ab = document.createElement("input");
    ab.classList.add("btn");
    ab.classList.add("btn-default");
    ab.classList.add("btn-file");
    ab.type = "file";
    ab.setAttribute("data-preview-file-type", "text");
    ab.setAttribute("id", "input-id");
    document.getElementById("append-to-this").appendChild(ta);
    document.getElementById("append-to-this").appendChild(ab);

    // document.getElementById("append-to-this").appendChild(div);
    // <button type="submit" class="btn btn-default submit-override">Submit</button>
    // initialize with defaults
    $("#input-id").fileinput();
    // with plugin options
    $("#input-id").fileinput({
        'showUpload': false,
        'previewFileType': 'any'
    });
    // <input id="input-id" type="file" class="btn btn-default btn-file" data-preview-file-type="text">
}

function submitFunction() {
    var netCode = document.getElementById("netCodeList").value;
    var lat = document.getElementById("lat-id").value;
    var long = document.getElementById("lng-id").value;
    var date = moment().format('Do MMMM YYYY, h:mm:ss a');

    var ref = new Firebase("https://sithack123.firebaseio.com");
    var postsRef = ref.child("records");

    postsRef.push().set({
        "Date": date,
        "Latitude": parseFloat(lat),
        "Longitude": parseFloat(long),
        "NetCode": netCode,
        "Intensity": 100
    });

    alert("Thanks For Reporting to Us");
}

function searchNet() {
    var radios = document.getElementsByName('optradio');
    var colour;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            colour = radios[i].value;
            break;
        }
    }
    var meshSize = $('#label2').val();
    var twineSize = $('#label3').val();
    var strands = $('#label4').val();
    var netList = [];

    var ref = new Firebase("https://sithack123.firebaseio.com/nets");
    ref.orderByChild("Colour").equalTo(colour).on("child_added", function(netColour) {
        var netVal = netColour.val();

        if (jQuery.inArray(netVal['NET CODE'], netList) < 0) {
            netList.push(netVal['NET CODE']);

            addToDropDown(netVal['NET CODE']);
        }
    });
    ref.orderByChild("Mesh Size").startAt(meshSize - 3).endAt(meshSize + 3).on("child_added", function(netMesh) {
        var netKey = netMesh.key();
        if (jQuery.inArray(netKey, netList) < 0) {
            netList.push(netKey);
            addToDropDown(netKey);
        }
    });
    ref.orderByChild("Twine Size").startAt(twineSize - 0.3).endAt(twineSize + 0.3).on("child_added", function(netTwine) {
        var netKey = netTwine.key();
        if (jQuery.inArray(netKey, netList) < 0) {
            netList.push(netKey);
            addToDropDown(netKey);
        }
    });
    ref.orderByChild("Strands").equalTo(strands).on("child_added", function(netStrands) {
        var netKey = netStrands.key();
        if (jQuery.inArray(netKey, netList) < 0) {
            netList.push(netKey);
            addToDropDown(netKey);
        }
    });
}

function addToDropDown(netKey) {
    var ops = document.createElement("option");
    var t = document.createTextNode(netKey);
    ops.setAttribute("value", netKey);
    ops.appendChild(t);
    document.getElementById("netCodeList").appendChild(ops);
}


//Geolocation HTML5//
function getLocation() {
    var x = document.getElementById("usr");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var x = document.getElementById("usr");
    var lat = parseFloat(position.coords.latitude);
    var latInput = document.createElement("input");
    latInput.type = "hidden";
    latInput.setAttribute("value", lat);
    latInput.setAttribute("id", "lat-id");
    var lng = parseFloat(position.coords.longitude);
    var lngInput = document.createElement("input");
    lngInput.type = "hidden";
    lngInput.setAttribute("value", lng);
    lngInput.setAttribute("id", "lng-id");
    //Add a submit button
    var sb = document.createElement('button');
    sb.type = "submit";
    sb.classList.add("btn");
    sb.classList.add("btn-default");
    sb.classList.add("submit-override");
    var textnode = document.createTextNode("Submit");
    sb.appendChild(textnode);
    var br = document.createElement('br');
    document.getElementById("append-to-this").appendChild(br);
    document.getElementById("append-to-this").appendChild(latInput);
    document.getElementById("append-to-this").appendChild(lngInput);
    document.getElementById("append-to-this").appendChild(sb);
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                x.innerHTML = "*INFORMATION OF RECORD*\n\nlocation\nLatitude: " + lat + "\nLongitude: " + lng + "\nAddress: " + results[1].formatted_address + "\n\ndate\n" + Date();

            }
        }
    });
}
