VK.init({
	apiId: 5879757
});
VK.Auth.getLoginStatus(function (response) {
	if(response.session){
		console.log(response.session.mid);
	}else{
		//change name site here
		window.location = "https://oauth.vk.com/authorize?client_id=5879757&display=page&redirect_uri=http://vkwall&scope=friends&response_type=code&v=5.62";
	}
});
VK.Widgets.Auth("vk_auth", {width: "200px", authUrl: '/'});