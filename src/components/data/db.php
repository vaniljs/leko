<?php
require 'rb.php';
R::setup( 'mysql:host=localhost;dbname=mdnnedvi_game-of-throne','mdnnedvi_game-of-throne', '0801396252kK' );

if ( !R::testconnection() )
{
		exit ('Нет соединения с базой данных');
}

session_start();