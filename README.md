# 🎯 Number Guessing Game

A fun and interactive Number Guessing Game built with React! Test your luck and see how quickly you can guess the secret number between 1 and 100.

## ✨ Features

- **Interactive Gameplay**: Guess numbers and get instant feedback
- **Smart Hints**: Get helpful hints (too high/too low) to guide your guesses
- **Attempt Counter**: Track how many attempts you make
- **High Score System**: Save your best score locally
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Mobile Friendly**: Works perfectly on all devices
- **Keyboard Support**: Press Enter to submit your guess
- **Celebration Effects**: Special animations when you win!

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Number-Guessing-Game.git
cd Number-Guessing-Game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎮 How to Play

1. **Start the Game**: Click "Start New Game" to begin
2. **Make a Guess**: Enter a number between 1 and 100
3. **Get Feedback**: The game will tell you if your guess is too high or too low
4. **Keep Guessing**: Continue until you find the correct number
5. **Beat Your Score**: Try to guess the number in fewer attempts!

## 🛠️ Built With

- **React** - Frontend framework
- **CSS3** - Styling and animations
- **HTML5** - Structure
- **JavaScript ES6+** - Game logic

## 📱 Features in Detail

### Game Mechanics
- Random number generation (1-100)
- Input validation
- Attempt tracking
- Win condition detection

### User Experience
- Responsive design for all screen sizes
- Smooth animations and transitions
- Intuitive user interface
- Keyboard navigation support

### Data Persistence
- Local storage for high scores
- Score reset functionality

## 🎨 Design Features

- **Modern UI**: Clean, card-based design with glassmorphism effects
- **Colorful Gradients**: Beautiful gradient backgrounds and buttons
- **Smooth Animations**: Slide-in effects, hover animations, and celebration effects
- **Responsive Layout**: Adapts perfectly to desktop, tablet, and mobile devices

## 📁 Project Structure

```
Number-Guessing-Game/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.js             # Main React component
│   ├── App.css            # Component styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎯 Game Rules

1. The computer generates a random number between 1 and 100
2. You have unlimited attempts to guess the correct number
3. After each guess, you'll get a hint:
   - "Too low" - Your guess is below the target number
   - "Too high" - Your guess is above the target number
4. When you guess correctly, you win! 🎉
5. Your best score (lowest number of attempts) is saved automatically

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- CSS community for inspiration on modern design patterns
- All the players who will enjoy this game! 🎮

---

**Happy Guessing! 🎯**
