import { isProductionMode } from "./config.js";
import { getUserGreeting } from "./greeting.js";

const productionResult = isProductionMode();

console.log("Production mode:", productionResult);

const greetingResult = getUserGreeting();

console.log(greetingResult);