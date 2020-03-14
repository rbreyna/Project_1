

getYelp("restaurants", "San Antonio, TX")

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

            var sortedBusinesses = data.businesses.sort( compare );
            console.log(sortedBusinesses);
  
            var expensiveRestaurants = sortedBusinesses.filter( function(a){
                return a.price === "$";
            })
            console.log(expensiveRestaurants);
            console.log(data);
        }
    });
}




