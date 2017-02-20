<?
//ID APP
$client_id = '';  
//SECRET KEY
$client_secret = '';  
$my_url = $_SERVER['SERVER_NAME'];
session_start();
$code = $_REQUEST["code"];
if (empty($code)) {
	$dialog_url ='https://oauth.vk.com/authorize?client_id='.$client_id.'&display=page&redirect_uri='.$my_url.'&scope=wall&response_type=code&v=5.62';
	echo("<script> top.location.href='" . $dialog_url . "'</script>");
    
}else{
	$params = array(
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $code,
        'redirect_uri' => $my_url
    );
    $ch = curl_init();
	$url = 'https://oauth.vk.com/access_token' . '?' . urldecode(http_build_query($params));
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0);
	echo curl_error($ch);
	$result = curl_exec($ch);
	curl_close($ch);
	//echo var_dump($result);
	$result = json_decode($result, true);
	//$access_token = $result['access_token'];
	//$main_user = $result['user_id'];
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>vkWall</title>
	<script src="https://vk.com/js/api/openapi.js?139"></script>
	<link href="https://yastatic.net/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"/>
	<link rel="stylesheet" href="style/style.css">
</head>
<body>
	<script src="js/init.js"></script>
	<div id="wrapper">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-3">
					<div id="auth_wrapper">
						<div id="vk_auth"></div>
					</div>
				</div>
  				<div class="col-xs-12 col-sm-12 col-md-8">
					<div id="wall_wrapper">
						<div id="write_wrapper">
							<div class="post_wrapper">
								<textarea class="form-control" rows="3" placeholder="Что у вас нового?"></textarea>
								<button type="button" class="btn btn-default" onclick="add_post()">Send post</button>
							</div>
						</div>
						<div id="posting"></div>
					</div>
  				</div>
			</div>
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="js/wall.js"></script>
</body>
</html>
