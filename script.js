// Currency Exchange Calculator
function convertToKRW() {
    const usdRate = parseFloat(document.getElementById("usd-rate").textContent);
    const usdAmount = parseFloat(document.getElementById("usd-amount").value);

    if (!usdAmount || usdAmount <= 0) {
        alert("Please enter a valid USD amount.");
        return;
    }

    const krwResult = (usdRate * usdAmount).toFixed(2);
    document.getElementById("krw-result").textContent = krwResult;
}

// Percentage Calculator
function calculatePercentage() {
    const totalAmount = parseFloat(document.getElementById("total-amount").value);
    const percentage = parseFloat(document.getElementById("percentage").value);

    if (!totalAmount || totalAmount <= 0 || !percentage || percentage <= 0) {
        alert("Please enter valid amounts.");
        return;
    }

    const result = ((totalAmount * percentage) / 100).toFixed(2);
    document.getElementById("percentage-result").textContent = result;
}

// Basic Calculator
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

    if (!display || !buttonContainer) {
        console.error("Calculator display or buttons container not found.");
        return;
    }

    buttons.forEach((btn) => {
        const button = document.createElement("button");
        button.textContent = btn;
        button.addEventListener("click", () => handleCalcInput(btn));
        buttonContainer.appendChild(button);
    });

    function handleCalcInput(input) {
        if (input === "C") {
            display.value = ""; // Clear display
        } else if (input === "<") {
            display.value = display.value.slice(0, -1); // Remove last character
        } else if (input === "=") {
            calculateResult(); // Calculate result
        } else {
            display.value += input; // Append input
        }
    }

    function calculateResult() {
        try {
            display.value = eval(display.value) || "0"; // Calculate and prevent empty result
        } catch {
            display.value = "Error"; // Handle errors
        }
    }
}

// Futures Profit Calculator
function calculateProfit() {
    const investment = parseFloat(document.getElementById("investment").value);
    const leverage = parseFloat(document.getElementById("leverage").value);

    if (!investment || investment <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    const stopLossPercent = 0.01; // 1% risk
    const takeProfitPercent = stopLossPercent * 2; // 2% reward
    const feePercent = 0.0004; // Example fee percentage (e.g., 0.04%)

    const stopLoss = investment * (1 - stopLossPercent);
    const takeProfit = investment * (1 + takeProfitPercent);
    const fee = investment * leverage * feePercent;

    document.getElementById("profit-result").textContent = takeProfit.toFixed(2);
    document.getElementById("loss-result").textContent = stopLoss.toFixed(2);
    document.getElementById("fee-result").textContent = fee.toFixed(2);
}

// Risk Management (Futures Trading)
function calculate() {
    const entryPrice = parseFloat(document.getElementById("entryPrice").value);
    const positionType = document.getElementById("positionType").value;

    if (!entryPrice || entryPrice <= 0) {
        alert("Please enter a valid entry price.");
        return;
    }

    const riskPerTrade = 25; // Fixed risk amount in USDT
    const leverage = 100; // Leverage
    const stopLossPercent = 0.01; // 1% SL distance
    const takeProfitPercent = stopLossPercent * 2; // 2% TP distance

    let stopLoss, takeProfit;

    if (positionType === "Long") {
        stopLoss = entryPrice - (entryPrice * stopLossPercent);
        takeProfit = entryPrice + (entryPrice * takeProfitPercent);
    } else if (positionType === "Short") {
        stopLoss = entryPrice + (entryPrice * stopLossPercent);
        takeProfit = entryPrice - (entryPrice * takeProfitPercent);
    }

    document.getElementById("result").innerHTML = `
        <h2>Calculation Results</h2>
        <p><strong>Entry Price:</strong> $${entryPrice.toFixed(2)}</p>
        <p><strong>Stop-Loss (SL):</strong> $${stopLoss.toFixed(2)}</p>
        <p><strong>Take-Profit (TP):</strong> $${takeProfit.toFixed(2)}</p>
        <p><strong>Leverage:</strong> 100×</p>
        <p><strong>Risk per Trade:</strong> $25</p>
    `;
}

// Initialize Basic Calculator
initializeCalculator();
