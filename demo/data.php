<?php

/**
Dummy paginated data generator
**/

$data = json_decode(file_get_contents("php://input"));

if (isset($data) && $data->action == 'add') {
	// add record here
	echo '{"response_code":"add success", "message":'.json_encode($data).'}';
} else if (isset($data) && $data->action == 'edit') {
	// edit record here
	echo '{"response_code":"edit success", "message":'.json_encode($data).'}';
} else if (isset($data) && $data->action == 'delete') {
	// delete record here
	echo '{"response_code":"delete success", "message":'.json_encode($data).'}';
} else {

	$rows = '';
	$page = 1;
	$n = 20;
	$start = 1;
	$end = $n;

	if (isset($_GET["page"]) && isset($_GET["rowperpage"])) {	
		$page = $_GET["page"];
		$rowperpage = $_GET["rowperpage"];
		$maxPage = ceil($n / $rowperpage);
		if ($page > $maxPage) {
			$start = 0;
			$end = -1;
		} else {
			$start = 1 + ($rowperpage * ($page-1));
			$end = $start + $rowperpage - 1;
			$end = ($end > $n) ? $n : $end;  		
		}
	}

	// replace with data retrieval procedure eg. select from db
	for ($i = $start; $i <= $end; $i++) {
		$rows = $rows . '{"id": "'.$i.'", "name": "Customer'.$i.'", "city": "bandung"}';
		$rows = ($i < $end) ? $rows.',' : $rows;
	}

	// return data in specific json map = {rows: data, total: count_data, page: page_number}
	$data = '
		{
			"rows":['.$rows.'],
			"total":'.$n.',
			"page":'.$page.'		
		}
	';
	echo $data;

}

?>