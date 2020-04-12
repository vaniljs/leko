<?php
require 'db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$param = json_decode($_REQUEST["param"]);

if ($param->get) {
    $person = R::getAll( 'SELECT * FROM person' );
    $json = json_encode($person, JSON_UNESCAPED_UNICODE);
    echo $json;
}
if ($param->add) {
    $add_item = R::dispense('person');
    $add_item->name = $param->add->name;
    $add_item->description = $param->add->description;
    $add_item->reason_murder = $param->add->reason_murder;
    $add_item->killer = $param->add->killer;
    $add_item->weapon = $param->add->weapon;
    R::store($add_item);
    $person = R::getAll( 'SELECT * FROM person' );
    $json = json_encode($person, JSON_UNESCAPED_UNICODE);
    echo $json;
}
if ($param->del) {
    $del_item = R::load('person', $param->del->id);
    R::trash($del_item);
    $person = R::getAll( 'SELECT * FROM person' );
    $json = json_encode($person, JSON_UNESCAPED_UNICODE);
    echo $json;
}




?>