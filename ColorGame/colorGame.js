var numSquares = 6;

var color = generateRandomColors(numSquares);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var resetButton = document.getElementById("reset");
var h1 = document.querySelector("h1");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var pickedColor = colorPick();

colorDisplay.textContent = pickedColor;

easyBtn.addEventListener("click",function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	h1.style.backgroundColor = 	"#232323";
	numSquares = 3;
	color = generateRandomColors(numSquares);
	pickedColor = colorPick();
	colorDisplay.textContent = pickedColor;
	for (var i=0 ; i <squares.length ; i++){
		if(color[i]){
			squares[i].style.backgroundColor = color[i];
		}
		else{
			squares[i].style.display = "none";
		}
		
	}

})

hardBtn.addEventListener("click",function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	h1.style.backgroundColor = 	"#232323";
	color = generateRandomColors(numSquares);
	pickedColor = colorPick();
	colorDisplay.textContent = pickedColor;
	for (var i=0 ; i <squares.length ; i++){
		
			squares[i].style.backgroundColor = color[i];
			squares[i].style.display = "block";		
	}
})

resetButton.addEventListener("click",function(){
	color = generateRandomColors(numSquares);
	pickedColor = colorPick();
	colorDisplay.textContent = pickedColor;
	this.textContent = "New Colors";
	for(var i=0; i<squares.length; i++)
	{
		squares[i].style.backgroundColor = color[i];	
	}
	h1.style.backgroundColor = 	"#232323";	
	messageDisplay.textContent = "";
})


for(var i=0; i<squares.length; i++)
{
	squares[i].style.backgroundColor = color[i];

	squares[i].addEventListener("click",function(){
		var clickedColor = this.style.backgroundColor;
		
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct";
			changeColor(pickedColor);
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again?";
			}
		
		else{
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
	});
}

function changeColor(color)
{
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function colorPick(){
	var random = Math.floor(Math.random() * color.length);
	return color[random];
}

function generateRandomColors(num){

	var colorArray = [];

	for (var i=0;i<num;i++){
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		colorArray[i] = "rgb(" + r + ", " + g + ", " + b + ")"
	}

	return colorArray;

}