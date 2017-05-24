
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var city = $('#city').val();
    var street = $('#street').val();
    var address = street + ',' + city ;

    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'">');

    // YOUR CODE GOES HERE!

    $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+address+"&sort=newest&api-key=914217aed4144766b7c910e094ce1e95", function(result){
      const docs = result.response.docs;
      for(var i=0; i<docs.length; i++){
        $nytElem.append('<li class="article">'+docs[i].headline.main+'</li>');
      }
      //console.log(result.response.docs);
    });

    /*$.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json", function(result){
      console.log(result);
    })*/
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback",
      dataType: 'jsonp',
      success: function(result){
        console.log(result);
        for(var i=0; i<result[1].length; i++){
          $wikiElem.append("<li class='article'><a href='"+result[3][i]+"'>"+result[1][i]+"</a></li>");
        }
      }
    });

    return false;
};

$('#form-container').submit(loadData);
