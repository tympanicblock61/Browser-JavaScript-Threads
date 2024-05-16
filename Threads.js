function freezeProp(obj, prop) {
  Object.defineProperty(obj, prop, { configurable: false, writable: false });
}

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

class Thread {
  constructor() {
    this.id = guidGenerator();
    freezeProp(this, "id");
    this.stopped = false;
    this.running = false;
    this.runOnce = null;
    this.runConstantly = null;
    this.context = {};
  }

  set(runOnce, runConstantly) {
    this.runOnce = () => runOnce.apply(this.context);
    this.runConstantly = () => runConstantly.apply(this.context);
  }

  start() {
    if (!this.running) {
      const self = this.context;

      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      self.delay = delay;
      self.id = this.id;
      self.temp = {};
      freezeProp(self, "id");
      freezeProp(self, "delay");

      const runConstantlyFunc = async () => {
        while (!this.stopped) {
          await this.runConstantly.apply(self);
          await Promise.all(Object.keys(self.temp).map(key => delete self.temp[key]));
        }
      };

      if (this.runOnce != null) {
        (async () => {
          await this.runOnce.apply(self);
          if (this.runConstantly != null) {
            runConstantlyFunc.apply(self);
          }
        })();
      } else if (this.runConstantly != null) {
        runConstantlyFunc.apply(self);
      }
    } else {
      this.stopped = false;
    }
  }

  stop() {
    this.stopped = true;
  }
}

class ThreadMaster {
  constructor() {
    this.threads = new Map();
  }

  getThread(id) {
    if (!this.threads.has(id)) new Error(`no thread with id '${id}' exists`)
    return this.threads.get(id);
  }

  createThread(runOnce, runConstantly) {
    let thread = new Thread()
    thread.set(runOnce, runConstantly);
    this.threads.set(thread.id, thread);
    return thread;
  }

  deleteThread(id) {
    if (!this.threads.has(id)) new Error(`no thread with id '${id}' exists`);
    this.threads.delete(id);
  }

  addThread(thread) {
    if (!(thread instanceof Thread)) new TypeError("thread must be a Thread");
    if (this.threads.has(thread.id)) new ReferenceError(`thread with id ${id} already exists`);
    this.threads.set(thread.id, thread);
  }

  start(id) {
    if (!this.threads.has(id)) new ReferenceError(`no thread with id '${id}' exists`);
    this.threads.get(id).start();
  }

  stop(id) {
    if (!this.threads.has(id)) new ReferenceError(`no thread with id '${id}' exists`);
    this.threads.get(id).stop();
  }

  startAll() {
    for (const thread of this.threads.values()) {
      thread.start();
    }
    console.log("Started All Threads.");
  }

  stopAll() {
    for (const thread of this.threads.values()) {
      thread.stop();
    }
    console.log("Stopped All Threads.");
  }
}
