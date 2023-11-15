'use strict';

class AsyncTasker {
  #microTaskQueue = [];
  #macroTaskQueue = [];
  #intervalId = null;

  addTask(taskFunction, isMicroTask = false) {
    if (isMicroTask) {
      this.#microTaskQueue.push(taskFunction);
      this.#processMicroTasks();
    } else {
      this.#macroTaskQueue.push(taskFunction);
    }
  }

  #processMicroTasks() {
    while (this.#microTaskQueue.length > 0) {
      const task = this.#microTaskQueue.shift();
      try {
        task();
      } catch (error) {
        console.error('Error in micro task:', error);
      }
    }
  }

  #processMacroTasks() {
    if (this.#macroTaskQueue.length > 0) {
      const task = this.#macroTaskQueue.shift();
      try {
        task();
      } catch (error) {
        console.error('Error in macro task:', error);
      }
    }
    this.#processMicroTasks();
  }

  start(interval = 1000) {
    if (!this.#intervalId) {
      this.#intervalId = setInterval(this.#processMacroTasks.bind(this), interval);
    }
  }

  stop() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }
}

module.exports = AsyncTasker;
