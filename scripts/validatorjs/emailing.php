<?php
    function sendTicketEmail($to, $subject, $message) {
        // Set additional headers
        //$to = "samsonkumenisande@gmail.com";
        //$subject = "Test email";
        //$message = "<p>Hello worlds!<p>";

        //$headers = "MIME-Version: 1.0" . "\r\n";
        /*$headers = "Content-type:text/html;charset=UTF-8" . "\r\n";

        // More headers
        $headers .= 'From: Matmax Enterprises Website <info@example.com>' .'\r\n';
        $headers .= 'Reply-To: info@matmax.co.ke\r\n';
        $headers .= 'Bcc: samsonkumenisande@gmail.com' . "\r\n";*/
        $headers[] = "Content-type:text/html;charset=UTF-8";

        // More headers
        $headers[] = 'From: Sir Neil <tickets@sirneil.com>';
        $headers[] = 'Reply-To: tickets@sirneil.com';
        $headers[] = 'Bcc: tickets@sirneil.com';

        // SMTP server settings
        $smtpServer = 'ssl://mail.sirneil.com';
        $smtpPort = 465;
        $smtpUsername = 'tickets@sirneil.com';
        $smtpPassword = 'SirNeil.';

        $currentTimestamp = time();
        $bodyHash = base64_encode(hash('sha256', $message, true));

        // Concatenate the fields
        $concatenatedFields = 'tickets@sirneil.com' . ':' . $to . ':' . $subject;

        // Hash the concatenated string using SHA-256
        $hash = hash('sha256', $concatenatedFields, true);

        // Encode the hash as base64
        $base64Hash = base64_encode($hash);

        $dkimSignature = "DKIM-Signature: v=1; a=rsa-sha256; d=sirneil.com; s=default._domainkey.sirneil.com;c=relaxed/relaxed; q=dns/txt; t=" . $currentTimestamp ."; x= ". $currentTimestamp + 3600 .";h=from:to:subject:date:keywords:keywords;bh=". $bodyHash .";b=" . $base64Hash;

        $headers[] = $dkimSignature;
         
        //ini_set("sendmail_from", "tickets@sirneil.com");
        //ini_set("sendmail_path", "/usr/sbin/sendmail -t -i -f tickets@sirneil.com -S mail.sirneil.com:465 -X '/usr/sbin/sendmail -t -i'");
        var_dump(mail($to,$subject,$message,implode("\r\n", $headers)));
        //var_dump(mail($to,$subject,$message,implode("\r\n", $headers), "-f$from", "-r$from", "-oi", "-f$from -S $smtpServer:$smtpPort -X 'ssl://$smtpServer:$smtpPort' -au$smtpUsername -ap$smtpPassword"));
    }

    //<!DOCTYPE html>
    $message = "
                <html lang='en'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                        <title>Confirmation: Your Ticket Payment has been Processed</title>
                    </head>
                    <body>
                        <p>Hi,</p>
                        <p>We are pleased to inform you that your ticket payment has been successfully confirmed and processed.</p>
                        <p>Your ticket(s) are now available for download. You can access and download your ticket(s) by visiting the following link: <a href='https://sirneil.com/my-tickets.php'>My tickets</a></p>
                        <p>If you have any questions or need further assistance, please don\'t hesitate to <a href='mailto:tickets@sirneil.com'>contact us</a>. We\'re here to help!</p>
                        <p>Thank you for choosing Sir Neil. We look forward to seeing you at the event!</p>

                        <p>Sir Neil</p>
                        <a href='tel:254728392727'>+254728392727</a>
                    </body>
                </html>";
    $message = ">p>Hi</p>";
    $to = "samsonkumenisande@gmail.com";
    $subject = "Test Email 2";
    sendTicketEmail($to, $subject, $message);
?>