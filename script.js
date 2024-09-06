const display = document.querySelector("#display");
const resultDisplay = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

// Check if the last character is an operator
const isLastCharOperator = (expression) => {
    const lastChar = expression[expression.length - 1];
    return ['+', '-', '*', '/'].includes(lastChar);
}

// Update the result display in real-time
function updateResult() {
    try {
        const expression = display.innerText;
        if (expression && !isLastCharOperator(expression)) {
            resultDisplay.innerText = eval(expression);  // Dynamically evaluate and display the result
        } else {
            resultDisplay.innerText = "";  // Do not display a result if the expression is invalid
        }
    } catch (error) {
        resultDisplay.innerText = "Error";  // In case of evaluation error, show Error
    }
}

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
      resultDisplay.innerText = "";  // Clear the result as well
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
      updateResult();  // Update the result after deleting
    } else if (item.id == "equal") {
      const expression = display.innerText;
      if (expression && !isLastCharOperator(expression)) {
        // Only evaluate if the expression is not empty and does not end with an operator
        display.innerText = eval(expression);
        resultDisplay.innerText = "";  // Clear real-time result when final result is shown
      } else {
        display.innerText = "Invalid!";
        setTimeout(() => (display.innerText = ""), 2000);  // Clear the invalid message after 2 seconds
      }
    } else if (item.id == "+" || item.id == "-" || item.id == "*" || item.id == "/") {
      const expression = display.innerText;
      if (expression && !isLastCharOperator(expression)) {
        display.innerText += item.id;  // Add operator only if it's not repeating
      }
    } else {
      display.innerText += item.id;
      updateResult();  // Update result after every button press
    }
  };
});