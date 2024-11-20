function initializeCalculator() {
    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+",
        "C", "<"
    ];

    const display = document.getElementById("calc-display");
    const buttonContainer = document.getElementById("calc-buttons");

    // Ensure display and buttonContainer exist
    if (!display || !buttonContainer) {
        console.error("Missing calculator display or button container in HTML.");
        return;
    }

    // Create buttons
    buttons.forEach((btn) => {
        const button = document.createElement("button");
        button.textContent = btn;
        button.addEventListener("click", () => handleCalcInput(btn));
        buttonContainer.appendChild(button);
    });

    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            calculateResult();
        } else if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
            display.value += event.key;
        } else {
            event.preventDefault(); // Prevent invalid key actions
        }
    });

    // Handle button input
    function handleCalcInput(input) {
        if (input === "C") {
            display.value = ""; // Clear input
        } else if (input === "<") {
            display.value = display.value.slice(0, -1); // Remove last character
        } else if (input === "=") {
            calculateResult(); // Calculate result
        } else {
            display.value += input; // Append input
        }
    }

    // Calculate the result
    function calculateResult() {
        try {
            const result = eval(display.value); // Unsafe, but used here for simplicity
            display.value = result || "0"; // Default to 0 if result is falsy
        } catch (error) {
            display.value = "Error"; // Handle errors
        }
    }
}
