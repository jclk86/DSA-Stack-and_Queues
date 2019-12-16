class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
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

  isEmpty() {
    if (!this.top) {
      return true;
    } else {
      return false;
    }
  }

  peek() {
    if (!this.top) {
      this.isEmpty();
      return;
    }
    console.log(this.top.value);
    return this.top.value;
  }

  printStack() {
    if (!this.top) {
      return null;
    }

    let currentNode = this.top;
    while (currentNode) {
      console.log(currentNode);
      currentNode = currentNode.next;
    }
  }

  display() {
    let node = this.top;
    // to prevent infinite loop for
    while (node !== null) {
      console.log(node);
      node = node.next;
    }
  }
}

// 3. Check for Palindrome
// Write an algorithm that uses a stack to determine whether a given input is palindrome or not.
// Use the following template as a starting point.

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  if (s.length < 3) {
    return false;
  }
  // Your code goes here
  const stringStack = new Stack();
  for (let i = 0; i < s.length; i++) {
    stringStack.push(s[i]);
  }
  let reverseString = "";
  // add up all the pop values - notice that the pop() returns node.value
  while (!stringStack.isEmpty()) {
    reverseString += stringStack.pop();
  }
  // check if accumulated pop = string
  if (s === reverseString) {
    return true;
  } else {
    return false;
  }
}

// console.log(is_palindrome("racecar"));

// 4. Matching parentheses in an expression

const parser = expression => {
  const parseExp = new Stack();
  const map = {
    "(": ")",
    "[": "]",
    "{": "}"
  };
  // loops through input expression and places everything into stack
  // assigning them to character key -- each letter/symbol
  // and providing an index
  for (let char in expression) {
    if (
      expression[char] === "(" ||
      expression[char] === "[" ||
      expression[char] === "{"
    ) {
      parseExp.push({
        character: expression[char]
      });
    }

    // if stack is empty,
    if (parseExp.isEmpty()) {
      if (expression[char] === ")") {
        console.log(`You are missing a '(' after character index ${char}`);
        return false;
      }
      if (expression[char] === "]") {
        console.log(`You are missing a '[' after character index ${char}`);
        return false;
      }
      if (expression[char] === "}") {
        console.log(`You are missing a '{' after character index ${char}`);
        return false;
      }
    }

    if (
      expression[char] === ")" ||
      expression[char] === "]" ||
      expression[char] === "}"
    ) {
      let priorChar = parseExp.pop();
      if (expression[char] !== map[priorChar.character]) {
        console.log(
          `Expecting a ${map[priorChar.character]} but received a ${
            expression[char]
          }`
        );
        return false;
      }
    }
  }
  if (parseExp.isEmpty()) {
    return true;
  }
  console.log(
    `Holding an open ${parseExp.top.data.character} after character index ${parseExp.top.data.index}`
  );
  return false;
};
// parser("O dwdw a dwdw (fkljfelf dwadko[er{} jfjfjf])r yyeffef fvfdf([a]liris.");
let numStack = new Stack();

numStack.push("31");
numStack.push("82");
numStack.push("72");
numStack.push("11");
numStack.push("44");
numStack.push("2");
// numStack.push("7");
// numStack.push("5");
// numStack.push("6");
// numStack.push("9");
// numStack.push("3");
// numStack.push("1");

function sort(stack) {
  let s2 = new Stack();
  while (stack.top) {
    let stackTop = stack.pop();
    // the original stack functions as a holding area.
    // values can be pushed back on it from s2 and popped off of it again.
    while (s2.top && s2.top.value < stackTop) {
      // doesn't run first time around, bc nothing till after s2.push below
      stack.push(s2.pop());
    }
    s2.push(stackTop);
  }
  return s2.printStack(); // change to this.head as arg since method
}

sort(numStack);

// first time through outer while loop stackTop is 2
// skip inner loop
// push 2 on s2
// Second time stackTop is 44
// inner while loop 2 < 44
// pop 2 off s2 and push 2 back onto stack
// pop 44 off stack and push 44 onto s2 (swap)
// 3rd time stackTop is 2 (because 2 was pushed back onto stack)
//

// 7. Create a queue class using Doubly linked List
// Use the items listed in #6 and enqueue them to your queue.

// queues add onto the end
// and dequeue from the front

// Check to see who is first one on the Queue?
class NodeDeque {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class Doubly {
  constructor() {
    this.first = null;
    this.last = null;
  }

