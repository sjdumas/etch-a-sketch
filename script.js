const customSquaresButton = document.querySelector(".btn");
const clearButton = document.querySelector(".clear-btn");
const gridContainer = document.querySelector(".container");
let numOfSquares = 16;

const generateRandomRGBColors = () => {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	return `rgb(${red}, ${green}, ${blue})`;
};

const createGameGrid = () => {
	gridContainer.innerHTML = ""; // Clear the existing grid

	const containerWidth = gridContainer.clientWidth;
	const squareSize = containerWidth / numOfSquares;

	for (let i = 0; i < numOfSquares * numOfSquares; i++) {
		const squareDiv = document.createElement("div");
		squareDiv.className = "square";
		squareDiv.style.width = `${squareSize}px`;
		squareDiv.style.height = `${squareSize}px`;

		// Add the hover effect for desktop
		squareDiv.addEventListener("mouseover", () => {
			squareDiv.style.backgroundColor = generateRandomRGBColors();
		});

		// Add the hover effect for mobile devices
		squareDiv.addEventListener(
			"touchstart",
			() => {
				squareDiv.style.backgroundColor = generateRandomRGBColors();
			},
			{ passive: true }
		);

		gridContainer.appendChild(squareDiv);
	}
};

const clearGrid = () => {
	const gridSquares = document.querySelectorAll(".square");

	gridSquares.forEach((square) => {
		square.style.backgroundColor = "";
	});
};

customSquaresButton.addEventListener("click", () => {
	let userInput = parseInt(
		prompt("How many squares per side do you want for the new grid?", "")
	);

	if (userInput < 16 || userInput > 100) {
		alert(
			"You picked a number less than 16 or more than 100. Please try again."
		);
	} else if (isNaN(userInput) || userInput === "") {
		alert("Please enter a number between 16 and 100");
	} else {
		numOfSquares = userInput;
		createGameGrid();
	}
});

clearButton.addEventListener("click", clearGrid);

createGameGrid();
