<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	error_reporting(E_ALL ^ E_NOTICE); // hide all basic notices from PHP

	if(isset($_POST['submitted'])) {

		if (!isset($_POST['name']) && !isset($_POST['phone'])) {
			header('HTTP/1.1 400 Bad Request', true, 400);
			exit;
		}

		// require a name from user
		$name = trim($_POST['name']);
		$phone = trim($_POST['phone']);
		$email = trim($_POST['email']);


		if (($phone === '')) {
			header('HTTP/1.1 400 Bad Request', true, 400);
			exit;
		}

		if (($email === '')) {
			header('HTTP/1.1 400 Bad Request', true, 400);
			exit;
		}


		// we need at least some content
		if(isset($_POST['comment']) && trim($_POST['comment']) !== '') {
			if(function_exists('stripslashes')) {
				$comment = stripslashes(trim($_POST['comment']));
			} else {
				$comment = trim($_POST['comments']);
			}
		}

		if (isset($_POST['model'])) {
			if(!(trim($_POST['model']) === '')) {
				$model = trim($_POST['model']);
			}
		}

		// upon no failure errors let's email now!

		// $emailTo = 'mikhail.vnukov@gmail.com';
		$emailTo = 'pos904@mail.ru'; 
		// $emailTo = '.ru';
		$subject = 'Новая заявка: '.$name;
		$body = "Имя: $name \r\nТелефон: $phone\r\nпочта: $email\r\n";

		if (isset($comment)) {
			$body .= "\r\nКомментарий: $comment";
		}

		if (isset($model)) {
			$body .= "\r\nМодель: $model";
		}


		$headers = 'From: <admin@piter-drive.com>' . "\r\n" . 
			'Reply-To: ' . $email . "\r\n" . 
			"MIME-Version: 1.0" . "\r\n" .
			"Content-type: text/plain; charset=UTF-8" . "\r\n";

		mail($emailTo, $subject, $body, $headers);

		echo error_get_last();

		echo $emailTo."</br>";
		echo $subject."</br>";
		echo $body."</br>";
		echo $headers."</br>";
	}
?>