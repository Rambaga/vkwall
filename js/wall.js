//WIDGET AUTH
//VK.Widgets.Auth("vk_auth", {width: "200px", authUrl: ''});
//LOGIN STATUS
var userid;
VK.Auth.getLoginStatus(function (response) {
    if(response.session){
        userid = response.session.mid;
        get_wall(userid);
    }else{
        //change name site here
        window.location = "https://oauth.vk.com/authorize?client_id=5886502&display=page&redirect_uri=http://vkwall&scope=wall&response_type=code&v=5.62";
    }
 });

//GET WALL
function get_wall(userid){
    VK.Api.call('wall.get', {owner_id: userid, filter: "owner", v: "5.26", extended: 1}, function(r) {
    console.log(r);
    if(r.response) {   
        gotData(r);
    }
    });
}
//SEND POST
function post_wall(){
    VK.Api.call('wall.post', {message: "hi guy", v: "5.26"}, function(r) {
        if(r.response) {
            alert('Успешно добавлено');
        }
    });
}
//DELETE POST
function delete_wall(post){
    VK.Api.call('wall.delete', {post_id: post, v: "5.26"}, function(r) {
        console.log(r);
        if(r.response) {
            alert('Успешно удалено');
        }
    });
}

function gotData(data){   
    console.log(data);
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
        html += '<br><button type="button" class="btn btn-default" onclick="delete_wall('+post.id+')">Delete post</button></div></div>';
    }
    $('#posting').html(html);
}