// Stack stores elements in a Last In First Out order. Think stacked plates.
// Implement a stack via singly-linked list, where items can only be deleted at only 1 place.
// A stack has 2 primary functions: pop(), push(), Peek(), Size()/Length()
// Push places data onto the top of the stack
// Pop removes data from the top of the stack
// Peek display top element of a stack

class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0; // like array, length is 1 more than last index
  }

  push(value) {
    if (this.top === null) {
      // Don't get confused: the null here is NEXT
      this.top = new _Node(value, null);
      return this.top;
    }
    // the this.top here assigns null value in the beginning to next.
    const node = new _Node(value, this.top);
    this.top = node;
    this.size++;
  }

  pop() {
    /* In order to remove the top of the stack, you have to point
       the pointer to the next item and that next item becomes the
       top of the stack */
    const node = this.top;
    this.top = node.next;
    return node.value;
  }
  // Looks at top of stack without removing it.
  peek() {
    if (!this.top) {
      this.isEmpty();
      return;
    }
    console.log(this.top.value);
    return this.top.value;
  }

  isEmpty() {
    if (!this.top) {
      console.log("Empty stack");
      return true;
    } else {
      console.log("Stack is not empty");
      return false;
    }
  }

  printStack() {
    if (!this.top) {
      return null;
    }

    let currentNode = this.top;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  removeValue(value) {
    if (!this.top) {
      this.isEmpty();
      return;
    }
    if (this.top.value == value) {
      this.top = this.top.next; // setting it to null if top is the only item
      return;
    }

    let currentNode = this.top;
    let previousNode = this.top;

    while (this.top && currentNode.value !== value) {
      // save previousNode and currentNode.next to point previous node to currentNode.next
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      // Edge case
      // If currentNode does reach a null, it means the list has been traversed.
      //   currentNode.next === null would not allow you to get the currentNode
      console.log("Value not found");
      return;
    }
    // tricky part ***
    previousNode.next = currentNode.next;
  }
}

const stack = new Stack();

stack.push("starTrek");
stack.pop();
// stack.push("Kirk");
// stack.push("McCoy");
// stack.push("Scotty");
// stack.removeValue("McCoy");

// stack.peek();
stack.printStack();

module.exports = Stack;
