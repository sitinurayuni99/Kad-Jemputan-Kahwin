<?php
$connection = mysqli_connect("127.0.0.1:3306", "root", "", "kad_kahwin");
$hadir = 0;
$tak_hadir = 0;

if ($connection) {
    $result = mysqli_query($connection, "SELECT * FROM kehadiran WHERE id = 1");
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $hadir = $row['jumlah_kehadiran'];
        $tak_hadir = $row['jumlah_tidak_hadir'];
    }
    mysqli_close($connection);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ayuni & Azim - Kehadiran</title>
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <div class="wrapper">
    <h1>Majlis Perkahwinan Ayuni & Azim</h1>
    <h2>Konfirmasi Kehadiran</h2>

    <div class="kehadiran-section">
      <button id="btn-hadir">✅ Saya Hadir</button>
      <button id="btn-tidak-hadir">❌ Tidak Hadir</button>
      <br><br>
      <p><strong>Jumlah Hadir:</strong> <?php echo $hadir; ?></p>
      <p><strong>Jumlah Tidak Hadir:</strong> <?php echo $tak_hadir; ?></p>
    </div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("btn-hadir").addEventListener("click", function () {
        fetch("count-hadir.php", { method: "POST" }).then(() => location.reload());
      });

      document.getElementById("btn-tidak-hadir").addEventListener("click", function () {
        fetch("count-tidak-hadir.php", { method: "POST" }).then(() => location.reload());
      });
    });
  </script>
</body>
</html>
