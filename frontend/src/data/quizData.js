export const quizData = {
  react: [
    {
      question: "What is React primarily used for?",
      options: ["Building databases", "Building user interfaces", "Routing", "Styling components"],
      answer: 1
    },
    {
      question: "What syntax extension to JavaScript is typically used with React?",
      options: ["TSX", "JS++", "JSX", "HTMLx"],
      answer: 2
    },
    {
      question: "In React, what are isolated pieces of code that build the UI called?",
      options: ["Modules", "Templates", "Functions", "Components"],
      answer: 3
    }
  ],
  python: [
    {
      question: "Who created Python?",
      options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
      answer: 0
    },
    {
      question: "In what year was Python released?",
      options: ["1989", "1991", "1995", "2000"],
      answer: 1
    },
    {
      question: "Which of the following does Python use to complete a command/scope?",
      options: ["Semicolons", "Curly braces", "Parentheses", "New lines and indentation"],
      answer: 3
    }
  ]
  C: [
    { question: "What is C language?", options: ["High level", "Low level", "Middle level", "None"], answer: "Middle level" },
    { question: "Which symbol ends a statement in C?", options: [".", ":", ";", ","], answer: ";" },
    { question: "What is printf() used for?", options: ["Input", "Output", "Both", "None"], answer: "Output" },
    { question: "Which header file is used for printf?", options: ["stdlib.h", "math.h", "stdio.h", "string.h"], answer: "stdio.h" },
    { question: "What does int mean in C?", options: ["String", "Integer", "Float", "Boolean"], answer: "Integer" },
  ],
  "C++": [
    { question: "C++ is an extension of?", options: ["Java", "Python", "C", "Ruby"], answer: "C" },
    { question: "Which concept is NOT in C++?", options: ["Inheritance", "Polymorphism", "Pointers", "Garbage Collection"], answer: "Garbage Collection" },
    { question: "What is cout used for?", options: ["Input", "Output", "Loop", "Condition"], answer: "Output" },
    { question: "Which keyword defines a class?", options: ["struct", "class", "object", "define"], answer: "class" },
    { question: "What is OOP?", options: ["Object Oriented Programming", "Open Output Program", "Online Object Processing", "None"], answer: "Object Oriented Programming" },
  ],
  Java: [
    { question: "Java is platform independent because of?", options: ["JDK", "JVM", "JRE", "IDE"], answer: "JVM" },
    { question: "Which keyword creates an object?", options: ["create", "object", "new", "make"], answer: "new" },
    { question: "What is System.out.println()?", options: ["Input", "Output", "Loop", "Class"], answer: "Output" },
    { question: "Java file extension is?", options: [".js", ".java", ".jav", ".j"], answer: ".java" },
    { question: "Which is not a Java feature?", options: ["OOP", "Platform Independent", "Pointers", "Multithreading"], answer: "Pointers" },
  ],
  PHP: [
    { question: "PHP stands for?", options: ["Personal Home Page", "Hypertext Preprocessor", "Both A and B", "None"], answer: "Both A and B" },
    { question: "PHP file extension?", options: [".html", ".php", ".py", ".js"], answer: ".php" },
    { question: "Which symbol starts PHP code?", options: ["<?php", "<php", "<?", "#php"], answer: "<?php" },
    { question: "Which function outputs text in PHP?", options: ["print()", "echo()", "Both", "output()"], answer: "Both" },
    { question: "PHP runs on?", options: ["Client side", "Server side", "Both", "None"], answer: "Server side" },
  ],
  SQL: [
    { question: "SQL stands for?", options: ["Structured Query Language", "Simple Query Logic", "System Query Language", "None"], answer: "Structured Query Language" },
    { question: "Which command retrieves data?", options: ["INSERT", "UPDATE", "SELECT", "DELETE"], answer: "SELECT" },
    { question: "Which command adds new data?", options: ["SELECT", "INSERT", "UPDATE", "DROP"], answer: "INSERT" },
    { question: "Which command removes a table?", options: ["DELETE", "REMOVE", "DROP", "CLEAR"], answer: "DROP" },
    { question: "PRIMARY KEY allows?", options: ["Duplicates", "Null values", "Unique values only", "Both A and B"], answer: "Unique values only" },
  ],
  JavaScript: [
    { question: "JavaScript runs on?", options: ["Server", "Browser", "Both", "None"], answer: "Both" },
    { question: "Which keyword declares a variable?", options: ["var", "let", "const", "All of these"], answer: "All of these" },
    { question: "How to write a comment in JS?", options: ["<!-- -->", "//", "#", "/* only"], answer: "//" },
    { question: "Which method adds to an array?", options: ["push()", "add()", "append()", "insert()"], answer: "push()" },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "None"], answer: "Document Object Model" },
  ],
  HTML: [
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "None"], answer: "Hyper Text Markup Language" },
    { question: "Which tag creates a heading?", options: ["<head>", "<h1>", "<heading>", "<title>"], answer: "<h1>" },
    { question: "Which tag creates a link?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
    { question: "Which tag creates an image?", options: ["<image>", "<img>", "<src>", "<pic>"], answer: "<img>" },
    { question: "HTML file extension?", options: [".htm only", ".html only", ".both", ".web"], answer: ".both" },
  ],
  CSS: [
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "None"], answer: "Cascading Style Sheets" },
    { question: "Which property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: "color" },
    { question: "Which property adds space inside element?", options: ["margin", "padding", "border", "spacing"], answer: "padding" },
    { question: "How to make text bold in CSS?", options: ["font-weight: bold", "text-bold: true", "bold: yes", "font-style: bold"], answer: "font-weight: bold" },
    { question: "Which selector selects by class?", options: ["#class", ".class", "*class", "@class"], answer: ".class" },
  ],
  "Node.js": [
    { question: "Node.js is built on?", options: ["Python", "V8 Engine", "Java VM", "Ruby"], answer: "V8 Engine" },
    { question: "Node.js is used for?", options: ["Frontend", "Backend", "Both", "Database"], answer: "Backend" },
    { question: "Which command runs a Node file?", options: ["run", "node", "start", "execute"], answer: "node" },
    { question: "npm stands for?", options: ["Node Package Manager", "New Program Method", "Node Program Module", "None"], answer: "Node Package Manager" },
    { question: "Which module handles files in Node?", options: ["http", "path", "fs", "os"], answer: "fs" },
  ],
  MongoDB: [
    { question: "MongoDB stores data as?", options: ["Tables", "JSON documents", "XML", "CSV"], answer: "JSON documents" },
    { question: "MongoDB is what type of database?", options: ["SQL", "NoSQL", "Graph", "None"], answer: "NoSQL" },
    { question: "Which command inserts in MongoDB?", options: ["insert()", "insertOne()", "add()", "push()"], answer: "insertOne()" },
    { question: "MongoDB collection is similar to SQL?", options: ["Row", "Column", "Table", "Database"], answer: "Table" },
    { question: "Which command finds documents?", options: ["search()", "find()", "get()", "select()"], answer: "find()" },
  ],
  TypeScript: [
    { question: "TypeScript is a superset of?", options: ["Java", "Python", "JavaScript", "C#"], answer: "JavaScript" },
    { question: "TypeScript file extension?", options: [".js", ".ts", ".tsx", "Both .ts and .tsx"], answer: "Both .ts and .tsx" },
    { question: "Which keyword defines a type?", options: ["type", "interface", "Both", "define"], answer: "Both" },
    { question: "TypeScript is compiled to?", options: ["Python", "Java", "JavaScript", "Binary"], answer: "JavaScript" },
    { question: "Who created TypeScript?", options: ["Google", "Facebook", "Microsoft", "Apple"], answer: "Microsoft" },
  ],
  Git: [
    { question: "Git is used for?", options: ["Database management", "Version control", "Web hosting", "Testing"], answer: "Version control" },
    { question: "Which command initializes a repo?", options: ["git start", "git init", "git begin", "git create"], answer: "git init" },
    { question: "Which command saves changes?", options: ["git save", "git push", "git commit", "git add"], answer: "git commit" },
    { question: "Which command uploads to remote?", options: ["git upload", "git push", "git send", "git commit"], answer: "git push" },
    { question: "Which command downloads changes?", options: ["git download", "git fetch", "git pull", "git get"], answer: "git pull" },
  ],
  "Power BI": [
    { question: "Power BI is made by?", options: ["Google", "Microsoft", "Apple", "IBM"], answer: "Microsoft" },
    { question: "Power BI is used for?", options: ["Coding", "Data Visualization", "Web Development", "Gaming"], answer: "Data Visualization" },
    { question: "What is DAX in Power BI?", options: ["Data Analysis Expressions", "Dynamic Array Extension", "Data Access XML", "None"], answer: "Data Analysis Expressions" },
    { question: "Power BI Desktop file extension?", options: [".pbi", ".pbix", ".powerbi", ".xlsx"], answer: ".pbix" },
    { question: "What is a slicer in Power BI?", options: ["Chart type", "Filter tool", "Data source", "Report page"], answer: "Filter tool" },
  ],
  Excel: [
    { question: "Excel is made by?", options: ["Google", "Apple", "Microsoft", "IBM"], answer: "Microsoft" },
    { question: "Which symbol starts a formula?", options: ["#", "@", "=", "$"], answer: "=" },
    { question: "Which function adds numbers?", options: ["ADD()", "PLUS()", "SUM()", "TOTAL()"], answer: "SUM()" },
    { question: "Excel file extension?", options: [".doc", ".xls", ".xlsx", "Both .xls and .xlsx"], answer: "Both .xls and .xlsx" },
    { question: "VLOOKUP is used for?", options: ["Chart creation", "Searching data", "Sorting", "Filtering"], answer: "Searching data" },
  ],
};
