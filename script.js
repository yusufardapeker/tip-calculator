const billAmountInput = document.querySelector(".bill-amount-input");
const selectBillButtons = document.querySelectorAll("button.bill-select-button");
const customSelectBillButton = document.querySelector(".custom");
const billPeopleInput = document.querySelector(".bill-people-number-input");
const errorMessages = document.querySelectorAll(".error-msg");

const tipResultAmount = document.querySelector(".tip-result-number.amount");
const tipResultTotal = document.querySelector(".tip-result-number.total");

const resetBtn = document.querySelector(".reset-btn");

const billAmountHandler = () => {
	let billAmount = 0;

	return {
		setBillAmount: (amount) => (billAmount = amount),
		getBillAmount: () => billAmount,
	};
};

const peopleHandler = () => {
	let peopleCount = 0;

	return {
		setPeopleCount: (count) => (peopleCount = count),
		getPeopleCount: () => peopleCount,
	};
};

const buttonRateHandler = () => {
	let buttonRate = 15;

	return {
		setButtonRate: (rate) => (buttonRate = rate),
		getButtonRate: () => buttonRate,
	};
};

const buttonRate = buttonRateHandler();
const peopleCount = peopleHandler();
const billAmount = billAmountHandler();

const switchSelectedButton = (button, array) => {
	array.forEach((buttons) => buttons.classList.remove("selected"));
	button.classList.add("selected");
};

const checkValidation = (input) => {
	if (parseInt(input.value) > 0 && input.value !== "") {
		input.classList.remove("error");
		return true;
	} else {
		input.classList.add("error");
		return false;
	}
};

const handleCustomButton = (e) => {
	selectBillButtons.forEach((button) => button.classList.remove("selected"));

	const isValid = checkValidation(e.target);

	if (isValid) {
		buttonRate.setButtonRate(parseInt(e.target.value));
		calculate();
	}
};

const handleButtons = (button, index, array) => {
	button.addEventListener("click", () => {
		switchSelectedButton(button, array);
		customSelectBillButton.classList.remove("error");
		customSelectBillButton.value = "";

		buttonRate.setButtonRate(parseInt(button.textContent));
		calculate();
	});
};

const handleBillAmount = (e) => {
	const isValid = checkValidation(billAmountInput);

	if (isValid) {
		billAmount.setBillAmount(parseInt(e.target.value));
		calculate();
	}
};

const handlePeople = (e) => {
	const isValid = checkValidation(billPeopleInput);

	if (isValid) {
		peopleCount.setPeopleCount(parseInt(e.target.value));
		calculate();
	}
};

const displayResult = (amountResult, total) => {
	tipResultAmount.textContent = amountResult;
	tipResultTotal.textContent = total;

	billAmountInput.disabled = true;
	billPeopleInput.disabled = true;
};

const calculate = () => {
	const rate = buttonRate.getButtonRate();
	const amount = billAmount.getBillAmount();
	const count = peopleCount.getPeopleCount();

	if (amount > 0 && count > 0) {
		const tipCost = (amount * rate) / 100;
		const amountResult = (tipCost / count).toFixed(2);
		const total = ((amount + tipCost) / count).toFixed(2);

		resetBtn.disabled = false;

		displayResult(amountResult, total);
	}
};

billPeopleInput.addEventListener("input", handlePeople);
billAmountInput.addEventListener("input", handleBillAmount);
customSelectBillButton.addEventListener("input", handleCustomButton);
selectBillButtons.forEach(handleButtons);

resetBtn.addEventListener("click", () => {
	selectBillButtons.forEach((button) => button.classList.remove("selected"));
	billAmountInput.value = "";
	customSelectBillButton.value = "";
	billPeopleInput.value = "";

	tipResultAmount.textContent = "$0.00";
	tipResultTotal.textContent = "$0.00";
	billAmount.setBillAmount(0);
	buttonRate.setButtonRate(15);
	peopleCount.setPeopleCount(0);
	billAmountInput.disabled = false;
	billPeopleInput.disabled = false;
	resetBtn.disabled = true;
});

calculate();
