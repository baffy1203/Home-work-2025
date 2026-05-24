export function getUserGreeting() {

  const userName = process.argv[2];

  if (userName) {
    return `Hello, ${userName}`;
  }

  return "Hello, Guest";
}