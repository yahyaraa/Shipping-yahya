document.addEventListener("DOMContentLoaded", function() {
  const countries = {
    local: ["Your Country"],
    africa: ["Tunisia", "Algeria", "Morocco", "Egypt", "Nigeria"],
    europe: ["France", "Germany", "Italy", "Spain", "UK"],
    asia: ["China", "India", "Japan", "South Korea", "Thailand"],
    america: ["USA", "Canada", "Brazil", "Mexico", "Argentina"]
  };

  const destinationSelect = document.getElementById("destination");
  const countrySelect = document.getElementById("countrySelect");
  const weightInput = document.getElementById("weight");
  const priceBox = document.getElementById("priceBox");
  const calculateBtn = document.getElementById("calculateBtn");

  destinationSelect.addEventListener("change", function() {
    countrySelect.innerHTML = '<option value="">Select a country</option>';
    const region = destinationSelect.value;
    if (countries[region]) {
      countries[region].forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        countrySelect.appendChild(option);
      });
    }
  });

  calculateBtn.addEventListener("click", function() {
    const weight = parseFloat(weightInput.value);
    const region = destinationSelect.value;
    const country = countrySelect.value;

    if (!weight || weight <= 0) {
      alert("Please enter a valid weight!");
      return;
    }

    if (!region || !countries[region]) {
      alert("Please select a valid region!");
      return;
    }

    const base = 5;
    const perKg = 2;
    const zone = { local:1, africa:1.3, europe:1.5, asia:1.7, america:2 };
    const total = ((base + weight * perKg) * zone[region]).toFixed(2);

    priceBox.style.display = "block";
    priceBox.innerHTML = `
      <strong>Total Price:</strong> $${total}<br>
      <strong>Region:</strong> ${region}<br>
      <strong>Country:</strong> ${country || "Not selected"}
    `;
  });
});