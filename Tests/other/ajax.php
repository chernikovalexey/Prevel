<?php
// Prevel Framework AJAX Tests

if($_SERVER['QUERY_STRING'] === 'json') {
    echo json_encode($_POST);
} else {
    echo 'Prevel Framework';
}

exit();