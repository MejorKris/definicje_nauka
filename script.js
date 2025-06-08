
const definitions = {
    "fopen()": "Umożliwia otwieranie pliku. Przyjmuje dwa parametry - nazwę pliku i deklrację trybu otwierania, określającego sposób używania pliku",
    "feof()": "Sprawdza, czy osiągnięto koniec pliku (EOF). Funkcja feof() jest przydatna do zapętlania danych o nieznanej długości",
    "fread()": "Czyta z otwartego pliku. Pierwszy parametr zawiera nazwę pliku do odczytania, a drugi określa maksymalną liczbę bajtów do odczytania",
    "freadfile()": "Powoduje otwarcie pliku, wyświetlenie jego zawartości i zamknięcie pliku.",
    "fwrite() i fputs()": "Umożliwiają zapisywanie danych w pliuku. Obie funkcje przyjmują dwa parametry (opcjonalnie trzy) - zmienną wskazującą plik, do którego zostaną zapisane informacje, maksymalną liczbę bajtów do zapisania, np. ",
    "fclose()": "Służy do zamykania otwartego pliku. Dobrą praktyką programowania jest zamykanie wszystkich plików po ich zakończeniu. Nie chcemy, aby otwarty plik działał na serwerze, zabierając zasoby. Funkcja fclose() wymaga nazwy pliku (lub zmiennej przechowującej nazwę pliku), którą chcemy zamknąć. Funkcja zwraca wartość TRUE, jeżeli plik został zamknięty, lub FALSE w innym przypadku"
};

let currentTerm = "";

function newTerm() {
  const terms = Object.keys(definitions);
  const randomIndex = Math.floor(Math.random() * terms.length);
  currentTerm = terms[randomIndex];
  document.getElementById("term").textContent = currentTerm;
  document.getElementById("definition").value = "";
  document.getElementById("result").textContent = "";
}

function checkDefinition() {
  const userDef = document.getElementById("definition").value.trim().toLowerCase();
  const correctDef = definitions[currentTerm].toLowerCase();

  const similarity = stringSimilarity(userDef, correctDef);

  if (similarity >= 0.7) {
    document.getElementById("result").innerHTML = "✅ Poprawna odpowiedź!";
  } else {
    document.getElementById("result").innerHTML =
      `❌ Błędna odpowiedź. Poprawna definicja: <em>${definitions[currentTerm]}</em>`;
  }
}

// Prosta funkcja porównująca podobieństwo dwóch tekstów (bazuje na wspólnych znakach)
function stringSimilarity(a, b) {
  let matches = 0;
  const minLen = Math.min(a.length, b.length);

  for (let i = 0; i < minLen; i++) {
    if (a[i] === b[i]) matches++;
  }

  return matches / Math.max(a.length, b.length);
}

// Startujemy od pierwszego wyrażenia
newTerm();
