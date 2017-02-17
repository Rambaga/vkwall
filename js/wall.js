//initialization app
VK.init({
    apiId: 5879757
});
//widget auth
VK.Widgets.Auth("vk_auth", {width: "200px", authUrl: '/'});
//check auth user

VK.Auth.getLoginStatus(function (response) {
    if(!response.session){
        //change name site here
        window.location = "https://oauth.vk.com/authorize?client_id=5879757&display=page&redirect_uri=http://vkwall&scope=friends&response_type=code&v=5.62";
    }else{
        var id_user=1;
        $.ajax({
            url: "https://api.vk.com/method/wall.get",
            data: {
            owner_id: id_user,
            filter: "owner",
            v: "5.26",
            extended: 1,
            },
            dataType: "jsonp",    
            success: gotData,
        });
    }
});

//
function gotData(data){   
    if(!data || !data.response || !data.response.items) {
        console.error( "VK returned some crap:", data);
        return;
    }
    var html ="";
    for(var i=0; i<data.response.items.length; i++) {
        var post = data.response.items[i];
        console.log(post.copy_history);
        if(!post.copy_history){
            html += '<div class="post_wrapper"><div class="post">'+data.response.profiles[0].first_name+' '+data.response.profiles[0].last_name+'<br>'+ post.text+'</div></div>';
        }else{
            html += '<div class="post_wrapper"><div class="post">'+data.response.profiles[0].first_name+' '+data.response.profiles[0].last_name+'<br>'+'</div></div>';
        }
        
    }
    $('#vk').html(html);
}

/*
// widget api wall
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//vk.com/js/api/openapi.js?139";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'vk_openapi_js')); 
(function(){
    if (!window.VK || !VK.Widgets || !VK.Widgets.Post || !VK.Widgets.Post("vk_post_208262993_81", 208262993, 81, 'mkn6q_pc8bxoSt_v1RhxtyiX_g_v', {width: 665})) setTimeout(arguments.callee, 50); 
}());
*/