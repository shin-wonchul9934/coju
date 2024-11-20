// 일반 계산기 수정
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

    // 버튼 생성
    buttons.forEach((btn) => {
        const button = document.createElement("button");
        button.textContent = btn;
        button.addEventListener("click", () => handleCalcInput(btn));
        buttonContainer.appendChild(button);
    });

    // Enter 키로 결과 계산
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            calculateResult();
        } else if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
            display.value += event.key; // 숫자 및 연산자 추가
        }
    });

    function handleCalcInput(input) {
        if (input === "C") {
            display.value = ""; // 초기화
        } else if (input === "<") {
            display.value = display.value.slice(0, -1); // 마지막 문자 삭제
        } else if (input === "=") {
            calculateResult(); // 결과 계산
        } else {
            display.value += input; // 입력값 추가
        }
    }

    function calculateResult() {
        try {
            display.value = eval(display.value); // 계산 실행
        } catch {
            display.value = "오류"; // 에러 처리
        }
    }
}

function calculate() {
    const entryPrice = parseFloat(document.getElementById("entryPrice").value);
    const positionType = document.getElementById("positionType").value;
  
    if (!entryPrice || entryPrice <= 0) {
      alert("Please enter a valid entry price.");
      return;
    }
  
    const riskPerTrade = 25; // Fixed risk amount in USDT
    const leverage = 100; // Leverage percentage
    const stopLossPercent = 0.01; // 1% SL distance
    const takeProfitPercent = stopLossPercent * 2; // 2% TP distance for 1:2 R:R ratio
  
    let stopLoss, takeProfit;
  
    if (positionType === "long") {
      stopLoss = entryPrice - (entryPrice * stopLossPercent);
      takeProfit = entryPrice + (entryPrice * takeProfitPercent);
    } else if (positionType === "short") {
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
  

// 초기화
initializeCalculator();
