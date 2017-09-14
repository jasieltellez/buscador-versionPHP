<?php
$oper=$_GET['oper'];
$ciudad=$_GET['city'];
$tipo=$_GET['type'];
$min=$_GET['min'];
$max=$_GET['max'];
$path ='storage/data-1.json';

switch ($oper) {
  case 'ofertas':
  # code...
  echo GetAllOfferts();
  break;
  case 'ciudades':
  echo GetAllCities();
  break;
  case 'tipos':
  # code...
  echo GetAllTypes();
  break;
  case 'personalizada':
  # code...
  echo json_encode(GetCustom());
  break;

  default:
  # code...
  echo 'no se encontro la operacion'.$ciudad."-".$tipo."-".$min."-".$max;
  break;
}
//Funciones necesarias para trabajar con el fichero Json
function GetAllOfferts(){
//$fichero=fopen($GLOBALS['path'],'r');
//$lectStr=fread($fichero,filesize($GLOBALS['path']));
$data = file_get_contents($GLOBALS['path']);
return $data;
}

function GetAllCities(){
$data = file_get_contents($GLOBALS['path']);
$inmuebles = json_decode($data);
$cities=[];
foreach ($inmuebles as $key => $json) {
  $cities[]=$json->Ciudad;
}
$cities=array_unique($cities);
$ciudadesOpt="<option value=\"All\" selected>Elige una ciudad</option>";
foreach ($cities as $key => $city) {
  $ciudadesOpt.="<option  value=\"$city\">$city</option>";
}
return $ciudadesOpt;
}



function GetCustom(){
  $seleccionados=[];
$data = file_get_contents($GLOBALS['path']);
$inmuebles = json_decode($data);
for ($i=0; $i < count($inmuebles) ; $i++) {
$precioImueble=(substr($inmuebles[$i]->Precio,1));
$precioImueble=(float)str_replace(',', '', $precioImueble);

  if (($inmuebles[$i]->Ciudad!=$GLOBALS['ciudad'])&&($GLOBALS['ciudad']!="All")) {

  }
  elseif (($inmuebles[$i]->Tipo!=$GLOBALS['tipo'])&&($GLOBALS['tipo']!="All")) {

  }
  elseif (($precioImueble<(float)$GLOBALS['min'])||($precioImueble>(float)$GLOBALS['max'])) {

  }
  else {
    array_push($seleccionados,$inmuebles[$i]);
  }
}

return $seleccionados;
}

function GetAllTypes(){
$data = file_get_contents($GLOBALS['path']);
$inmuebles = json_decode($data);
$types=[];
foreach ($inmuebles as $key => $json) {
  $types[]=$json->Tipo;
}
$types=array_unique($types);
$typesOpt="<option value=\"All\" selected>Elige un tipo</option>";
foreach ($types as $key => $type) {
  $typesOpt.="<option  value=\"$type\">$type</option>";
}
return $typesOpt;
}

?>
