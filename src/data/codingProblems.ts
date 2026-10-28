import { CodingProblem } from '../types/index.ts';

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Beginner',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, so indices are [1, 2].',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (mp.count(diff)) return {mp[diff], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[]{map.get(comp), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
    },
    testCases: [
      { input: '[2, 7, 11, 15]\n9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4]\n6', expectedOutput: '[1, 2]' },
      { input: '[3, 3]\n6', expectedOutput: '[0, 1]' },
    ],
    timeLimitMs: 1000,
    xpReward: 60,
    hints: [
      'A brute force approach checks all pairs in O(n^2). Can we do better?',
      'Can we trade space for speed using a Hash Table to look up the complement in O(1)?',
    ],
    acceptanceRate: 84.5,
  },
  {
    id: 'prob-2',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Beginner',
    category: 'Stack',
    tags: ['String', 'Stack'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
    },
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"([{}])"', expectedOutput: 'true' },
    ],
    timeLimitMs: 800,
    xpReward: 70,
    hints: [
      'Think about the Last-In First-Out (LIFO) property of a Stack data structure.',
      'Whenever you see an opening bracket, push it. When you encounter a closing bracket, check if it matches the top of the stack.',
    ],
    acceptanceRate: 79.2,
  },
  {
    id: 'prob-3',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Intermediate',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const set = new Set();
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, ch in enumerate(s):
        if ch in char_map and char_map[ch] >= left:
            left = char_map[ch] + 1
        char_map[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> seen;
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.size(); right++) {
        if (seen.count(s[right]) && seen[s[right]] >= left) {
            left = seen[s[right]] + 1;
        }
        seen[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    int max = 0, left = 0;
    Map<Character, Integer> map = new HashMap<>();
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c) && map.get(c) >= left) {
            left = map.get(c) + 1;
        }
        map.put(c, right);
        max = Math.max(max, right - left + 1);
    }
    return max;
}`,
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' },
      { input: '"pwwkew"', expectedOutput: '3' },
      { input: '""', expectedOutput: '0' },
    ],
    timeLimitMs: 1200,
    xpReward: 120,
    hints: [
      'Use a sliding window bounded by [left, right] pointers.',
      'Maintain a set or hash table of visited characters within the active window.',
    ],
    acceptanceRate: 58.1,
  },
  {
    id: 'prob-4',
    title: 'Coin Change (Min Coins)',
    slug: 'coin-change',
    difficulty: 'Intermediate',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins)',
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
      },
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4',
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    },
    testCases: [
      { input: '[1, 2, 5]\n11', expectedOutput: '3' },
      { input: '[2]\n3', expectedOutput: '-1' },
      { input: '[1]\n0', expectedOutput: '0' },
      { input: '[1, 5, 10, 25]\n30', expectedOutput: '2' },
    ],
    timeLimitMs: 1500,
    xpReward: 150,
    hints: [
      'Define dp[i] as the minimum coins needed to make amount i.',
      'Transition: dp[i] = min(dp[i], dp[i - coin] + 1) for every coin <= i.',
    ],
    acceptanceRate: 46.8,
  },
  {
    id: 'prob-5',
    title: 'Lowest Common Ancestor of a Binary Tree',
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    difficulty: 'Intermediate',
    category: 'Trees & Graphs',
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”`,
    examples: [
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        output: '3',
        explanation: 'The LCA of nodes 5 and 1 is 3.',
      },
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4',
        output: '5',
        explanation: 'The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q and both p and q will exist in the tree.',
    ],
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {
  if (!root || root.val === p || root.val === q) return root ? root.val : null;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root.val;
  return left || right;
}`,
      python: `def lowest_common_ancestor(root, p, q):
    if not root or root.val == p or root.val == q:
        return root.val if root else None
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root.val
    return left or right`,
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`,
    },
    testCases: [
      { input: 'root = [3,5,1,6,2,0,8]\np = 5, q = 1', expectedOutput: '3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4]\np = 5, q = 4', expectedOutput: '5' },
    ],
    timeLimitMs: 1000,
    xpReward: 140,
    hints: [
      'If the current node is equal to p or q, we found one of them and return it.',
      'Recursively search left and right subtrees. If both return non-null, current node is the LCA!',
    ],
    acceptanceRate: 61.4,
  },
  {
    id: 'prob-6',
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.',
      },
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6',
    ],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let low = 0, high = m;
  while (low <= high) {
    const partitionX = (low + high) >> 1;
    const partitionY = ((m + n + 1) >> 1) - partitionX;
    const maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minX = partitionX === m ? Infinity : nums1[partitionX];
    const maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minY = partitionY === n ? Infinity : nums2[partitionY];
    if (maxX <= minY && maxY <= minX) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
      } else {
        return Math.max(maxX, maxY);
      }
    } else if (maxX > minY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  return 0;
}`,
      python: `def find_median_sorted_arrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    while low <= high:
        pX = (low + high) // 2
        pY = (m + n + 1) // 2 - pX
        maxX = float('-inf') if pX == 0 else nums1[pX - 1]
        minX = float('inf') if pX == m else nums1[pX]
        maxY = float('-inf') if pY == 0 else nums2[pY - 1]
        minY = float('inf') if pY == n else nums2[pY]
        if maxX <= minY and maxY <= minX:
            if (m + n) % 2 == 0:
                return (max(maxX, maxY) + min(minX, minY)) / 2.0
            return float(max(maxX, maxY))
        elif maxX > minY:
            high = pX - 1
        else:
            low = pX + 1
    return 0.0`,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    int m = nums1.size(), n = nums2.size();
    int low = 0, high = m;
    while (low <= high) {
        int pX = (low + high) / 2;
        int pY = (m + n + 1) / 2 - pX;
        int maxX = (pX == 0) ? INT_MIN : nums1[pX - 1];
        int minX = (pX == m) ? INT_MAX : nums1[pX];
        int maxY = (pY == 0) ? INT_MIN : nums2[pY - 1];
        int minY = (pY == n) ? INT_MAX : nums2[pY];
        if (maxX <= minY && maxY <= minX) {
            if ((m + n) % 2 == 0) return (max(maxX, maxY) + min(minX, minY)) / 2.0;
            return max(maxX, maxY);
        } else if (maxX > minY) high = pX - 1;
        else low = pX + 1;
    }
    return 0.0;
}`,
      java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    int m = nums1.length, n = nums2.length;
    int low = 0, high = m;
    while (low <= high) {
        int pX = (low + high) / 2;
        int pY = (m + n + 1) / 2 - pX;
        int maxX = (pX == 0) ? Integer.MIN_VALUE : nums1[pX - 1];
        int minX = (pX == m) ? Integer.MAX_VALUE : nums1[pX];
        int maxY = (pY == 0) ? Integer.MIN_VALUE : nums2[pY - 1];
        int minY = (pY == n) ? Integer.MAX_VALUE : nums2[pY];
        if (maxX <= minY && maxY <= minX) {
            if ((m + n) % 2 == 0) return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2.0;
            return Math.max(maxX, maxY);
        } else if (maxX > minY) high = pX - 1;
        else low = pX + 1;
    }
    return 0.0;
}`,
    },
    testCases: [
      { input: '[1, 3]\n[2]', expectedOutput: '2' },
      { input: '[1, 2]\n[3, 4]', expectedOutput: '2.5' },
      { input: '[0, 0]\n[0, 0]', expectedOutput: '0' },
    ],
    timeLimitMs: 2000,
    xpReward: 250,
    hints: [
      'Binary search on the partition of the shorter array.',
      'Ensure left elements are <= right elements across both partitions.',
    ],
    acceptanceRate: 38.2,
  },
];
