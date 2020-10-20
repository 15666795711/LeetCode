/**
 * 查找当前数组所有递增子序列
 * @param {*} nums 数组
 */
function findSubsequences(nums) {
  const res = [];
  const len = nums.length;
  const set = new Set();

  function dfs(start, path) {
    if (path.length >= 2) {
      const str = path.join(',');
      if (!set.has(str)) {
        res.push(path.slice());
        set.add(str);
      }
    }
    for (let i = start; i < len; i++) {
      const prev = path[path.length - 1];
      const cur = nums[i];
      if (path.length === 0 || prev <= cur) {
        path.push(cur);
        dfs(i + 1, path);
        path.pop();
      }
    }
  }
  dfs(0, []);
  return res;
}
// findSubsequences([4,2,7,7])

/**
 * 机器人能否返回原点
 */
var judgeCircle = function (moves) {
  return moves.split('L').length === moves.split('R').length && moves.split('U').length === moves.split('D').length;
};
// console.log(judgeCircle("UDUDUDRLLRRLUDUD"))

/**
 * 添加最少的字符，使给出的字符串组成回文字符串
 */
const shortestPalindrome1 = (s) => { // s：ananab
  const len = s.length;
  const rev_s = s.split('').reverse().join(''); // rev_s：banana
  for (let i = len; i >= 0; i--) {              // ananab==banana?、anana==anana?、……
    if (s.substring(0, i) == rev_s.substring(len - i)) {
      return rev_s.substring(0, len - i) + s;   // 返回 b + ananab
    }
  }
}

// shortestPalindrome1('aacec')

const shortestPalindrome2 = (s) => {
  const rev_s = s.split('').reverse().join('');
  const str = s + "#" + rev_s;
  const next = new Array(str.length).fill(0);
  // 单独封装出来，方便学习记忆，是固定的模板代码
  const kmp = (next, str) => {
    next[0] = 0;
    let len = 0;
    let i = 1;
    while (i < str.length) {
      if (str[i] == str[len]) {
        len++;
        next[i] = len;
        i++;
      } else {
        if (len == 0) {
          next[i] = 0;
          i++;
        } else {
          len = next[len - 1];
        }
      }
    }
  };
  kmp(next, str);
  const maxLen = next[str.length - 1]; // 最长回文前缀的长度
  const add = s.substring(maxLen).split('').reverse().join('');
  return add + s;
};

// shortestPalindrome2('bcba')

/**
 * leetcode:841
 * 走房子
 */
var canVisitAllRooms1 = function (rooms) {
  let res = new Set();
  const dfs = (cur) => {
    res.add(cur);
    let nextRoom = rooms[cur];
    for (let i = 0; i < nextRoom.length; i++) {
      let tmp = nextRoom[i];
      if (!res.has(tmp)) {
        dfs(tmp);
      }
    }
  }
  dfs(0);
  return res.size === rooms.length;
};
// canVisitAllRooms1([[1,2,3],[1,2,3],[3],[]])

const canVisitAllRooms2 = (rooms) => {
  const visited = new Set();
  const queue = [];
  queue.push(0);
  visited.add(0);
  while (queue.length) {
    const nextRooms = rooms[queue.shift()];
    for (let i = 0; i < nextRooms.length; i++) {
      const next = nextRooms[i];
      if (!visited.has(next)) {
        queue.push(next);
        visited.add(next);
      }
    }
  }
  if (visited.size == rooms.length) {
    return true;
  } else {
    return false;
  }
};
// canVisitAllRooms2([[1,2,3],[],[],[]])


/**
 * 预测赢家
 * leetCode: 486
 */
const PredictTheWinner = (nums) => {

  const helper = (i, j) => { // i，j是两端的索引
    if (i == j) {    // 递归的出口，此时只有一个选择，并且没有剩余的可选
      return nums[i];
    }
    // console.log(helper(i + 1, j));
    const pickI = nums[i] - helper(i + 1, j); // 选择左端
    const pickJ = nums[j] - helper(i, j - 1); // 选择右端
    console.log(pickI, pickJ)
    return Math.max(pickI, pickJ);            // 取较大者
    // return pickI;
  };

  return helper(0, nums.length - 1) >= 0;
};

