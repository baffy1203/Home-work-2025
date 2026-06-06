function asyncOperationDemo(callback) {
  console.log("Перший виклик");

  process.nextTick(() => {
    console.log("Виконано nextTick");
    callback(null, "nextTick");
  });

  setImmediate(() => {
    console.log("Виконано setImmediate");
    callback(null, "setImmediate");
  });

  setTimeout(() => {
    console.log("Виконано setTimeout");
    callback(null, "setTimeout");
  }, 0);

  console.log("Останній виклик");
}

asyncOperationDemo((err, operation) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Завершено виконання: ${operation}`);
});

export { asyncOperationDemo };
