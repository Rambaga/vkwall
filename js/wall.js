//BEGIN WIDGET AUTH
//VK.Widgets.Auth("vk_auth", {width: "200px", authUrl: ''});
//END

(function (){
    $.ajax({
        url: "https://api.vk.com/method/wall.get",
        data: {
            owner_id: userid,
            filter: "owner",
            v: "5.26",
            extended: 1,
        },
        dataType: "jsonp",    
        success: gotData,
    });
}());
//BEGIN ADD POST
function add_post(){
    $.ajax({
        url: "https://api.vk.com/method/wall.post",
        data: {
        owner_id: userid,
        message: "hi guys",
        access_token: session,
        v: "5.26",
        },
        dataType: "jsonp",    
        success: function(data){
            console.log(data);
        },
    });
}
//END
//BEGIN DELETE POST
function delete_post(post){
    $.ajax({
        url: "https://api.vk.com/method/wall.delete",
        data: {
        post_id: post,
        access_token: session,
        v: "5.26",
        },
        dataType: "jsonp",    
        success: function(data){
            console.log(data);
        },
    });
}
//END
function gotData(data){   
    if(!data || !data.response || !data.response.items) {
       console.error( "VK returned some crap:", data);
       return;
   }
   var html ="";
    //users info
    for(var j=0; j<data.response.profiles.length; j++){
        var info = data.response.profiles[j];
    }
    //posts
    for(var i=0; i<data.response.items.length; i++) {
        var post = data.response.items[i];
        html += '<div class="post_wrapper">';
        html += '<div class="post">';
        if(!post.copy_history){
            html += post.text+' '+post.text+'<br>'+ post.text;
        }else{
            html += post.text+' ' +post.text+'<br>'+post.text+' '+post.text+'<br>'+ post.text;
        }
        html += '<br><button type="button" class="btn btn-default" onclick="delete_post('+post.id+')">Delete post</button></div></div>';
    }
    $('#posting').html(html);
}