// PredictTheWinner([2,4,234,1])

/**
 * leeCode:2
 * 两数相加
 */
var addTwoNumbers = function (l1, l2) {
  const len = Math.max(l1.length, l2.length);
  let rest = 0;
  let result = [];
  for (let i = 0; i < len; i++) {
    let cur1 = l1[i] || 0;
    let cur2 = l2[i] || 0;
    let cur = cur1 + cur2 + rest;
    if (i === len - 1 && cur > 10) {
      cur = cur - 10;
      result.push(cur, 1);
      break;
    } else if (i < len - 1 && cur > 10) {
      cur = cur - 10;
      rest = 1;
    } else {
      rest = 0;
    }
    result.push(cur);
  }
  return result;
};

// addTwoNumbers([1,2,7],[1,2,7])

/**
 * leetCode: 5
 * 最长的回文字符串
 */
const longestPalindrome = (s) => {
  let result = '';
  let s_reverse = s.split('').reverse().join('');
  let len = s.length;
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      let cur = s.substring(i, j + 1);
      let cur_reverse = s_reverse.substring(len - j - 1, len - i);
      if (cur === cur_reverse && result.length < cur.length) {
        result = cur;
      }
    }
  }
  return result;
}

// longestPalindrome('abader')


/**
 * 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从 0 开始)。如果不存在，则返回 -1。
 */

const strStr = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) {
    let cur_hay = haystack[i]
    for (let j = 0; j < needle.length; j++) {
      let cur_needle = needle[j];
      if (cur_hay === cur_needle) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * 
 */
var removeDuplicates = function (nums) {
  if (nums.length == 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] != nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};

// removeDuplicates([1,1,2,1,3])

/**
 * 旋转数组
 */
var rotate1 = function (nums, k) {
  return nums.concat(nums.splice(0, nums.length - k));
};

let rotate2 = function (nums, k) {
  let i = nums.length - 1;
  while (k > 0) {
    let cur_num = nums[i];
    nums.splice(i, 1);
    nums.unshift(cur_num);
    k--;
  }
  return nums;
}

// console.log(rotate1([1,2,3,4,5,6,7],3))

/**
 * 是否存在重复的元素
 */

var containsDuplicate = function (nums) {
  let rest = {};
  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i];
    if (rest[cur]) {
      return true;
    } else {
      rest[cur] = true;
    }
  }
  return false;
};
// containsDuplicate([3,1])

/**
 * 找出不重复的元素
 */

var singleNumber1 = function (nums) {
  let rest = {};
  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i];
    if (rest[cur] === true) {
      delete rest[cur]
    } else {
      rest[cur] = true;
    }
  }
  return Object.keys(rest)[0]
};
// singleNumber2([2,2,1])

/**
 * 两个数组的交集
 */
var intersect = function (nums1, nums2) {
  let intersection = [];
  for (let i = 0; i < nums1.length; i++) {
    let cur1 = nums1[i]
    for (let j = 0; j < nums2.length; j++) {
      let cur2 = nums2[j]
      if (cur1 === cur2) {
        intersection.push(cur1);
        nums1.splice(i, 1);
        nums2.splice(j, 1);
        i--;
        j--;
        break;
      }
    }
  }
  return intersection;
};

var intersect2 = function (nums1, nums2) {
  let hash = {};
  let intersection = [];
  for (let i = 0; i < nums1.length; i++) {
    let cur1 = nums1[i];
    if (hash[cur1]) {
      hash[cur1]++;
    } else {
      hash[cur1] = 1;
    }
  }
  for (let j = 0; j < nums2.length; j++) {
    let cur2 = nums2[j];
    if (hash[cur2]) {
      intersection.push(cur2);
      hash[cur2]--;
    }
  }
  return intersection;
}
// intersect2([4,9,5],[9,4,9,8,4])

/**
 * 加一
 */
