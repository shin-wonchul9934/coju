// 환율 계산
function convertToKRW() {
    const usdAmount = parseFloat(document.getElementById('usd-amount').value);
    const usdRate = 1350; // 최신 환율 직접 업데이트
    const krwResult = usdAmount * usdRate;
    document.getElementById('krw-result').textContent = krwResult.toFixed(2);
    addToHistory(`환율 계산: ${usdAmount} USD -> ${krwResult.toFixed(2)} KRW`);
}

// 퍼센트 계산
function calculatePercentage() {
    const totalAmount = parseFloat(document.getElementById('total-amount').value);
    const percentage = parseFloat(document.getElementById('percentage').value);
    const result = totalAmount * (percentage / 100);
    document.getElementById('percentage-result').textContent = result.toFixed(2);
    addToHistory(`퍼센트 계산: ${totalAmount}의 ${percentage}% = ${result}`);
}

// 목표 수익 계산
function calculateProfit() {
    const investment = parseFloat(document.getElementById('investment').value);
    const leverage = parseInt(document.getElementById('leverage').value);
    const profit = investment * leverage * 2; // 익절 2배
    const loss = investment * leverage * 1.5; // 손절 1.5배
    const fee = investment * 0.001; // 0.1% 수수료
    document.getElementById('profit-result').textContent = profit.toFixed(2);
    document.getElementById('loss-result').textContent = loss.toFixed(2);
    document.getElementById('fee-result').textContent = fee.toFixed(2);
    addToHistory(`수익 계산: 익절=${profit.toFixed(2)}, 손절=${loss.toFixed(2)}, 수수료=${fee.toFixed(2)}`);
}

// 일반 계산기
function initializeCalculator() {
    const buttons = [
        "7", "8", "9",
        "4", "5", "6",
        "1", "2", "3",
        "0", ".", "=",
        "C", "<", "+"
    ];

    const display = document.getElementById("calc-display");
    const buttonContainer = document.getElementById("calc-buttons");

    buttons.forEach((btn) => {
        const button = document.createElement("button");
        button.textContent = btn;
        button.addEventListener("click", () => handleCalcInput(btn));
        buttonContainer.appendChild(button);
    });

    function handleCalcInput(input) {
        if (input === "C") {
            display.value = ""; // 초기화
        } else if (input === "<") {
            display.value = display.value.slice(0, -1); // 마지막 문자 삭제
        } else if (input === "=") {
            try {
                display.value = eval(display.value); // 계산 실행
            } catch {
                display.value = "오류"; // 에러 처리
            }
        } else {
            display.value += input; // 입력값 추가
        }
    }
}

// 히스토리 추가
function addToHistory(message) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    historyList.appendChild(listItem);
}

// 초기화
initializeCalculator();
