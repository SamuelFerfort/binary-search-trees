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

// Create a new tree
const tree = new Tree([5, 3, 7, 2, 4, 6, 8]);

// Insertion tests
tree.insert(1); // Insert a new node with value 1
tree.insert(9); // Insert a new node with value 9

console.log("After insertions:", prettyPrint(tree.root));

// Deletion tests
tree.deleteItem(2); // Delete a node with value 2 (no children)
tree.deleteItem(7); // Delete a node with value 7 (one child)
tree.deleteItem(5); // Delete the root node with value 5 (two children)
console.log("After deletions:", prettyPrint(tree.root));

// Search for existing values
console.log("Searching for existing values:");
console.log("Searching for 3:", tree.find(3)); // Should return the node with value 3
console.log("Searching for 9:", tree.find(9)); // Should return the node with value 9

// Search for non-existing value
console.log("Searching for non-existing value:");
console.log("Searching for 10:", tree.find(10)); // Should return null