var plusOne1 = function (digits) {
  let rest = 1;
  let i = digits.length - 1;
  while (rest === 1) {
    if (i < 0) {
      digits.unshift(1);
      break;
    } else {
      digits[i]++;
      if (digits[i] === 10) {
        rest = 1;
        digits[i] = 0;
      } else {
        rest = 0;
      }
      i--;
    }
  }
  return digits;
};
// plusOne2([9,9])

/**
 * 移动零
 */

var moveZeroes = function (nums) {
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let cur = nums[i];
    if (!cur) {
      nums.splice(i, 1);
      nums.push(cur);
      i--;
      len--;
    }
  }
  return nums;
};
// moveZeroes([0,0,1,2,3,0,3,2])

/**
 * 两数之和
 */
var twoSum = function (nums, target) {
  let len = nums.length;
  let i = 0;
  let j = len - 1;
  while (i !== j) {
    let cur_i = nums[i];
    let cur_j = nums[j];
    if (cur_j >= target) {
      j--;
    } else {
      if (cur_i + cur_j === target) {
        return [i, j]
      } else if (cur_i + cur_j > target) {
        j--;
      } else {
        i++;
      }
    }
  }
};
// twoSum([3,2,4],6)

function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this
    var args = arguments
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}
let fn = function () {
  console.log('boom')
}
// setInterval(debounce(fn,500),1000)

/**
 * 有效的数独
 * @param {*} board 
 */
var isValidSudoku = function (board) {
  // 三个方向判重
  let rows = {};
  let columns = {};
  let boxes = {};
  // 遍历数独
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let num = board[i][j];
      if (num != '.') {
        // 子数独序号
        let boxIndex = parseInt((i / 3)) * 3 + parseInt(j / 3);
        if (rows[i + '-' + num] || columns[j + '-' + num] || boxes[boxIndex + '-' + num]) {
          return false;
        }
        // 以各自方向 + 不能出现重复的数字 组成唯一键值，若出现第二次，即为重复
        rows[i + '-' + num] = true;
        columns[j + '-' + num] = true;
        boxes[boxIndex + '-' + num] = true;
      }
    }
  }
  return true;
};
// isValidSudoku([
//   ["5","3",".",".","7",".",".",".","."],
//   ["6",".",".","1","9","5",".",".","."],
//   [".","9","8",".",".",".",".","6","."],
//   ["8",".",".",".","6",".",".",".","3"],
//   ["4",".",".","8",".","3",".",".","1"],
//   ["7",".",".",".","2",".",".",".","6"],
//   [".","6",".",".",".",".","2","8","."],
//   [".",".",".","4","1","9",".",".","5"],
//   [".",".",".",".","8",".",".","7","9"]
// ])

/**
 * 旋转数组
 */
var rotate = function (matrix) {
  let len = matrix.length;
  for (let i = 0; i < len / 2; i++) {
    for (let j = 0; j < (len - 1) / 2; j++) {
      let cur = matrix[i][j];
      matrix[i][j] = matrix[len - j - 1][i];
      matrix[len - j - 1][i] = matrix[len - i - 1][len - j - 1];
      matrix[len - i - 1][len - j - 1] = matrix[j][len - i - 1];
      matrix[j][len - i - 1] = cur;
    }
  }
  return matrix;
};
// rotate([
//   [ 1,2,3,4],
//   [ 6,7,8,9],
//   [11,12,13,14],
//   [16,17,18,19]
// ])

/**
 * 字符串中第一个不重复的数字
 */
var firstUniqChar = function (s) {
  let hash = {};
  let resultIndex = -1;
  for (let i = 0; i < s.length; i++) {
    let cur = s[i];
    if (hash[cur]) {
      hash[cur]++;
    } else {
      hash[cur] = 1;
    }
  }
  for (let key in hash) {
    if (key && hash[key] === 1) {
      resultIndex = s.indexOf(key)
      break;
    }
  }
  return resultIndex;
};
// firstUniqChar('lwelwei');

/**
 * 有效的字母异位词
 */
