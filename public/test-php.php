<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'php'     => phpversion(),
    'time'    => date('Y-m-d H:i:s'),
    'server'  => $_SERVER['SERVER_NAME'] ?? 'unknown',
    'ok'      => true,
]);
