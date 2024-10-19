const customSquaresButton = document.querySelector(".btn");
const hoverEffectButton = document.querySelector(".hover-effect-btn");
const clearButton = document.querySelector(".clear-btn");
const gridContainer = document.querySelector(".container");
let numOfSquares = 16; // Default number of squares for larger screens
let hoverEffect = "multicolor"; // Default hover effect

const generateRandomRGBColors = () => {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	return `rgb(${red}, ${green}, ${blue})`;
};

const generateSingleColor = () => {
	return "#616161"; // Darker grey color
};

const adjustSquaresForScreenSize = () => {
	const screenWidth = window.innerWidth;
	if (screenWidth < 960) {
		// Adjust the number of squares to maintain an even grid for smaller screens
		numOfSquares = 8; // Set this to an even number of squares for mobile devices
	} else {
		numOfSquares = 16;
	}
	createGameGrid();
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

		// Add the hover effect for desktops/laptops
		squareDiv.addEventListener("mouseover", () => {
			if (hoverEffect === "multicolor") {
				squareDiv.style.backgroundColor = generateRandomRGBColors();
			} else {
				squareDiv.style.backgroundColor = generateSingleColor();
			}
		});

		// Add the hover effect for mobile devices
		squareDiv.addEventListener(
			"touchstart",
			() => {
				if (hoverEffect === "multicolor") {
					squareDiv.style.backgroundColor = generateRandomRGBColors();
				} else {
					squareDiv.style.backgroundColor = generateSingleColor();
				}
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

hoverEffectButton.addEventListener("click", () => {
	let choice = prompt(
		"Type either multicolor or single as an option.",
		""
	).toLowerCase();

	if (choice === "multicolor" || choice === "single") {
		hoverEffect = choice;
	} else {
		alert(
			"You didn't pick a valid choice. Please type multicolor or single."
		);
	}
});

customSquaresButton.addEventListener("click", () => {
	let userInput = parseInt(
		prompt("How many squares per side do you want for the new grid?", "")
	);

	if (userInput >= 16 && userInput <= 100) {
		numOfSquares = userInput;
		createGameGrid();
	} else {
		alert("Please enter a number between 16 and 100.");
	}
});

// Call adjustSquaresForScreenSize() when the page loads
window.addEventListener("load", adjustSquaresForScreenSize);

// Recalculate the grid upon window resize
window.addEventListener("resize", adjustSquaresForScreenSize);

clearButton.addEventListener("click", clearGrid);
