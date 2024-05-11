class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array.sort());
  }
  insert(value) {}

  deleteItem(value) {}
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

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function sortAndRemoveDuplicates(array) {
  array.sort((a, b) => a - b);
  let values = new Set();
  for (let i = 0; i < array.length; i++) {
    values.add(array[i]);
  }

  return [...values];
}

array = sortAndRemoveDuplicates(array);

console.log(array);

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

prettyPrint(buildTree(array));
