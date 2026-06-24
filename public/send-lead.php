<?php
header('Content-Type: application/json; charset=utf-8');

$logFile = __DIR__ . '/leads.log';

// Логируем каждое обращение к скрипту — в том числе неправильные методы
file_put_contents($logFile,
    date('Y-m-d H:i:s') . " | METHOD=" . $_SERVER['REQUEST_METHOD'] . " | URI=" . ($_SERVER['REQUEST_URI'] ?? '') . "\n",
    FILE_APPEND | LOCK_EX
);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Email-адреса партнёров (ключ — company.id из companies.js)
$partnerEmails = [
    'kuhni-shik'   => 'Nickwood47@yandex.ru',
    'kafel-emarti' => '', // email не получен — партнёр временно не отправляет заявки
    'shatura'      => 'neirobanya@mail.ru',
    'sibmebel'     => 'krassibmebel@gmail.com',
];

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
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

file_put_contents($logFile,
    date('Y-m-d H:i:s') . " | PARSED | companyId={$companyId} | name={$name} | phone={$phone} | raw=" . substr($raw, 0, 200) . "\n",
    FILE_APPEND | LOCK_EX
);

if (!$companyId || !array_key_exists($companyId, $partnerEmails) || !$name || !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request', 'companyId' => $companyId, 'name' => $name, 'phone' => $phone]);
    exit;
}

$toEmail = $partnerEmails[$companyId];

if (!$toEmail) {
    file_put_contents($logFile,
        date('Y-m-d H:i:s') . " | SKIP (no email) | companyId={$companyId}\n",
        FILE_APPEND | LOCK_EX
    );
    echo json_encode(['ok' => true, 'sent' => false, 'reason' => 'no_email']);
    exit;
}

$date = date('d.m.Y H:i');

$subjectText = "Новый клиент — {$companyName} | Гид Новосёла";
$subject     = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$body  = "Новый клиент с сайта gidnovosela.ru\n\n";
$body .= "Компания:  {$companyName}\n";
$body .= "Подарок:   {$giftLabel}\n";
$body .= "Заявка:    {$requestType}\n";
$body .= "Дата:      {$date}\n\n";
$body .= "--- Контакт ---\n";
$body .= "Имя:       {$name}\n";
$body .= "Телефон:   {$phone}\n";
$body .= "Адрес/ЖК:  {$address}\n";

$fromEmail = 'no-reply@gidnovosela.ru';
$headers   = "From: =?UTF-8?B?" . base64_encode("Гид Новосёла") . "?= <{$fromEmail}>\r\n";
$headers  .= "Reply-To: {$fromEmail}\r\n";
$headers  .= "MIME-Version: 1.0\r\n";
$headers  .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers  .= "X-Mailer: PHP/" . phpversion();

$sent = mail($toEmail, $subject, $body, $headers, "-f{$fromEmail}");

file_put_contents($logFile,
    date('Y-m-d H:i:s') . " | MAIL sent={$sent} | to={$toEmail} | company={$companyId} | name={$name} | phone={$phone}\n",
    FILE_APPEND | LOCK_EX
);

if ($sent) {
    echo json_encode(['ok' => true, 'sent' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'mail() returned false', 'to' => $toEmail]);
}
