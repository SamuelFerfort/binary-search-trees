class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(sortAndRemoveDuplicates(array));
  }
  insert(value) {
    // if tree is empty insert value as root
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      } else {
        return; // duplicate, exit function
      }
    }
  }

  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) {
      return currentNode;
    }
    if (value < currentNode.data) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      // we found the value to delete

      // One children
      if (currentNode.left === null) return currentNode.right;
      if (currentNode.right === null) return currentNode.left;

      // Two children case
      currentNode.data = this.minValue(currentNode.right); // Navigate till the left end of the right subtree
      currentNode.right = this.deleteItem(currentNode.data, currentNode.right);
    }
    return currentNode;
  }
  minValue(node) {
    let minV = node.data;
    while (node.left !== null) {
      minV = node.left.data;
      node = node.left;
    }
    return minV;
  }
  find(value) {
    if (this.root === null) return;

    let node = this.root;
    while (node !== null) {
      if (value < node.data) {
        node = node.left;
      } else if (value > node.data) {
        node = node.right;
      } else if (value === node.data) {
        return node;
      }
    }
    return null;
  }

  height(node = this.root) {
    if (!node) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, current = tree.root) {
    if (!current) return null;
    let edges = 0;
    while (current) {
      if (node.data < current.data) {
        current = current.left;
      } else if (node.data > current.data) {
        current = current.right;
      } else if (current.data === node.data) {
        return edges;
      }
      edges++;
    }
    return null;
  }
  depthRec(node, current = this.root, depth = 0) {
    if (!current) return null;

    if (current.data === node.data) return depth;

    if (node.data < current.data) {
      return this.depthRec(node, current.left, depth + 1);
    } else {
      return this.depthRec(node, current.right, depth + 1);
    }
  }
  isBalanced(node = this.root) {
    if (!node) return true;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    // Recursively check for balance in left and right subtrees
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  reBalance() {
    this.root = buildTree(this.inOrder());
  }
  levelOrder(callback) {
    let root = this.root;
    const result = [];
    const q = [];
    q.push(root);
    while (q.length) {
      let current = q.shift();

      if (callback && typeof callback === "function") {
        callback(current.data);
      } else {
        result.push(current.data);
      }

      if (current.left != null) q.push(current.left);
      if (current.right != null) q.push(current.right);
    }
    return result;
  }
  levelOrderRec(callback, q = [this.root]) {
    if (!q.length) return null;
    let current = q.shift();
    if (callback && typeof callback === "function") {
      callback(current.data);
    } else {
      console.log(current.data);
    }

    if (current.left) q.push(current.left);

    if (current.right) q.push(current.right);

    this.levelOrderRec(callback, q);
  }

  inOrder(callback, result = [], node = this.root) {
    if (!node) return null;

    this.inOrder(callback, result, node.left);

    if (callback && typeof callback === "function") {
      callback(node.data);
    } else {
      result.push(node.data);
    }

    this.inOrder(callback, result, node.right);
    return result;
  }
  preOrder(callback, result = [], node = this.root) {
    if (!node) return null;

    if (callback && typeof callback === "function") {
      callback(node.data);
    } else {
      result.push(node.data);
    }

    this.preOrder(callback, result, node.left);
    this.preOrder(callback, result, node.right);
    return result;
  }
  postOrder(callback, result = [], node = this.root) {
    if (!node) return null;

    this.postOrder(callback, result, node.left);
    this.postOrder(callback, result, node.right);
    if (callback && typeof callback === "function") {
      callback(node.data);
    } else {
      result.push(node.data);
    }
    return result;
  }
}

function buildTree(array) {
  // should return level-0 root node
  if (array.length <= 0) return null;

  let mid = Math.floor(array.length / 2);

  let node = new Node(array[mid]);

  node.left = buildTree(array.slice(0, mid));
  node.right = buildTree(array.slice(mid + 1));

  return node;
}

function sortAndRemoveDuplicates(array) {
  array.sort((a, b) => a - b);
  let values = new Set();
  for (let i = 0; i < array.length; i++) {
    values.add(array[i]);
  }

  return [...values];
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};



// Function to generate an array of random numbers less than 100
function getRandomNumbers(size) {
  const numbers = [];
  for (let i = 0; i < size; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return numbers;
}

// Function to print elements
function printElements(label, elements) {
  console.log(`${label}: ${elements.join(", ")}`);
}

// Create a new BST
const tree = new Tree(getRandomNumbers(10));

// Check if the tree is balanced
console.log("Is the tree balanced (initially):", tree.isBalanced());

// Print elements in level, pre, in, and post order
printElements("Level order:", tree.levelOrder());
printElements("Pre order:", tree.preOrder());
printElements("In order:", tree.inOrder());
printElements("Post order:", tree.postOrder());


prettyPrint(tree.root)
// Unbalance the tree by adding large numbers
console.log("\nUnbalancing the tree...");
tree.insert(150);
tree.insert(200);
tree.insert(250);

prettyPrint(tree.root)

// Check if the tree is balanced (after unbalancing)
console.log("Is the tree balanced (after unbalancing):", tree.isBalanced());



// Rebalance the tree
console.log("\nRebalancing the tree...");
tree.reBalance();


// Check if the tree is balanced (after rebalancing)
console.log("Is the tree balanced (after rebalancing):", tree.isBalanced());

prettyPrint(tree.root)

// Print elements in level, pre, in, and post order (after rebalancing)
printElements("\nLevel order (after rebalancing):", tree.levelOrder());
printElements("Pre order (after rebalancing):", tree.preOrder());
printElements("In order (after rebalancing):", tree.inOrder());
printElements("Post order (after rebalancing):", tree.postOrder());