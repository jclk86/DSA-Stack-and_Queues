// const stack = require("./stack");

// A queue is First In First Out. Like a line at the supermarket.
// Data is inserted at the end and removed from the front. This maintains FIFO.
// Main methods of the queue: Enqueue and Dequeue
// enqueue() inserts into last position of the queue
// dequeue() removes from the first position of the queue/oldest data
// You can implement a JS array to as stack or queue

class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    // remember: this is the entire queue. So last should always point to enqueued node,
    // but the node's next should be null.
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = new _Node(value);
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
    }
    // important: notice above this.last.next = node assigns a node normally to a next pointer
    // below though you ensure the this.last is always the latest node entered. These two are
    // separate things.
    this.last = node;
    this.size++;
  }
  // Remember: You only remove from the front.
  dequeue() {
    if (this.first === null) {
      return;
    }
    // we need to save this first node before replacing it so that we can check
    // if it is the only item on the list
    const node = this.first;
    this.first = this.first.next;
    if (node === this.last) {
      this.last = null;
    }
    // need this to be returned so you can use its value later
    this.size--;
    return node.value;
  }
}

const queue = new Queue();

queue.enqueue("1st");
queue.enqueue("2nd");
queue.enqueue("3rd");
queue.dequeue();

console.log(queue);

module.exports = Queue;
