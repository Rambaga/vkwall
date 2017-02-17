/*function gotData(data){    
    if(!data || !data.response || !data.response.items) {
        console.error( "VK returned some crap:", data);
        return;
    }
    var html ="";
    for(var i=0; i<data.response.items.length; i++) {
        var post = data.response.items[i];
        html += '<div class="post">'+data.response.profiles.first_name + post.text+'</div>';
    }
    $('#vk').html(html);
}

$.ajax({
    url: "https://api.vk.com/method/wall.get",
    data: {
        domain: "extrabow",
        filter: "owner",
        v: "5.26",
        extended: 1,
    },
    dataType: "jsonp",    
    success: gotData,
});*/

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