  // The code for the enqueue operation is implemented as follows:
  enqueue(value) {
    const node = new NodeDeque(value);
    // only happens under null condition
    if (this.first === null) {
      this.first = node;
    }
    // Add to the end of the queue, because last equals something
    if (this.last) {
      this.last.next = node;
      this.last.prev = this.last;
    }
    //make the new node the last item on the queue
    this.last = node;
  }
}

function peek(queue) {
  let node = queue.first.value;
  if (node.next === undefined) {
    node = node;
  }
  return node;
}

// peek(starTrekQ)

function isEmpty(queue) {
  if (queue.first) {
    return false;
  } else {
    return true;
  }
}

function display(queue) {
  let node = queue.first;
  while (node.next !== null) {
    console.log(node);
    node = node.next;
  }
}

const starTrekDQ = new Doubly();
starTrekDQ.enqueue("Kirk");
starTrekDQ.enqueue("Spock");
starTrekDQ.enqueue("Uhura");
starTrekDQ.enqueue("Sulu");
starTrekDQ.enqueue("Checkov");

// display(starTrekDQ);

// En

class DoubleStackQueue {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  enqueue(item) {
    this.stack1.push(item);
  }
  // Stack2 only briefly gets the values from stack 1 before popping the value off again
  // holds, pops, holds, pops...
  dequeue() {
    if (this.stack2.isEmpty()) {
      while (!this.stack1.isEmpty()) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }
}

const myQueue = new DoubleStackQueue();
myQueue.enqueue("1");
myQueue.enqueue("2");
myQueue.enqueue("3");
myQueue.enqueue("4");

let val1 = myQueue.dequeue();
let val2 = myQueue.dequeue();
let val3 = myQueue.dequeue();
let val4 = myQueue.dequeue();

myQueue.enqueue("5");
myQueue.enqueue("6");

let val5 = myQueue.dequeue();
let val6 = myQueue.dequeue();

// console.log(
//   "val1: ",
//   val1,
//   "val2: ",
//   val2,
//   "val3: ",
//   val3,
//   "val4: ",
//   val4,
//   "val5: ",
//   val5,
//   "val6: ",
//   val6
// );

// 9. Square dance pairing
// As people come to the dance floor, they should be paired off as quickly as possible: man with woman, man with woman, all the way down the line. If several men arrive in a row, they should be paired in the order they came, and likewise if several women do. Maintain a queue of "spares" (men for whom you have no women yet, or vice versa),and pair them as appropriate.

// F Jane

// M Frank

// M John

// M Sherlock

// F Madonna

// M David

// M Christopher

// F Beyonce

// Female dancer is Jane, and the male dancer is Frank
// Female dancer is Madonna, and the male dancer is John
// Female dancer is Beyonce, and the male dancer is Sherlock
// There are 2 male dancers waiting to dance

// take input name and gender.
// first M matches with first F
// second M matches with second F etc...

// we need two queues

// what does the output look like?

// create stub function for the pairs that you dequeued off
// make the challenge a verb/function
class Node {
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
    const node = new Node(value);
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

function size(queue) {
  let tmp = queue.first;
  let count = 0;
  while (tmp !== null) {
    count += 1;
    tmp = tmp.next;
  }
  return count;
}

const pairing = new Queue();
const men = new Queue();
const women = new Queue();
men.enqueue("Frank");
men.enqueue("John");
men.enqueue("Sherlock");
men.enqueue("David");
men.enqueue("Christopher");

// console.log(size(men))
women.enqueue("Jane");
women.enqueue("Madonna");
women.enqueue("Beyonce");

function pairDancers(men, women) {
  while (!isEmpty(men) && !isEmpty(women)) {
    let male = men.dequeue();
    let female = women.dequeue();
    console.log(
      `The female dancer is ${female} and the male dancer is ${male}.`
    );
  }
  // could change this to ternary operator if don't know which is empty
  const { gender, spares } = isEmpty(men)
    ? { gender: "female", spares: women }
    : { gender: "male", spares: men };
  console.log(`There are ${size(spares)} ${gender} dancers waiting to dance`);
  return spares;
}

// pairDancers(men, women);

// 10. The Ophidian Bank
// At the Ophidian Bank, a single teller serves a long queue of people. New customers join the end of the queue,
// and the teller will serve a customer only if they have all of the appropriate paperwork. Write a representation of this queue;
// 25% of the time (random), a customer's paperwork isn't quite right, and it's back to the end of the queue. Show what a few minutes of the bank's lobby would look like.

// const Queue = require('./queue');

function teller(queue) {
  console.log("The teller at Ophidian Bank started serving the queue");
  while (!isEmpty(queue)) {
    const customer = queue.dequeue();
    const random = Math.random();
    if (random < 0.25) {
      queue.enqueue(customer);
      console.log(`${customer} was sent back to the end of the line`);
    } else {
      console.log(`${customer} was served`);
    }
  }
  console.log("The teller served the entire queue");
}

const bankLine = new Queue();

const customers = [
  "Aaron",
  "Timothy",
  "Shane",
  "Alec",
  "Sean",
  "Alex",
  "Nikolas",
  "Cameron",
  "Morgan",
  "Chelsea",
  "Mathew",
  "Colin",
  "Kent",
  "Gabriel",
  "Joe",
  "Janet"
];

customers.forEach(customer => {
  bankLine.enqueue(customer);
});

// teller(bankLine);
