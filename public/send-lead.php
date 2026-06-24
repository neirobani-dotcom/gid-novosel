<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Email-адреса партнёров (ключ — company.id из companies.js)
$partnerEmails = [
    'kuhni-shik'   => 'Nickwood47@yandex.ru',
    'kafel-emarti' => '', // email не получен — партнёр временно не отправляет заявки
    'shatura'      => '89920130522@mail.ru',
    'sibmebel'     => 'krassibmebel@gmail.com',
];

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$companyId   = preg_replace('/[^a-z0-9\-]/', '', $data['companyId']   ?? '');
$companyName = strip_tags($data['companyName'] ?? '');
$giftLabel   = strip_tags($data['giftLabel']   ?? '');
$requestType = strip_tags($data['requestType'] ?? '');
$name        = strip_tags($data['name']        ?? '');
$phone       = strip_tags($data['phone']       ?? '');
$address     = strip_tags($data['address']     ?? '');

if (!$companyId || !array_key_exists($companyId, $partnerEmails) || !$name || !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$toEmail = $partnerEmails[$companyId];

// Email партнёра ещё не получен — заявка принята, письмо не отправляем
if (!$toEmail) {
    echo json_encode(['ok' => true]);
    exit;
}
$date    = date('d.m.Y H:i');

$subject = '=?UTF-8?B?' . base64_encode("Новый клиент — {$companyName} | Гид Новосёла") . '?=';

$body  = "Новый клиент с сайта gidnovosela.ru\n\n";
$body .= "Компания:  {$companyName}\n";
$body .= "Подарок:   {$giftLabel}\n";
$body .= "Заявка:    {$requestType}\n";
$body .= "Дата:      {$date}\n\n";
$body .= "--- Контакт ---\n";
$body .= "Имя:       {$name}\n";
$body .= "Телефон:   {$phone}\n";
$body .= "Адрес/ЖК:  {$address}\n";

$headers  = "From: noreply@gidnovosela.ru\r\n";
$headers .= "Reply-To: noreply@gidnovosela.ru\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($toEmail, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail failed']);
}
