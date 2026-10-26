export const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    description: 'Find two indices whose values add up to a given target.',
    constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
    starterCode: {
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[] {0, 0};\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {0, 0};\n    }\n};'
    }
  },
  {
    id: 2,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topic: 'Arrays',
    description: 'Maximize profit by choosing one buy and one sell day.',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    starterCode: {
      java: 'class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 3,
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topic: 'Hashing',
    description: 'Check whether any value appears at least twice in the array.',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 4,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topic: 'Strings',
    description: 'Determine whether two strings are anagrams of each other.',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t contain lowercase English letters'],
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 5,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    description: 'Check if a string is a palindrome after ignoring non-alphanumeric characters.',
    constraints: ['0 <= s.length <= 2 * 10^5', 's consists of printable ASCII characters'],
    examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isPalindrome(string s) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 6,
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    topic: 'Sorting',
    description: 'Merge the second array into the first while keeping order sorted.',
    constraints: ['m, n >= 0', 'nums1 length = m + n', 'nums1 and nums2 sorted'],
    examples: [{ input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' }],
    starterCode: {
      java: 'class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n    }\n}',
      cpp: 'class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    }\n};'
    }
  },
  {
    id: 7,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    description: 'Find the length of the longest substring with all unique characters.',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    starterCode: {
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 8,
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    description: 'Find the minimum length of a subarray with sum at least target.',
    constraints: ['1 <= nums.length <= 10^5', '1 <= target <= 10^9'],
    examples: [{ input: 'nums = [2,3,1,2,4,3], target = 7', output: '2' }],
    starterCode: {
      java: 'class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 9,
    title: 'Search Insert Position',
    difficulty: 'Easy',
    topic: 'Binary Search',
    description: 'Return the index where a target should be inserted in a sorted array.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4'],
    examples: [{ input: 'nums = [1,3,5,6], target = 5', output: '2' }],
    starterCode: {
      java: 'class Solution {\n    public int searchInsert(int[] nums, int target) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 10,
    title: 'Binary Search',
    difficulty: 'Easy',
    topic: 'Binary Search',
    description: 'Return the index of the target if it exists, otherwise -1.',
    constraints: ['1 <= nums.length <= 10^5', 'nums is sorted and unique'],
    examples: [{ input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' }],
    starterCode: {
      java: 'class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};'
    }
  },
  {
    id: 11,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    description: 'Count the number of distinct ways to climb n stairs.',
    constraints: ['1 <= n <= 45'],
    examples: [{ input: 'n = 2', output: '2' }],
    starterCode: {
      java: 'class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 12,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: 'Find the contiguous subarray with the largest sum.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
    starterCode: {
      java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 13,
    title: 'Happy Number',
    difficulty: 'Easy',
    topic: 'Hashing',
    description: 'Determine whether a number eventually reaches 1 by repeatedly summing squares of digits.',
    constraints: ['1 <= n <= 2^31 - 1'],
    examples: [{ input: 'n = 19', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isHappy(int n) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isHappy(int n) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 14,
    title: 'Word Pattern',
    difficulty: 'Easy',
    topic: 'Hashing',
    description: 'Check whether a pattern matches a string of words bijectively.',
    constraints: ['pattern length <= 300', 'words length <= 300'],
    examples: [{ input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean wordPattern(String pattern, String s) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool wordPattern(string pattern, string s) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 15,
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topic: 'Heaps',
    description: 'Return the k most frequent elements in descending order of frequency.',
    constraints: ['1 <= nums.length <= 10^5', '1 <= k <= nums.length'],
    examples: [{ input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' }],
    starterCode: {
      java: 'class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        return new int[] {};\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 16,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topic: 'Hashing',
    description: 'Group strings that are anagrams of each other.',
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[ ["eat","tea","ate"],["tan","nat"],["bat"] ]' }],
    starterCode: {
      java: 'class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 17,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topic: 'Arrays',
    description: 'Compute an output array where each element is the product of all numbers except itself.',
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
    starterCode: {
      java: 'class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[] {};\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 18,
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    topic: 'Trees and Binary Search Trees',
    description: 'Verify whether a binary tree satisfies the BST property.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4]'],
    examples: [{ input: 'root = [2,1,3]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 19,
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    topic: 'Trees and Binary Search Trees',
    description: 'Check whether a binary tree is mirror-symmetric.',
    constraints: ['0 <= number of nodes <= 1000'],
    examples: [{ input: 'root = [1,2,2,3,4,4,3]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 20,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees and Binary Search Trees',
    description: 'Swap left and right children of every node in the tree.',
    constraints: ['0 <= number of nodes <= 100'],
    examples: [{ input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }],
    starterCode: {
      java: 'class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        return root;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        return root;\n    }\n};'
    }
  },
  {
    id: 21,
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees and Binary Search Trees',
    description: 'Find the maximum depth of a binary tree.',
    constraints: ['0 <= number of nodes <= 10^4'],
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
    starterCode: {
      java: 'class Solution {\n    public int maxDepth(TreeNode root) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 22,
    title: 'Same Tree',
    difficulty: 'Easy',
    topic: 'Trees and Binary Search Trees',
    description: 'Check if two binary trees are structurally identical.',
    constraints: ['0 <= number of nodes <= 1000'],
    examples: [{ input: 'p = [1,2,3], q = [1,2,3]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 23,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    description: 'Merge two sorted singly linked lists into one sorted list.',
    constraints: ['The number of nodes in both lists is in the range [0, 50]'],
    examples: [{ input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' }],
    starterCode: {
      java: 'class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        return list1;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        return list1;\n    }\n};'
    }
  },
  {
    id: 24,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    description: 'Reverse a singly linked list in place.',
    constraints: ['The number of nodes in the list is in the range [0, 5000]'],
    examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    starterCode: {
      java: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        return head;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        return head;\n    }\n};'
    }
  },
  {
    id: 25,
    title: 'Palindrome Linked List',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    description: 'Check whether a linked list reads the same forwards and backwards.',
    constraints: ['The number of nodes in the list is in the range [1, 10^5]'],
    examples: [{ input: 'head = [1,2,2,1]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isPalindrome(ListNode head) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 26,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stacks and Queues',
    description: 'Determine whether the brackets in a string are balanced.',
    constraints: ['1 <= s.length <= 10^4', 's contains only parentheses, brackets, and braces'],
    examples: [{ input: 's = "([{}])"', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 27,
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    topic: 'Stacks and Queues',
    description: 'For each day, return the number of days until a warmer temperature appears.',
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    examples: [{ input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' }],
    starterCode: {
      java: 'class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        return new int[] {};\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 28,
    title: 'Min Stack',
    difficulty: 'Medium',
    topic: 'Stacks and Queues',
    description: 'Design a stack that supports push, pop, top, and minimum retrieval in O(1).',
    constraints: ['Push, pop, top, getMin are called at most 3 * 10^4 times'],
    examples: [{ input: 'push(-2); push(0); push(-3); getMin(); pop(); top(); getMin()', output: '[-3,0,-2]' }],
    starterCode: {
      java: 'class MinStack {\n    public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}',
      cpp: 'class MinStack {\npublic:\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};'
    }
  },
  {
    id: 29,
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    topic: 'Recursion and Backtracking',
    description: 'Return all valid combinations of n pairs of parentheses.',
    constraints: ['1 <= n <= 8'],
    examples: [{ input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' }],
    starterCode: {
      java: 'class Solution {\n    public List<String> generateParenthesis(int n) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 30,
    title: 'Permutations',
    difficulty: 'Medium',
    topic: 'Recursion and Backtracking',
    description: 'Generate all distinct permutations of a given array of numbers.',
    constraints: ['1 <= nums.length <= 6'],
    examples: [{ input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' }],
    starterCode: {
      java: 'class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 31,
    title: 'Subsets',
    difficulty: 'Medium',
    topic: 'Recursion and Backtracking',
    description: 'Return all subsets of the given set of integers.',
    constraints: ['1 <= nums.length <= 10'],
    examples: [{ input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }],
    starterCode: {
      java: 'class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 32,
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    topic: 'Recursion and Backtracking',
    description: 'Return all possible letter combinations for a digit string.',
    constraints: ['0 <= digits.length <= 4', 'digits contains only digits 2-9'],
    examples: [{ input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }],
    starterCode: {
      java: 'class Solution {\n    public List<String> letterCombinations(String digits) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 33,
    title: 'N-Queens',
    difficulty: 'Hard',
    topic: 'Recursion and Backtracking',
    description: 'Place N queens on an N x N board so no two attack each other.',
    constraints: ['1 <= n <= 9'],
    examples: [{ input: 'n = 4', output: '[ [".Q..","...Q","Q...","..Q."], ["..Q.","Q...","...Q",".Q.."] ]' }],
    starterCode: {
      java: 'class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 34,
    title: 'Word Ladder',
    difficulty: 'Hard',
    topic: 'Graphs',
    description: 'Find the minimum number of transformations to turn one word into another.',
    constraints: ['1 <= beginWord.length <= 5', 'words length <= 5000'],
    examples: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' }],
    starterCode: {
      java: 'class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 35,
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    description: 'Count connected groups of land cells in a grid.',
    constraints: ['m, n >= 1', 'm, n <= 300'],
    examples: [{ input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' }],
    starterCode: {
      java: 'class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 36,
    title: 'Course Schedule',
    difficulty: 'Medium',
    topic: 'Graphs',
    description: 'Determine if the course prerequisites can be finished without impossible cycles.',
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1) / 2'],
    examples: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        return false;\n    }\n};'
    }
  },
  {
    id: 37,
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    topic: 'Heaps',
    description: 'Find the kth largest element in a non-empty array.',
    constraints: ['1 <= k <= nums.length <= 10^4'],
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
    starterCode: {
      java: 'class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 38,
    title: 'Sort Colors',
    difficulty: 'Medium',
    topic: 'Sorting',
    description: 'Sort an array containing only 0, 1, and 2 using constant extra space.',
    constraints: ['n == nums.length', '1 <= n <= 10^5'],
    examples: [{ input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }],
    starterCode: {
      java: 'class Solution {\n    public void sortColors(int[] nums) {\n    }\n}',
      cpp: 'class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n    }\n};'
    }
  },
  {
    id: 39,
    title: 'First Bad Version',
    difficulty: 'Easy',
    topic: 'Binary Search',
    description: 'Find the first index where a version is bad using a boolean API.',
    constraints: ['1 <= n <= 2^31 - 1'],
    examples: [{ input: 'n = 5, bad = 4', output: '4' }],
    starterCode: {
      java: 'class Solution extends VersionControl {\n    public int firstBadVersion(int n) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int firstBadVersion(int n) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 40,
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: 'Find the length of the longest strictly increasing subsequence.',
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    examples: [{ input: 'nums = [10,9,2,5,3,7,101,18]', output: '4' }],
    starterCode: {
      java: 'class Solution {\n    public int lengthOfLIS(int[] nums) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 41,
    title: 'Rotate Array',
    difficulty: 'Medium',
    topic: 'Arrays',
    description: 'Rotate an array to the right by k steps.',
    constraints: ['1 <= nums.length <= 10^5', '0 <= k <= 10^5'],
    examples: [{ input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' }],
    starterCode: {
      java: 'class Solution {\n    public void rotate(int[] nums, int k) {\n    }\n}',
      cpp: 'class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n    }\n};'
    }
  },
  {
    id: 42,
    title: 'Majority Element',
    difficulty: 'Easy',
    topic: 'Hashing',
    description: 'Find the majority element that appears more than half the time.',
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [2,2,1,2,1,2]', output: '2' }],
    starterCode: {
      java: 'class Solution {\n    public int majorityElement(int[] nums) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 43,
    title: 'Missing Number',
    difficulty: 'Easy',
    topic: 'Arrays',
    description: 'Find the missing number in a sequence from 0 to n.',
    constraints: ['0 <= nums[i] <= n', 'n <= 10^4'],
    examples: [{ input: 'nums = [3,0,1]', output: '2' }],
    starterCode: {
      java: 'class Solution {\n    public int missingNumber(int[] nums) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 44,
    title: 'Combination Sum',
    difficulty: 'Medium',
    topic: 'Recursion and Backtracking',
    description: 'Find all unique combinations that sum to the target.',
    constraints: ['1 <= candidates.length <= 30', '1 <= target <= 500'],
    examples: [{ input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' }],
    starterCode: {
      java: 'class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 45,
    title: 'House Robber',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: 'Maximize total amount robbed without stealing from adjacent houses.',
    constraints: ['1 <= nums.length <= 400', '0 <= nums[i] <= 400'],
    examples: [{ input: 'nums = [2,7,9,3,1]', output: '12' }],
    starterCode: {
      java: 'class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 46,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees and Binary Search Trees',
    description: 'Return the level-order traversal of a binary tree.',
    constraints: ['The number of nodes in the tree is in the range [0, 2000]'],
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
    starterCode: {
      java: 'class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        return new ArrayList<>();\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        return {};\n    }\n};'
    }
  },
  {
    id: 47,
    title: 'Minimum Path Sum',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: 'Minimize the sum of numbers along a path from top-left to bottom-right.',
    constraints: ['m, n >= 1', 'm, n <= 200'],
    examples: [{ input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7' }],
    starterCode: {
      java: 'class Solution {\n    public int minPathSum(int[][] grid) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 48,
    title: 'Coin Change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: 'Return the minimum number of coins needed to make up an amount.',
    constraints: ['1 <= coins.length <= 12', '1 <= amount <= 10^4'],
    examples: [{ input: 'coins = [1,2,5], amount = 11', output: '3' }],
    starterCode: {
      java: 'class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return 0;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        return 0;\n    }\n};'
    }
  },
  {
    id: 49,
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    topic: 'Stacks and Queues',
    description: 'Use two stacks to simulate queue operations.',
    constraints: ['1 <= operations <= 100'],
    examples: [{ input: 'push(1), push(2), peek(), pop(), empty()', output: '[1,1,false]' }],
    starterCode: {
      java: 'class MyQueue {\n    public void push(int x) {}\n    public int pop() { return 0; }\n    public int peek() { return 0; }\n    public boolean empty() { return false; }\n}',
      cpp: 'class MyQueue {\npublic:\n    void push(int x) {}\n    int pop() { return 0; }\n    int peek() { return 0; }\n    bool empty() { return false; }\n};'
    }
  },
  {
    id: 50,
    title: 'Jump Game',
    difficulty: 'Medium',
    topic: 'Greedy Algorithms',
    description: 'Determine whether you can reach the last index by jumping.',
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    examples: [{ input: 'nums = [2,3,1,1,4]', output: 'true' }],
    starterCode: {
      java: 'class Solution {\n    public boolean canJump(int[] nums) {\n        return false;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        return false;\n    }\n};'
    }
  }
];
