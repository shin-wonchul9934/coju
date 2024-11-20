function calculate() {
    // Retrieve inputs
    const entryPrice = parseFloat(document.getElementById("entryPrice").value);
    const positionType = document.getElementById("positionType").value;
  
    // Validate entry price
    if (!entryPrice || entryPrice <= 0) {
      alert("Please enter a valid entry price.");
      return;
    }
  
    // Constants
    const riskPerTrade = 25; // Fixed risk amount in USDT
    const leverage = 100; // Leverage percentage
    const stopLossPercent = 0.01; // 1% SL distance
    const takeProfitPercent = stopLossPercent * 2; // 2% TP distance for 1:2 R:R ratio
  
    // Variables for calculated results
    let stopLoss, takeProfit;
  
    // Calculate SL and TP based on position type
    if (positionType === "long") {
      stopLoss = entryPrice - (entryPrice * stopLossPercent);
      takeProfit = entryPrice + (entryPrice * takeProfitPercent);
    } else if (positionType === "short") {
      stopLoss = entryPrice + (entryPrice * stopLossPercent);
      takeProfit = entryPrice - (entryPrice * takeProfitPercent);
    }
  
    // Update the UI with results
    document.getElementById("result").innerHTML = `
      <h2>Calculation Results</h2>
      <p><strong>Entry Price:</strong> $${entryPrice.toFixed(2)}</p>
      <p><strong>Stop-Loss (SL):</strong> $${stopLoss.toFixed(2)}</p>
      <p><strong>Take-Profit (TP):</strong> $${takeProfit.toFixed(2)}</p>
      <p><strong>Leverage:</strong> 100×</p>
      <p><strong>Risk per Trade:</strong> $25</p>
    `;
  }
  