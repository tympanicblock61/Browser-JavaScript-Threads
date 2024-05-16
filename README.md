# Browser JavaScript Threads

Includes classes: `Thread`, `ThreadMaster`
`ThreadMaster` is a Thread manager.  
You can create and start Threads without `ThreadMaster`.

## Thread

### Attributes
- `id`: The unique id of the Thread using generated GUID version 4; cannot be edited and is frozen.
- `stopped`: A value that tells if the Thread is stopped.
- `running`: A value that tells if the Thread has been started before; used in case resumed after stopping.
- `runOnce`: The global runOnce function of the class.
- `runConstantly`: The global runConstantly function of the class.
- `context`: The 'this' used in runOnce and runConstantly.

### Functions
- `set(runOnce, runConstantly)`: Sets the Thread's runOnce and runConstantly functions.
- `start()`: Starts the Thread.
- `stop()`: Stops the Thread.

## ThreadMaster

### Attributes
- `threads`: A Map of `[id:Thread]` used to store all threads.

### Functions
- `getThread(id)`: Gets a Thread using its id; throws a ReferenceError if no Thread with that id exists.
- `createThread(runOnce, runConstantly)`: Creates a Thread using the runOnce and runConstantly functions.
- `deleteThread(id)`: Deletes a Thread using its id; throws a ReferenceError if no Thread with that id exists.
- `addThread(Thread)`: Adds a Thread to the ThreadMaster object; throws a TypeError if the Thread parameter is not an instance of Thread; throws a ReferenceError if a Thread with the same id was already added.
- `start(id)`: Starts a Thread using its id; throws a ReferenceError if no Thread with that id exists.
- `stop(id)`: Stops a Thread using its id; throws a ReferenceError if no Thread with that id exists.
- `startAll()`: Starts all Threads.
- `stopAll()`: Stops all Threads.

## extra functions
- `guidGenerator()`: generates a version 4 GUID.
- `freezeProp(obj, prop)`: freezes a property (prop) on an object (obj), rendering it immutable and preventing any modifications or deletions.
