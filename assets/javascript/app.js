
$("#search-awesome").on("click", function (event) {

    // Added to prevent page load on type="submit" click event
    event.preventDefault();

    $("body").attr("id", "dynamic-background-mega");

    // Capture user inputs: 
    var search = $("#user-search").val();

    var userCity = $("#user-city").val();
    var userState = $("#user-state").val();

    var location = userCity + ", " + userState;

    // In here, we'll clear the header div
    $("#header-id").hide();

    // Create "Search again" button
    var newButton = $("<button>").addClass("btn btn-primary btn-md btn-search")
    newButton.html("Search For Something Else");
    newButton.attr("id", "search-again");

    // Maybe append somewhere else??
    newDiv = $("<div>").addClass("search-again-div");
    newDiv.append(newButton);
    $("#button-div-placement").append(newDiv);

    // Call getYelp function
    getYelp(search, location);


});

function getYelp(search, location) {


    var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + search + "&location=" + location + "$limit=10";

    $.ajax({
        url: yelpURL,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            function compare(a, b) {
                if (a.rating > b.rating) {
                    return -1;
                }
            }

            var sortedBusinesses = data.businesses.sort(compare);

            for (i = 0; i < 10; i++) {

                var address = "";

                for (j = 0; j < sortedBusinesses[i].location.display_address.length; j++) {

                    address = address + ", " + sortedBusinesses[i].location.display_address[j];
                }

                address = address.substring(1);

                var yelpLink = sortedBusinesses[i].url;

                $("#row-1").append(`
                
                <div class="card card-align" style="width: 20rem;">
                     <img src="${sortedBusinesses[i].image_url}" class="card-img-top results-img" alt="">
                        <div class="card-body">
                            <h4 class='card-title' id='business-name'>${sortedBusinesses[i].name}</h4>
                             <p class='card-text'>Rating: ${sortedBusinesses[i].rating}</p>
                        </div>
                        <ul class='list-group list-group-flush' id='business-info'>
                             <li class='list-group-item' id='address'>${address}</li>
                             <li class='list-group-item' id='phone'>${sortedBusinesses[i].display_phone}</li>
                         </ul>
                         <div class='card-body' id='yelp-link'>
                             <a href="${yelpLink}" class="card-link">Yelp! Site</a>
                        </div>
                </div>
                
                `)

            }
        }
    });



}

$(document).on("click", "#search-again", function () {

    // Show header again
    $("#header-id").show();

    // Empty results contents
    $("#button-div-placement").empty();
    $("#row-1").empty();

    // Remove mega-div id
    $("body").removeAttr("id", "dynamic-background-mega")

    // *** NOTE: Remember to empty weather div in app2.js
    $("#weather-data-output").empty();
    

});
