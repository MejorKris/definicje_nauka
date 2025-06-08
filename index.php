<?php
$definitions = [
    "fopen()" => "Umożliwia otwieranie pliku. Przyjmuje dwa parametry - nazwę pliku i deklrację trybu otwierania, określającego sposób używania pliku",
    "feof()" => "Sprawdza, czy osiągnięto koniec pliku (EOF). Funkcja feof() jest przydatna do zapętlania danych o nieznanej długości",
    "fread()" => "Czyta z otwartego pliku. Pierwszy parametr zawiera nazwę pliku do odczytania, a drugi określa maksymalną liczbę bajtów do odczytania",
    "freadfile()" => "Powoduje otwarcie pliku, wyświetlenie jego zawartości i zamknięcie pliku.",
    "fwrite() i fputs()" => "Umożliwiają zapisywanie danych w pliuku. Obie funkcje przyjmują dwa parametry (opcjonalnie trzy) - zmienną wskazującą plik, do którego zostaną zapisane informacje, maksymalną liczbę bajtów do zapisania, np. ",
    "fclose()" => "Służy do zamykania otwartego pliku. Dobrą praktyką programowania jest zamykanie wszystkich plików po ich zakończeniu. Nie chcemy, aby otwarty plik działał na serwerze, zabierając zasoby. Funkcja fclose() wymaga nazwy pliku (lub zmiennej przechowującej nazwę pliku), którą chcemy zamknąć. Funkcja zwraca wartość TRUE, jeżeli plik został zamknięty, lub FALSE w innym przypadku"
];

$result = "";
$term = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["new"])) {
        // Nowe wyrażenie
        $term = array_rand($definitions);
    } else {
        // Sprawdzenie odpowiedzi
        $term = $_POST["term"] ?? '';
        $userDef = strtolower(trim($_POST["definition"] ?? ''));
        $correctDef = $definitions[$term] ?? '';
        $correct = strtolower($correctDef);

        if ($correct) {
            similar_text($userDef, $correct, $percent);
            if ($percent >= 70) {
                $result = "✅ Poprawna odpowiedź!";
            } else {
                $result = "❌ Błąd. Prawidłowa definicja: <em>$correctDef</em>";
            }
        } else {
            $result = "⚠️ Błąd: brak definicji.";
        }
    }
} else {
    // Pierwsze wejście
    $term = array_rand($definitions);
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Nauka definicji</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Podaj definicję:</h1>
    <form method="POST">
      <p><strong>Wyrażenie:</strong> <input type="text" name="term" value="<?= htmlspecialchars($term) ?>" readonly></p>
      <textarea name="definition" placeholder="Wpisz definicję..." required></textarea>
      <button type="submit">Sprawdź</button>
    </form>

    <form method="POST">
      <input type="hidden" name="new" value="1">
      <button type="submit">🔄 Nowe wyrażenie</button>
    </form>

    <p class="result"><?= $result ?></p>
  </div>
</body>
</html>
