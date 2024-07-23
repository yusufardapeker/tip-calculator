const billAmountInput = document.querySelector(".bill-amount-input");
const selectTipButtons = document.querySelectorAll(".bill-select-button");
const customSelectBillButton = document.querySelector(".custom");
const billPeopleInput = document.querySelector(".bill-people-number-input");
const errorMessages = document.querySelectorAll(".error-msg");

const tipResultAmount = document.querySelector(".tip-result-number.amount");
const tipResultTotal = document.querySelector(".tip-result-number.total");

const resetBtn = document.querySelector(".reset-btn");

const getSelectedRate = () => {
	selectTipButtons.forEach((button, index, array) => {
		button.addEventListener("click", (e) => {
			array.forEach((element) => element.classList.remove("selected"));
			e.target.classList.add("selected");

			let selectedButtonVal = parseInt(e.target.textContent);
			calculate(selectedButtonVal);

			if (array[5] === array[index]) {
				array[5].addEventListener("input", (e) => {
					selectedButtonVal = parseInt(e.target.value);

					calculate(selectedButtonVal);
				});
			}
		});
	});
};

getSelectedRate();

const inputs = [billAmountInput, billPeopleInput];

const calculate = (buttonRate = 15) => {
	inputs.forEach((input, index, array) => {
		input.addEventListener("input", () => {
			let amountVal = parseInt(array[0].value);
			let personVal = parseInt(array[1].value);

			isCorrect(amountVal, personVal);

			let tipCost = (amountVal * buttonRate) / 100;

			if (amountVal > 0 && personVal > 0) {
				tipResultAmount.textContent = (tipCost / personVal).toFixed(2);
				tipResultTotal.textContent = ((amountVal + tipCost) / personVal).toFixed(2);
				resetBtn.disabled = false;
			}
		});
	});
};

const isCorrect = (...args) => {
	const argumants = [...args];

	argumants.forEach((argumant, index) => {
		if (argumant === 0) {
			inputs[index].classList.add("error");
			errorMessages[index].style.display = "block";
		} else {
			inputs[index].classList.remove("error");
			errorMessages[index].style.display = "none";
		}
	});
};

resetBtn.addEventListener("click", () => {
	billAmountInput.value = "";
	selectTipButtons.forEach((button) => button.classList.remove("selected"));
	customSelectBillButton.value = "";
	billPeopleInput.value = "";
	tipResultAmount.textContent = "$0.00";
	tipResultTotal.textContent = "$0.00";
	resetBtn.disabled = true;
});

calculate();
