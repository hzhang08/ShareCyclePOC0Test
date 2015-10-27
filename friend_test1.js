$(document).ready(function(){
  console.log("main-document-ready");
  getLoginStatus();
});


function getPicture(token){
  <!--called two apis in this subroutine-->
    var path = "/me?";
    var query = path + token;

    FB.api(
      query,
      function(response){

        console.log("fb.api");
        if(response && !response.error)
        {
            $("#hong-name").text(response.name);

        }
        else {
            console.log("bad response");
            alert(response);
        }
      }
    );

    var picture_path = "/me/picture?";
    var picture_query = picture_path + token;


    FB.api(picture_query,
    function(response){

      if(response && !response.error)
      {
          $("#hong-image").prepend('<img id="theImg" src="'+ response.data.url +'" />');
      }
      else {
          alert(response);
      }

    });

    //generating a list of friends
    var friend_path = "/me/friends?"
    var friend_query = friend_path + token;

    FB.api(friend_query,
    function(response){
      if(response && !response.error)
      {
          var friend_count = response.data.length;

          for(i = 0; i<friend_count; i++)
          {
              //response.data[i].name response.data[i].id

              var picture_url = getFriendPicture(token, response.data[i].id, response.data[i].name);

          }
      }
      else {
          alert(response);
      }
    });

};//getPicture function

function getFriendPicture(token, friend_id, friend_name){
  var friend_picture_path = "/"+ friend_id +"/picture?";
  var friend_picture_query = friend_picture_path + token;

  var picture_url;
  FB.api(friend_picture_query, function(response){
    if(response && !response.error)
    {
        picture_url = response.data.url;
        console.log(picture_url);
        //$("#friend-table").prepend('<tr><td><img src="'+picture_url+'"/></td><td>'+friend_name+'</td></tr>');
        $("#friend-table").prepend('<tr><td><img src="'+picture_url+'"/></td><td>'+friend_name+'</td></tr>');
    }
    else {
        alert(response);
    }
  });

}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.

    console.log("connected branch");
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    getPicture(accessToken);

  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    alert("not authorized");
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    alert("not authorized");
  }
}
