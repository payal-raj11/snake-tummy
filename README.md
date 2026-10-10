# 🐍 Snake Tummy

A simple browser-based Snake game built using **HTML, CSS, and JavaScript**. Control the snake using the keyboard arrow keys, eat randomly positioned food, and grow longer as you play!

🌐 Live Demo

Play Snake Tummy here: https://snake-tummy.vercel.app/ 

## 🎮 Features

* **Snake Movement:** Control the snake using the Up, Down, Left, and Right arrow keys.
* **Random Food Generation:** Food appears at random positions on the game board.
* **Food Consumption:** When the snake eats the food, a new piece appears.
* **Snake Growth:** The snake grows longer when it eats food.
* **Boundary Wraparound:** The snake reappears on the opposite side when it crosses a board boundary.
* **Score Display:** The interface includes areas for the current score and highest score.

## 🛠️ Technologies Used

* HTML5 — Structure of the game.
* CSS3 — Styling and layout.
* JavaScript — Snake movement, keyboard controls, random food generation, and collision detection.

## 📁 Project Structure

```text
snake-tummy/
├── index.html
├── style.css
├── script.js
├── bg.png
└── README.md
```

*Note: Adjust the file structure if your background image or other files are stored in different locations.*

## 🚀 How to Run

1. Download or clone the project to your computer.
2. Ensure the HTML, CSS, JavaScript, and background image files are in their expected locations.
3. Open `index.html` in a web browser.
4. Click **Start** if the Start button is connected to the game logic.
5. Use the arrow keys to control the snake.

You can also open the project in Visual Studio Code and use the Live Server extension.

## 🕹️ How to Play

1. Use the arrow keys to change the snake's direction.
2. Guide the snake toward the red food.
3. Eat the food to increase the snake's length.
4. Find the next piece of food at its new random position.
5. Keep playing and aim for a higher score!

## 🧠 Concepts Practiced

* DOM manipulation.
* Dynamic HTML element creation.
* Arrays and objects for storing coordinates.
* Keyboard event handling.
* `setInterval()` for repeated movement updates.
* Random number generation using `Math.random()`.
* Collision detection using coordinate comparisons.
* CSS positioning for game objects.

## 🔮 Future Improvements

* Update the score whenever food is eaten.
* Save the highest score using `localStorage`.
* Add Start, Pause, and Restart functionality.
* Prevent food from spawning on the snake's body.
* Add a game-over condition for collisions with the snake itself.
* Improve responsiveness for different screen sizes.
* Add sound effects and difficulty levels.

## 📜 License

This project is created for learning and educational purposes. Feel free to modify and extend it for your own use.
