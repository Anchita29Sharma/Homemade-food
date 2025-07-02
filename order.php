<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and collect form data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $order = htmlspecialchars(trim($_POST["order"]));

    // Destination email address
    $to = "anchitasharma24@gmail.com"; // ✅ Your email address to receive orders

    // Email subject and body
    $subject = "New Food Order from Website";
    $message = "You received a new order:\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Order Details:\n$order\n";

    // Email headers
    $headers = "From: no-reply@homemadefood.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "<h2>Thank you! Your order has been sent successfully.</h2>";
    } else {
        echo "<h2>Oops! There was a problem sending your order. Please try again later.</h2>";
    }
} else {
    // Prevent direct access
    header("Location: index.html");
    exit();
}
?>
