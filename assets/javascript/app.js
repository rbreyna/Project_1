getYelp("coffee", "San Antonio, TX")

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
            console.log(sortedBusinesses);


            for (i = 0; i < 10; i++) {

                var address = "";

                for(j = 0; j < sortedBusinesses[i].location.display_address.length;j++){

                    address = address + ", " + sortedBusinesses[i].location.display_address[j];
                }

                address = address.substring(1);                

                var yelpLink = sortedBusinesses[i].url;

                $("#yelp-data-output").append(`
                
                <div class="card" style="width: 18rem;">
                     <img src="${sortedBusinesses[i].image_url}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class='card-title' id='business-name'>${sortedBusinesses[i].name}</h5>
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
          var expensiveRestaurants = sortedBusinesses.filter( function(a){
                            return a.price === "$";
                        })
                        console.log(expensiveRestaurants);

        }
    });
}



  
