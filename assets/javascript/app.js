



function getYelp(search, location){

    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="+search+"&location="+location;

    $.ajax({
    url: myurl,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
    }
});    
}



  
