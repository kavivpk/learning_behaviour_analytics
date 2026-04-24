export const quizData = {
  html: [
    // Fundamentals (15 Qs)
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "None"], answer: 0, focus: "Fundamentals" },
    { question: "Who is making the Web standards?", options: ["Google", "The World Wide Web Consortium", "Microsoft", "Mozilla"], answer: 1, focus: "Fundamentals" },
    { question: "What is the correct HTML element for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2, focus: "Fundamentals" },
    { question: "Which character is used to indicate an end tag?", options: ["^", "<", "/", "*"], answer: 2, focus: "Fundamentals" },
    { question: "What is the correct HTML for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "None"], answer: 1, focus: "Fundamentals" },
    { question: "Which element is used to define importance text?", options: ["<strong>", "<important>", "<i>", "<b>"], answer: 0, focus: "Fundamentals" },
    { question: "HTML tags are case sensitive?", options: ["True", "False"], answer: 1, focus: "Fundamentals" },
    { question: "Which tag is used for the smallest heading?", options: ["<h1>", "<h6>", "<head>", "<p>"], answer: 1, focus: "Fundamentals" },
    { question: "What is the purpose of <!DOCTYPE html>?", options: ["To define document type", "To add style", "To include JS", "To create a body"], answer: 0, focus: "Fundamentals" },
    { question: "Which attribute provides extra information about an element?", options: ["id", "class", "title", "info"], answer: 2, focus: "Fundamentals" },
    { question: "Which element is used to group inline-elements?", options: ["<div>", "<span>", "<section>", "<aside>"], answer: 1, focus: "Fundamentals" },
    { question: "Which element is used to group block-elements?", options: ["<span>", "<div>", "<nav>", "<main>"], answer: 1, focus: "Fundamentals" },
    { question: "The <meta> tag belongs to which section?", options: ["<body>", "<head>", "<footer>", "<header>"], answer: 1, focus: "Fundamentals" },
    { question: "Which element defines the title for the browser tab?", options: ["<head>", "<meta>", "<title>", "<tab>"], answer: 2, focus: "Fundamentals" },
    { question: "What is the correct way to add a comment in HTML?", options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"], answer: 1, focus: "Fundamentals" },

    // Forms (15 Qs)
    { question: "Which element is used to create a form in HTML?", options: ["<input>", "<form>", "<fieldset>", "<submit>"], answer: 1, focus: "Forms" },
    { question: "What is the default type for an <input> element?", options: ["button", "submit", "text", "check"], answer: 2, focus: "Forms" },
    { question: "How to make a mandatory input field?", options: ["name='must'", "required", "validate", "check"], answer: 1, focus: "Forms" },
    { question: "What is the purpose of the <label> tag?", options: ["To add style", "To link input ID", "To create a button", "To group items"], answer: 1, focus: "Forms" },
    { question: "Which attribute defines where to send form data?", options: ["method", "action", "src", "target"], answer: 1, focus: "Forms" },
    { question: "Which method is safer for sensitive data like passwords?", options: ["GET", "POST", "PUSH", "SEND"], answer: 1, focus: "Forms" },
    { question: "How do you define multiple lines in a form?", options: ["<input type='text'>", "<text>", "<textarea>", "<lines>"], answer: 2, focus: "Forms" },
    { question: "Which element is used to group related data in a form?", options: ["<form>", "<fieldset>", "<legend>", "<group>"], answer: 1, focus: "Forms" },
    { question: "What does <legend> do?", options: ["Creates a title for fieldset", "Creates a link", "Adds a background", "None"], answer: 0, focus: "Forms" },
    { question: "Which input type is used for a slider?", options: ["text", "number", "range", "slider"], answer: 2, focus: "Forms" },
    { question: "Which input type allows picking a date?", options: ["text", "date", "calendar", "time"], answer: 1, focus: "Forms" },
    { question: "Which attribute specifies a hint for the user?", options: ["placeholder", "value", "name", "id"], answer: 0, focus: "Forms" },
    { question: "How to make a radio button selected by default?", options: ["active", "checked", "selected", "primary"], answer: 1, focus: "Forms" },
    { question: "Which element is used to submit a form?", options: ["<input type='submit'>", "<button>", "Both", "None"], answer: 2, focus: "Forms" },
    { question: "How to prevent a form from submitting if data is invalid?", options: ["HTML5 Validation", "Using JS", "Both", "None"], answer: 2, focus: "Forms" },

    // Media (10 Qs)
    { question: "Which tag is used to define an image?", options: ["<pic>", "<img>", "<image>", "<src>"], answer: 1, focus: "Media" },
    { question: "What attribute specifies the image path?", options: ["href", "src", "link", "alt"], answer: 1, focus: "Media" },
    { question: "What is the purpose of the 'alt' attribute?", options: ["Alternate text", "Alignment", "Altitude", "Algorithm"], answer: 0, focus: "Media" },
    { question: "Which attribute sets the width of an image?", options: ["w", "width", "size", "dimension"], answer: 1, focus: "Media" },
    { question: "Which tag is used for audio content?", options: ["<sound>", "<music>", "<audio>", "<voice>"], answer: 2, focus: "Media" },
    { question: "Which attribute must be added to show play buttons in audio/video?", options: ["play", "buttons", "controls", "showui"], answer: 2, focus: "Media" },
    { question: "Which element specifies a source for media elements?", options: ["<src>", "<file>", "<source>", "<link>"], answer: 2, focus: "Media" },
    { question: "Which tag is used for video content?", options: ["<movie>", "<film>", "<video>", "<media>"], answer: 2, focus: "Media" },
    { question: "What happens if a browser doesn't support a video tag?", options: ["Errors out", "Downloads the file", "Displays fallback text inside the tag", "Nothing"], answer: 2, focus: "Media" },
    { question: "Which element is used for vector graphics?", options: ["<canvas>", "<svg>", "<vector>", "<img-draw>"], answer: 1, focus: "Media" },
  ],
  
  java: [
    // Basics (10 Qs)
    { question: "Who created Java?", options: ["James Gosling", "Dennis Ritchie", "Guido", "Bjarne"], answer: 0, focus: "Basics" },
    { question: "Which component is needed to compile Java code?", options: ["JRE", "JVM", "JDK", "JIT"], answer: 2, focus: "Basics" },
    { question: "Is Java platform independent?", options: ["Yes", "No"], answer: 0, focus: "Basics" },
    { question: "What is the extension of Java byte code?", options: [".java", ".cpp", ".class", ".exe"], answer: 2, focus: "Basics" },
    { question: "Which of these is a reserved keyword?", options: ["main", "null", "if", "static"], answer: 3, focus: "Basics" },
    { question: "What is JIT compiler?", options: ["Just-In-Time", "Java-Int-Time", "Joint-Inter-Time", "None"], answer: 0, focus: "Basics" },
    { question: "How many primitive data types are in Java?", options: ["4", "8", "6", "10"], answer: 1, focus: "Basics" },
    { question: "Which value is the default for a boolean variable?", options: ["true", "false", "null", "0"], answer: 1, focus: "Basics" },
    { question: "Which loop is guaranteed to execute at least once?", options: ["for", "while", "do-while", "foreach"], answer: 2, focus: "Basics" },
    { question: "What is the size of float in Java?", options: ["16 bit", "32 bit", "64 bit", "8 bit"], answer: 1, focus: "Basics" },

    // OOPs (10 Qs)
    { question: "Which principle focuses on data safety?", options: ["Abstraction", "Inheritance", "Encapsulation", "Polymorphism"], answer: 2, focus: "OOPs" },
    { question: "What keyword is used to access the parent class?", options: ["this", "super", "parent", "base"], answer: 1, focus: "OOPs" },
    { question: "Can a constructor be static?", options: ["Yes", "No"], answer: 1, focus: "OOPs" },
    { question: "Which keyword prevents inheritance?", options: ["finally", "final", "abstract", "const"], answer: 1, focus: "OOPs" },
    { question: "What is Abstraction?", options: ["Hiding implementation details", "Hiding data", "Reusing code", "None"], answer: 0, focus: "OOPs" },
    { question: "Method Overloading is an example of?", options: ["Compile-time polymorphism", "Runtime polymorphism", "Inheritance", "Abstraction"], answer: 0, focus: "OOPs" },
    { question: "Which keyword is used for interfaces?", options: ["inherits", "implements", "extends", "connect"], answer: 1, focus: "OOPs" },
    { question: "Multiple inheritance is achieved in Java through?", options: ["Classes", "Abstract Classes", "Interfaces", "None"], answer: 2, focus: "OOPs" },
    { question: "Which access modifier has the most restricted scope?", options: ["public", "protected", "default", "private"], answer: 3, focus: "OOPs" },
    { question: "What is a 'this' keyword used for?", options: ["Current Instance", "Parent Instance", "Static Context", "None"], answer: 0, focus: "OOPs" },

    // Exception Handling (8 Qs)
    { question: "Which block is always executed regardless of an exception?", options: ["try", "catch", "finally", "throw"], answer: 2, focus: "Exception Handling" },
    { question: "Which keyword is used to explicitly throw an exception?", options: ["throws", "throw", "try", "catch"], answer: 1, focus: "Exception Handling" },
    { question: "Can we have multiple catch blocks for a single try?", options: ["Yes", "No"], answer: 0, focus: "Exception Handling" },
    { question: "Which exception occurs when dividing by zero?", options: ["NullPointerException", "ArithmeticException", "IOException", "RuntimeError"], answer: 1, focus: "Exception Handling" },
    { question: "Is RuntimeException a checked or unchecked exception?", options: ["Checked", "Unchecked"], answer: 1, focus: "Exception Handling" },
    { question: "Which class is the root for all exceptions in Java?", options: ["Exception", "Error", "Throwable", "Object"], answer: 2, focus: "Exception Handling" },
    { question: "What is the purpose of 'throws' keyword?", options: ["To throw exception", "To declare exception in method signature", "To handle exception", "None"], answer: 1, focus: "Exception Handling" },
    { question: "What is a 'Try-with-resources' used for?", options: ["Auto-closing resources", "Speeding up try block", "Handling multiple errors", "None"], answer: 0, focus: "Exception Handling" }
  ],

  python: [
    // Python Basics (10 Qs)
    { question: "Who created Python?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"], answer: 0, focus: "Basics" },
    { question: "Is Python case sensitive?", options: ["Yes", "No"], answer: 0, focus: "Basics" },
    { question: "Which function is used to get the length of a list?", options: ["length()", "len()", "sizeof()", "count()"], answer: 1, focus: "Basics" },
    { question: "Which keyword is used for functions?", options: ["def", "function", "func", "define"], answer: 0, focus: "Basics" },
    { question: "What is the output of print(2**3)?", options: ["6", "8", "9", "5"], answer: 1, focus: "Basics" },
    { question: "Which operator is used for floor division?", options: ["/", "//", "%", "**"], answer: 1, focus: "Basics" },
    { question: "How to create a tuple?", options: ["[]", "{}", "()", "<>"], answer: 2, focus: "Basics" },
    { question: "Which is a dictionary type?", options: ["x = [1,2,3]", "x = {1,2,3}", "x = {'a':1}", "x = (1,2)"], answer: 2, focus: "Basics" },
    { question: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2, focus: "Basics" },
    { question: "What is the range(5) output?", options: ["[0,1,2,3,4,5]", "[1,2,3,4,5]", "[0,1,2,3,4]", "None"], answer: 2, focus: "Basics" },

    // Data Structures (8 Qs)
    { question: "Are Python lists mutable?", options: ["Yes", "No"], answer: 0, focus: "Data Structures" },
    { question: "Which method adds an element to the end of a list?", options: ["add()", "insert()", "append()", "extend()"], answer: 2, focus: "Data Structures" },
    { question: "How to remove all items from a list?", options: ["delete()", "clear()", "remove()", "pop()"], answer: 1, focus: "Data Structures" },
    { question: "What is the difference between list and tuple?", options: ["List is immutable", "Tuple is immutable", "No difference", "None"], answer: 1, focus: "Data Structures" },
    { question: "Which collection does not allow duplicates?", options: ["List", "Tuple", "Set", "Dictionary"], answer: 2, focus: "Data Structures" },
    { question: "How to access a dictionary value?", options: ["dict[key]", "dict(key)", "dict.key()", "None"], answer: 0, focus: "Data Structures" },
    { question: "What does list.pop() do?", options: ["Removes first item", "Removes last item", "Adds item", "None"], answer: 1, focus: "Data Structures" },
    { question: "What is a 'List Comprehension'?", options: ["A list inside a list", "Concise way to create lists", "A list documentation", "None"], answer: 1, focus: "Data Structures" },

    // OOPS (7 Qs)
    { question: "Which keyword is used to create a class?", options: ["def", "class", "structure", "init"], answer: 1, focus: "OOPs" },
    { question: "What is the purpose of __init__?", options: ["To initialize an object", "To delete an object", "To print data", "None"], answer: 0, focus: "OOPs" },
    { question: "What represents 'self' in Python classes?", options: ["Parent class", "Current instance of class", "Static method", "None"], answer: 1, focus: "OOPs" },
    { question: "How to inherit a class in Python?", options: ["class Child: Parent", "class Child(Parent)", "class Child extends Parent", "None"], answer: 1, focus: "OOPs" },
    { question: "Does Python support multiple inheritance?", options: ["Yes", "No"], answer: 0, focus: "OOPs" },
    { question: "Which function checks if an object is an instance of a class?", options: ["isinstance()", "hasinstance()", "check()", "None"], answer: 0, focus: "OOPs" },
    { question: "What is 'Encapsulation' in Python?", options: ["Data hiding", "Code reuse", "Method overriding", "None"], answer: 0, focus: "OOPs" }
  ],

  c: [
    // Basics (10 Qs)
    { question: "C was developed by?", options: ["Dennis Ritchie", "Bjarne", "James Gosling", "Guido"], answer: 0, focus: "Basics" },
    { question: "Which keyword is used to return a value?", options: ["get", "provide", "return", "back"], answer: 2, focus: "Basics" },
    { question: "Which function is used to print output?", options: ["scanf()", "printf()", "cout", "print()"], answer: 1, focus: "Basics" },
    { question: "Which library is used for standard I/O?", options: ["conio.h", "stdio.h", "stdlib.h", "iostream"], answer: 1, focus: "Basics" },
    { question: "What is the correct way to declare a constant?", options: ["const int x;", "final int x;", "#define x 10", "Both A and C"], answer: 3, focus: "Basics" },
    { question: "Size of float in C?", options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"], answer: 1, focus: "Basics" },
    { question: "Which operator is used for Logical AND?", options: ["&", "&&", "|", "||"], answer: 1, focus: "Basics" },
    { question: "Which is the start of a C program?", options: ["start()", "main()", "init()", "begin()"], answer: 1, focus: "Basics" },
    { question: "What is the role of a compiler?", options: ["Runs code", "Converts C to Machine Code", "Debugs code", "None"], answer: 1, focus: "Basics" },
    { question: "Which keyword is for integer type?", options: ["float", "char", "int", "long"], answer: 2, focus: "Basics" },

    // Pointers (8 Qs)
    { question: "What is a pointer?", options: ["Stores Value", "Stores Memory Address", "A data type", "None"], answer: 1, focus: "Pointers" },
    { question: "How to declare a pointer?", options: ["int *p;", "int &p;", "int p;", "None"], answer: 0, focus: "Pointers" },
    { question: "Which operator gives the address of a variable?", options: ["*", "&", "^", "@"], answer: 1, focus: "Pointers" },
    { question: "What is a 'NULL' pointer?", options: ["Points to garbage", "Points to address zero", "Uninitialized pointer", "None"], answer: 1, focus: "Pointers" },
    { question: "What is the size of a pointer on 32-bit system?", options: ["2 bytes", "4 bytes", "8 bytes", "None"], answer: 1, focus: "Pointers" },
    { question: "How do you access content of a pointer memory?", options: ["*p", "&p", "p", "None"], answer: 0, focus: "Pointers" },
    { question: "What is 'Pointer Arithmetic'?", options: ["Adding two pointers", "Incrementing pointer address", "Multiplying pointers", "None"], answer: 1, focus: "Pointers" },
    { question: "A 'Wild Pointer' is?", options: ["Uninitialized pointer", "Points to NULL", "Points to valid memory", "None"], answer: 0, focus: "Pointers" },

    // Functions & Structures (7 Qs)
    { question: "What is a function prototype?", options: ["Implementation", "Declaration before use", "Calling a function", "None"], answer: 1, focus: "Functions & Structures" },
    { question: "How are arguments passed by value differently from reference?", options: ["Copy is sent", "Original is sent", "No difference", "None"], answer: 0, focus: "Functions & Structures" },
    { question: "Keyword for defining a structure?", options: ["structure", "struct", "class", "obj"], answer: 1, focus: "Functions & Structures" },
    { question: "What is a structure member?", options: ["A pointer", "A variable inside struct", "A function", "None"], answer: 1, focus: "Functions & Structures" },
    { question: "Can a structure contain another structure?", options: ["Yes", "No"], answer: 0, focus: "Functions & Structures" },
    { question: "Which operator uses structure pointer to access members?", options: [".", "->", "&", "*"], answer: 1, focus: "Functions & Structures" },
    { question: "What is 'typedef' used for?", options: ["Create pointer", "Create alias for types", "Delete type", "None"], answer: 1, focus: "Functions & Structures" }
  ]
};
