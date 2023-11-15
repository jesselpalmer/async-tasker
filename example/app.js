const AsyncTasker = require("../src/index.js");

const asyncTasker = new AsyncTasker();

asyncTasker.addTask(() => console.log("Macro Task 1"), false);
asyncTasker.addTask(() => console.log("Micro Task 1"), true);
asyncTasker.addTask(() => console.log("Macro Task 2"), false);

asyncTasker.start();
