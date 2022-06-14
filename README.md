# Super Mathler

The next generation of Mathler!

![Fresh Screenshot](/screenshots/screenshot-fresh.png)

### Language / Technologies Chosen

- npm
- Typescript
- React
- Prettier
- TailwindCSS
- HeadlessUI
- Cypress

## Personal Requirements

1. Mobile & Desktop platforms supported
2. Nice UI / UX
3. Dark Mode
4. Fast!

## Testing Strategy

1. Unit test the game engine using Jest
2. Component unit test React components using Jest and react-testing-library
3. Test more complex global state interactions using E2E tests with Cypress

## Game Rules

Initially I was not familiar with the rules of Mathler but I have obtained a full list from https://www.tomsguide.com/news/what-is-mathler-and-how-to-play, which are pasted below.

1. You have to guess the solution in six goes or less
2. Every equation you enter must be a valid answer. So if the answer is 20, your guess can't be 50+5-2 because that doesn't equal 20. Right away, this is one of the toughest things about it.
3. The equations follow the PEDMAS rule, which means you do them in the order of parentheses, exponentials, division, multiplication, addition and then subtraction.
4. A correct entry turns green
5. A correct entry in the wrong place turns yellow
6. An incorrect entry turns gray / red
7. Digits and operations can be used more than once

## Installation

- npm install -f (This is needed because not all libraries being used are upgraded for React v18.0)

## Run

The game is currently defaulting to have an answer of 73 and target result of 132 - 59. The value can be changed from the code but would ideally be set by some external service that changes those values daily.

- npm run start

## Running E2E Tests

The E2E tests require the website to be running

- npm run test
- npm run test:e2e

## Additional Screenshots

![Win Screen Screenshot](/screenshots/screenshot-win-screen.png)
![Loss Screen Screenshot](/screenshots/screenshot-loss-screen.png)
![Alert Bubble Screenshot](/screenshots/screenshot-alert-bubble.png)
