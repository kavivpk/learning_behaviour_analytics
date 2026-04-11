export const quizData = {
  react: [
    { question: "What is React primarily used for?", options: ["Building databases", "Building user interfaces", "Routing", "Styling components"], answer: 1, level: 1, focus: "Architecture" },
    { question: "What syntax extension to JavaScript is typically used with React?", options: ["TSX", "JS++", "JSX", "HTMLx"], answer: 2, level: 1, focus: "Syntax" },
    { question: "In React, what are isolated pieces of code that build the UI called?", options: ["Modules", "Templates", "Functions", "Components"], answer: 3, level: 2, focus: "Reusability" },
    { question: "Which hook is used to manage state in a functional component?", options: ["useEffect", "useContext", "useState", "useReducer"], answer: 2, level: 3, focus: "Hooks" }
  ],
  python: [
    { question: "Who created Python?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"], answer: 0, level: 1, focus: "History" },
    { question: "In what year was Python released?", options: ["1989", "1991", "1995", "2000"], answer: 1, level: 1, focus: "History" },
    { question: "Which of the following does Python use to define scope?", options: ["Semicolons", "Curly braces", "Parentheses", "Indentation"], answer: 3, level: 2, focus: "Syntax" },
    { question: "Which keyword is used to create a function in Python?", options: ["function", "def", "func", "define"], answer: 1, level: 2, focus: "Logic" }
  ],
  C: [
    { question: "What is C language?", options: ["High level", "Low level", "Middle level", "None"], answer: 2, level: 1, focus: "Fundamentals" },
    { question: "Which symbol ends a statement in C?", options: [".", ":", ";", ","], answer: 2, level: 1, focus: "Syntax" },
  ],
  "C++": [
    { question: "C++ is an extension of?", options: ["Java", "Python", "C", "Ruby"], answer: 2, level: 1, focus: "History" },
    { question: "Which concept is NOT in C++?", options: ["Inheritance", "Polymorphism", "Pointers", "Garbage Collection"], answer: 3, level: 2, focus: "Memory Management" },
  ],
  DBMS: [
    { question: "What does DBMS stand for?", options: ["Database Management System", "Data Base Main System", "Digital Backup Mode", "None"], answer: 0, level: 1, focus: "Infrastructure" },
    { question: "Which of these is a relational database?", options: ["MongoDB", "Redis", "MySQL", "Cassandra"], answer: 2, level: 2, focus: "Relational Mapping" },
    { question: "Which key uniquely identifies a record?", options: ["Foreign Key", "Super Key", "Primary Key", "Candidate Key"], answer: 2, level: 2, focus: "Integrity" },
  ],
  "Data Structures": [
    { question: "Which structure follows LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1, level: 1, focus: "Memory Logic" },
    { question: "Which structure is best for hierarchical data?", options: ["Array", "Linked List", "Tree", "Stack"], answer: 2, level: 2, focus: "Hierarchy" },
    { question: "Time complexity of searching in a BST (balanced)?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 2, level: 3, focus: "Optimization" },
  ],
  DSA: [
    { question: "Which algorithm uses Divide and Conquer?", options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"], answer: 1, level: 2, focus: "Algorithms" },
    { question: "What is the space complexity of an array of size n?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 1, level: 1, focus: "Complexity" },
  ],
  Cybersecurity: [
    { question: "What does 'CIA' triad stand for in security?", options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Code, Input, Access", "None"], answer: 1, level: 1, focus: "Principles" },
    { question: "Which attack floods a system with traffic?", options: ["Phishing", "SQL Injection", "DDoS", "Man-in-the-middle"], answer: 2, level: 2, focus: "Attacks" },
  ],
  "Data Science": [
    { question: "Which library is used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], answer: 1, level: 2, focus: "Tooling" },
    { question: "What is 'Mean' in statistics?", options: ["Middle value", "Most frequent value", "Average value", "Difference between max and min"], answer: 2, level: 1, focus: "Stats" },
  ],
  NumPy: [
    { question: "In NumPy, what is an array called?", options: ["List", "ndarray", "Collection", "Vector"], answer: 1, level: 1, focus: "Arrays" },
    { question: "Which method creates a range of numbers?", options: ["arrange", "arange", "range", "linspace"], answer: 1, level: 2, focus: "Creation" },
  ],
  SQL: [
    { question: "Which keyword removes duplicates from search results?", options: ["UNIQUE", "DISTINCT", "ONLY", "SINGLE"], answer: 1, level: 2, focus: "Queries" },
    { question: "Which clause groups the results?", options: ["GROUP BY", "ORDER BY", "WHERE", "JOIN"], answer: 0, level: 2, focus: "Aggregation" },
  ],
  JavaScript: [
    { question: "What is 'Hoisting'?", options: ["Moving declarations to top", "Lifting page content", "Variable deletion", "None"], answer: 0, level: 3, focus: "Runtime" },
    { question: "Which function executes after a delay?", options: ["setInterval", "setTimeout", "setWait", "delay"], answer: 1, level: 2, focus: "Async" },
  ]
};
