//WIDGET AUTH
//VK.Widgets.Auth("vk_auth", {width: "200px", authUrl: ''});
//LOGIN STATUS
var userid;
var firstName;
var lastName;
var photo;
VK.Auth.getLoginStatus(function (response) {
    if(response.session){
        userid = response.session.mid;
        get_user(userid);
    }else{
        //change name site here
        window.location = "https://oauth.vk.com/authorize?client_id=5886502&display=page&redirect_uri=http://vkwall&scope=wall&response_type=code&v=5.62";
    }
 });
//GET USER
function get_user(userid){
    VK.Api.call('users.get', {fields: "photo_50", v: "5.26"}, function(r) {
    if(r.response) {   
        firstName = r.response[0].first_name;
        lastName = r.response[0].last_name;
        photo = r.response[0].photo_50;
    }
    });
    get_wall(userid);
}
//GET WALL
function get_wall(userid){
    VK.Api.call('wall.get', {owner_id: userid, filter: "owner", v: "5.26", extended: 1}, function(r) {
    if(r.response) {   
        gotData(r);
    }
    });
}
//SEND POST
$('button[name="add"]').on("click",function(){
    var val = $("#mass").val();
    VK.Api.call('wall.post', {message: val, v: "5.26"}, function(r) {
        if(r.response) {
            alert('Успешно добавлено');
            get_wall(userid);
        }
    });
});
/*
//DELETE POST
function delete_wall(post){
    VK.Api.call('wall.delete', {post_id: post, v: "5.26"}, function(r) {
        console.log(r);
        if(r.response) {
            alert('Успешно удалено');
        }
    });
}
*/
function gotData(data){   
    console.log(data);
    if(!data || !data.response || !data.response.items) {
       console.error( "VK returned some crap:", data);
       return;
   }
   var html ="";

    //post_wrapper
    for(var i=0; i<data.response.items.length; i++) {
        var post = data.response.items[i];

        html += '<div class="post_wrapper">';
            html += '<div class="post_header">';
                html += '<a href="#"><img class="img-circle" src="'+photo+'" alt="" /></a>';
                html += '<div class="post_header_info">';
                    html += '<h5 class="post_author">';
                        html += '<a class="author" href="#">'+firstName+' ' +lastName+'</a>';
                    html += '</h5>';
                    //html += '<div class="header_date">';
                        //html += '<a href="#">'+firstName+' ' +lastName+'</a>';
                    //html += '</div>';
                html += '</div>';
            html += '</div>';

        html += '<div class="wall_text">';
            if(post.text) html += post.text;
            html += '<div class="copy_quite">';
            if(post.copy_history){
                for (var g=0; g<post.copy_history.length; g++) {
                //users info
                for(var j=0; j<data.response.profiles.length; j++){
                    var info = data.response.profiles[j];
                    if(post.copy_history[g].from_id===info.id){
                        html += '<div class="copy_post_header">';
                            html += '<a class="copy_post_image" href="#"><img width="40" height="40" class="img-circle" src="'+info.photo_50+'" alt="" /></a>';
                                html += '<div class="copy_header_info">';
                                    html += '<h5 class="copy_author">';
                                        html += '<a href="#">'+info.first_name+' '+info.last_name+'</a>';
                                    html += '</div>';
                                html += '</div>';
                    }
                }
                html += '<div class="wall_post_text">';
                    html += post.copy_history[g].text;
                html += '</div>';
            }
        }
        html += '</div></div></div>';
    }
    $('#posts_wrapper').html(html);
}