var isAnagram = function (s, t) {
  let hash_s = {};
  let hash_t = {};
  if (s.length !== t.length) return false;
  for (let i = 0; i < s.length; i++) {
    let cur_s = s[i];
    let cur_t = t[i];
    hash_s[cur_s] = hash_s[cur_s] ? hash_s[cur_s]++ : 1;
    hash_t[cur_t] = hash_t[cur_t] ? hash_t[cur_t]++ : 1;
  }
  for (let key in hash_s) {
    if (hash_t[key] !== hash_s[key]) {
      return false
    }
  }
  return true
};
// isAnagram('aacc','ccac')

/**
 * 判断回文字符串
 */
var isPalindrome = function (s) {
  // if(!s) return true
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    let reg = new RegExp(/[a-zA-Z0-9]/);
    if (!reg.test(s[i])) {
      i++;
      continue;
    }
    if (!reg.test(s[j])) {
      j--;
      continue;
    }
    if (s[i].toLowerCase() !== s[j].toLowerCase()) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};
// isPalindrome("")

/**
 * 最长公共序列
 */
var longestCommonPrefix = function (strs) {
  let result = '';
  let str_0 = strs[0];
  if (!str_0) return result;
  for (let i = 0; i < str_0.length; i++) {
    let cur = str_0[i];
    for (let j = 0; j < strs.length; j++) {
      if (cur !== strs[j][i]) {
        return result;
      }
    }
    result += cur;
  }
  return result;
};
// longestCommonPrefix(["flower","flow","flight"])

/**
 * 反转一个单链表
 */

var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr != null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};
// reverseList(node1);

/**
 * 删除单链表中第n个元素
 * @param {*} head 
 * @param {*} n 
 */
var removeNthFromEnd = function (head, n) {
  let dumb = new ListNode(0);
  dumb.next = head;
  let len = 0;
  let first = head;
  while (first !== null) {
    len++;
    first = first.next;
  }
  len -= n;
  first = dumb;
  while (len > 0) {
    len--;
    first = first.next;
  }
  first.next = first.next.next;
  return dumb.next;
};
// removeNthFromEnd(node1, 1)

/**
 * 合并两个有序链表
 */


/**
 * 实现一个单链表
 */
class LinkedNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = new LinkedNode('head');
  }
  find(item) {
    let curNode = this.head;
    while (curNode.val !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }
  push(item) {
    let curItem = new LinkedNode(item);
    let curNode = this.head;
    while (curNode.next !== null) {
      curNode = curNode.next;
    }
    curNode.next = curItem;
  }
  insert(newItem, item) {
    let curItem = this.find(item);
    let newNode = new LinkedNode(newItem);
    let curNext = curItem.next;
    curItem.next = newNode;
    newNode.next = curNext;
  }
  display() {
    let curNode = this.head;
    while (curNode !== null) {
      console.log(curNode);
      curNode = curNode.next;
    }
  }
  findPrev(item) {
    let prevNode = this.head;
    while (prevNode.next !== null && prevNode.next.val !== item) {
      prevNode = prevNode.next;
    }
    return prevNode;
  }
  delete(item) {
    let prevNode = this.findPrev(item);
    prevNode.next = prevNode.next.next;
  }
  advance(item, n) {
    let node = this.find(item);
    let curNode = this.head;
    let i = 0;
    while (curNode.val !== item) {
      i++;
      curNode = curNode.next;
    }
    let j = i - n > 0 ? i - n : 0;
    curNode = this.head;
    while (j > 0) {
      j--;
      curNode = curNode.next;
    }
    let prevNode = this.findPrev(item);
    prevNode.next = prevNode.next.next;
    node.next = curNode.next;
    curNode.next = node;
  }
}
let cities1 = new LinkedList();
cities1.push('1');
cities1.push('2');
cities1.push('4');
let cities2 = new LinkedList();
cities2.push('1');
cities2.push('3');
cities2.push('4');
// cities1.display();
// cities1.delete('ShangHai');
// cities1.display();
// cities1.advance('ShangHai',2)
// cities1.display();

class DoubleLinkedNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}
class DoubleLinkedList {
  constructor() {
    this.head = new DoubleLinkedNode('head');
  }
  find(item) {
    let curNode = this.head;
    while (curNode.val !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }
  insert(newItem, item) {
    let curNode = this.find(item);
    let newNode = new DoubleLinkedNode(newItem);
    newNode.next = curNode.next;
    curNode.next = newNode;
    newNode.prev = curNode;
  }
  remove(item) {
    let curNode = this.find(item);
    curNode.prev.next = curNode.next;
  }
  display() {
    let curNode = this.head;
    while (curNode !== null) {
      console.log(curNode);
      curNode = curNode.next;
    }
  }
  back(item, n) {
    let curNode = this.find(item);
    let node = curNode;
    while (n > 0 && curNode.next !== null) {
      n--;
      curNode = curNode.next;
    }
    node.prev.next = node.next;
    node.next = curNode.next;
    curNode.next = node;
    node.prev = curNode;
  }
}
// let cities2 = new DoubleLinkedList();
// cities2.insert('Tianjin', 'head');
// cities2.insert('Beijing', 'head');
// cities2.insert('Nanjing', 'Beijing');
// cities2.display();
// // cities2.remove('Beijing');
// cities2.display();
// cities2.back('Nanjing',2)
// cities2.display();

class CircularLinkedNode {
  constructor(val) {
    this.val = val;
    this.next = this;
  }
}
class CircularLinkedList {
  constructor() {
    this.head = new CircularLinkedNode('head');
  }
  find(item) {
    let curNode = this.head;
    while (curNode.next !== this.head && curNode.val !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }
  insert(newItem, item) {
    let curNode = this.find(item);
    let newNode = new CircularLinkedNode(newItem);
    newNode.next = curNode.next;
    curNode.next = newNode;
  }
  findPrev(item) {
    let curNode = this.head;
    while (curNode.next !== this.head && curNode.next.val !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }
  remove(item) {
    let prevNode = this.findPrev(item);
    prevNode.next = prevNode.next.next;
  }
  display() {
    let curNode = this.head;
    while (curNode.next !== this.head) {
      console.log(curNode)
      curNode = curNode.next;
    }
    console.log(curNode)
  }
  kill(n, m) {
    let endNode = this.head;
    for (let i = 0; i < n; i++) {
      let curNode = new CircularLinkedNode(i);
      curNode.next = endNode.next;
      endNode.next = curNode;
      endNode = curNode;
    }
    function dfs(node) {
      let j = 0;
      let listNode1 = node;
      let listNode2 = node;
      while (j + 1 !== m) {
        j++;
        listNode1 = listNode1.next;
      }
      let len = 0;
      while (len < 2 && listNode2.next.val !== 'head') {
        len++;
        listNode2 = listNode2.next;
      }
      if (len >= 2) {
        listNode1.next = listNode1.next.next;
        dfs(node)
      } else {
        return node;
      }
    }
    return dfs(endNode.next)
  }
}
// let cities3 = new CircularLinkedList();
// cities3.insert('Tianjin', 'head');
// cities3.insert('Beijing', 'head');
// cities3.insert('Nanjing', 'Beijing');
// cities3.display();
// cities3.remove('Beijing');
// cities3.display();
// cities3.kill(10,3);
// cities3.display();

/**
 * 环形链表
 */
var hasCycle = function (head) {
  let node1 = head.head;
  while (node1 !== null) {
    let node2 = node1.next;
    while (node2 !== null && node2 !== node1) {
      node2 = node2.next;
    }
    if (node2 === node1) {
      return true;
    }
    node1 = node1.next;
  }
  return false;
};
// hasCycle(cities);

/**
 * 反转链表
 * @param {*} head 
 */
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  while (cur !== null) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
// reverseList(cities1.head.next);

/**
 * 判断回文链表
 * @param {*} head 
 */
var isPalindrome = function (head) {
  let prev = null;
  let cur = head;
  while (cur !== null) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  let reverseList = prev;
  let list = head;
  while (reverseList !== null && list !== null) {
    if (reverseList.val !== list.val) {
      return false;
    }
    reverseList = reverseList.next;
    list = list.next;
  }
  return true;
};
// isPalindrome(cities1.head.next)

/**
 * 合并两个有序链表
 */
const mergeTwoLists = (l1, l2) => {
  let prehead = new LinkedNode('-1');
  let prev = prehead;
  while (l1 !== null && l2 !== null) {
    if (l1.val > l2.val) {
      prev.next = l2;
      l2 = l2.next;
    } else {
      prev.next = l1;
      l1 = l1.next;
    }
    prev = prev.next;
  }
  debugger;
  prev.next = l1 === null ? l1 : l2;
  return prehead.next;
}
// mergeTwoLists(cities1.head.next,cities2.head.next)

/**
 * 二叉查找树
 */
// 二叉树节点
class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  show() {
    return this.value;
  }
}
class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let node = new Node(value, null, null);
    if (this.root === null) {
      this.root = node
    } else {
      let current = this.root;
      let parent = null;
      while (true) {
        parent = current;
        if (value < current.value) {
          current = current.left;
          if (current === null) {
            parent.left = node;
            break;
          }
        } else {
          current = current.right;
          if (current === null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }
  // 中序遍历
  inOrder(node) {
    if (node !== null) {
      this.inOrder(node.left);
      console.log('value:' + node.show())
      this.inOrder(node.right);
    }
  }
  prevOrder(node) {
    if (node !== null) {
      console.log('value:' + node.show())
      this.prevOrder(node.left);
      this.prevOrder(node.right);
    }
  }
  nextOrder(node) {
    if (node !== null) {
      this.nextOrder(node.left);
      this.nextOrder(node.right);
      console.log('value:' + node.show())
    }
  }
  getMin(node) {
    if (node !== null) {
      if (node.left === null) {
        console.log(node.show());
      }
      this.getMin(node.left)
    }
    // if(node !== null){
    //   while(node.left !== null){
    //     node = node.left;
    //   }
    //   return node.show()
    // }
  }
  getMax(node) {
    if (node !== null) {
      while (node.right !== null) {
        node = node.right;
      }
      console.log(node.show());
    }
  }
  find(value, node) {
    if (node !== null) {
      // if(node.value > value){
      //   this.find(value,node.left)
      // }else if(node.value < value){
      //   this.find(value,node.right)
      // }else{
      //   return node
      // }
      let c = this.root;
      while (c !== null) {
        if (c.value > value) {
          c = c.left;
        } else if (c.value < value) {
          c = c.right;
        } else {
          return c
        }
      }
    }
  }
  remove1(value) {
    let c = this.root;
    let prev;
    while (c !== null) {
      if (c.value > value) {
        prev = c;
        c = c.left;
      } else if (c.value < value) {
        prev = c;
        c = c.right;
      } else {
        if (c.left === null && c.right === null) {
          return prev
        }
      }
    }
  }
  remove(value) {
    root = this.removeNode(this.root, value);
  }
  removeNode(node, value) {
    if (node == null) {
      return null;
    }
    if (value == node.value) {
      // 没有子节点的节点
      if (node.left == null && node.right == null) {
        return null;
      }
      // 没有左子节点的节点
      if (node.left == null) {
        return node.right;
      }
      // 没有右子节点的节点
      if (node.right == null) {
        return node.left;
      }
      // 有两个子节点的节点
      var tempNode = getSmallest(node.right);
      node.value = tempNode.value;
      node.right = removeNode(node.right, tempNode.value); return node;
    }
    else if (value < node.value) {
      node.left = removeNode(node.left, value);
      return node;
    }
    else {
      node.right = removeNode(node.right, value); return node;
    }
  }
}
let BSTtree = new BST()
BSTtree.insert(5)
BSTtree.insert(1)
BSTtree.insert(4)
BSTtree.insert(3)
BSTtree.insert(6)
// BSTtree.inOrder(BSTtree.root);
// BSTtree.prevOrder(BSTtree.root);
// BSTtree.nextOrder(BSTtree.root);
// BSTtree.getMin(BSTtree.root)
// BSTtree.getMax(BSTtree.root)
// BSTtree.find(22,BSTtree.root)
// BSTtree.remove(22)

/**
 * 最长递增子序列
 * [2,5,8,7,3,4,5,1,6]
 * [2]        [0]
 * [2,5]      [0,1]
 * [2,5,8]    [0,1,2]
 * [2,5,7]    [0,1,3]
 * [2,3,7]    [0,4,3]
 * [2,3,4]    [0,4,5]
 * [2,3,4,5]  [0,4,5,6]
 * [1,3,4,5]  [7,4,5,6]
 * [1,3,4,5,6][7,4,5,6,8]
 */
function getSequence(arr) {
  let result = [0];
  let u, v, c, j;
  let p = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let arrI = arr[i];
    if (arrI !== 0) {
      let j = result[result.length - 1];
      if (arrI > arr[j]) {
        p[i] = j;
        result.push(i);
      } else {
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = ((u + v) / 2) | 0;
          if (arr[result[c]] > arrI) {
            v = c;
          } else {
            u = c + 1;
          }
        }
        if (arr[result[u]] > arrI) {
          if (u > 0) {
            p[i] = result[u - 1]
          }
          result[u] = i;
        }
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
// console.log(getSequence([2, 5, 8, 7, 3, 4, 5, 1, 6]))

/**
 * 二叉树的最大深度
 */
var maxDepth = function(root) {
  if(root === null) {
      return 0
  }else{
      let leftHeight = maxDepth(root.left);
      let rightHeight = maxDepth(root.right);
      return Math.max(leftHeight,rightHeight) + 1;
  }
  
};
// maxDepth(BSTtree.root);

/**
 * 验证二叉搜索树
 * 作者：LeetCode-Solution
 * 链接：https://leetcode-cn.com/problems/validate-binary-search-tree/solution/yan-zheng-er-cha-sou-suo-shu-by-leetcode-solution/
 * 来源：力扣（LeetCode）
 * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
const helper = (root, lower, upper) => {
  if (root === null) {
      return true;
  }
  if (root.val <= lower || root.val >= upper) {
      return false;
  }
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}
var isValidBST1 = function(root) {
  return helper(root, -Infinity, Infinity);
};
// const isValudBST2 = function(root){
//   const result = [];
//   function helper(node){
//     if(node !== null){
//       if(result[result.length-1] > node.val){
//         return false
//       }else{
//         helper(node.left)
//         result.push(node.val);
//         helper(node.right)
//       }
//     }
//   }
//   return helper(root)
// }

let searchTree = {
  val: 5,
  left: {
    val: 1,
    left: null,
    right: null
  },
  right: {
    val: 4,
    left: {
      val: 3,
      left:null,
      right: null
    },
    right: {
      val: 6,
      left: null,
      right: null,
    }
  }
};
// console.log(isValudBST2(searchTree))

/**
 * 对称二叉树
 */
var isSymmetric1 = function(root) {
  const helper = (p, q)=>{
    if(!p && !q) return true
    if(!p || !q) return false
    return p.val === q.val && helper(p.left,q.right) && helper(p.right,q.left)
  }
  return helper(root.left, root.right)
};
const check = (u, v) => {
  const q= [];
  q.push(u),q.push(v);

  while (q.length) {
      u = q.shift();
      v = q.shift();

      if (!u && !v) continue;
      if ((!u || !v) || (u.val !== v.val)) return false;

      q.push(u.left); 
      q.push(v.right);

      q.push(u.right); 
      q.push(v.left);
  }
  return true;
}
var isSymmetric2 = function(root) {
  return check(root, root);
};

let symmetricTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 2,
      left:null,
      right:null
    },
    right: null
  },
  right: {
    val: 2,
    left: {
      val: 2,
      left:null,
      right:null
    },
    right: null
  },
};
// isSymmetric2(symmetricTree)

/**
 * 二叉树的广度优先遍历
 * @param {*} root 
 */
var levelOrder = function(root) {
  const result = [];
  const parent = [root];
  while(parent.length !== 0){
    const len = parent.length;
    result.push([])
    for(let i=0;i<len;i++){
      let node = parent.shift();
      result[result.length-1].push(node.val);
      if(node.left) parent.push(node.left);
      if(node.right) parent.push(node.right);
    }
  }
  return result;
};
// levelOrder(symmetricTree)
