export const quizData = {
  html: [
    // Fundamentals
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "None"], answer: 0, focus: "Fundamentals" },
    { question: "Who is making the Web standards?", options: ["Google", "The World Wide Web Consortium", "Microsoft", "Mozilla"], answer: 1, focus: "Fundamentals" },
    { question: "What is the correct HTML element for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2, focus: "Fundamentals" },
    { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<b>"], answer: 2, focus: "Fundamentals" },
    { question: "What is the correct HTML for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "None"], answer: 1, focus: "Fundamentals" },
    { question: "Which character is used to indicate an end tag?", options: ["^", "<", "/", "*"], answer: 2, focus: "Fundamentals" },
    { question: "How can you make a numbered list?", options: ["<ul>", "<list>", "<ol>", "<dl>"], answer: 2, focus: "Fundamentals" },
    { question: "How can you make a bulleted list?", options: ["<ul>", "<ol>", "<list>", "<dl>"], answer: 0, focus: "Fundamentals" },
    
    // Tags
    { question: "Which tag is used to define an image?", options: ["<pic>", "<img>", "<image>", "<src>"], answer: 1, focus: "Tags" },
    { question: "What is the correct HTML for making a checkbox?", options: ["<check>", "<input type='check'>", "<input type='checkbox'>", "<checkbox>"], answer: 2, focus: "Tags" },
    { question: "What is the correct HTML for making a text input field?", options: ["<input type='textfield'>", "<input type='text'>", "<textfield>", "<textinput>"], answer: 1, focus: "Tags" },
    { question: "Which HTML element is used to specify a footer for a document or section?", options: ["<bottom>", "<footer>", "<section>", "<aside>"], answer: 1, focus: "Tags" },
    { question: "Which HTML element defines navigation links?", options: ["<nav>", "<navigate>", "<navroot>", "<links>"], answer: 0, focus: "Tags" },
    { question: "What is the correct HTML for making a drop-down list?", options: ["<input type='dropdown'>", "<list>", "<select>", "<input type='list'>"], answer: 2, focus: "Tags" },
    { question: "Which tag is used to define emphasized text?", options: ["<i>", "<em>", "<italic>", "<b>"], answer: 1, focus: "Tags" },
    
    // Navigation
    { question: "What is the purpose of the <a> tag?", options: ["Table", "Link", "Image", "Paragraph"], answer: 1, focus: "Navigation" },
    { question: "How do you create a link that opens in a new tab?", options: ["target='_new'", "target='_blank'", "new='true'", "href='new'"], answer: 1, focus: "Navigation" },
    { question: "Which attribute is used to specify the destination of a link?", options: ["src", "link", "href", "destination"], answer: 2, focus: "Navigation" },
    { question: "How do you create a link to an email address?", options: ["<a href='mailto:me@example.com'>", "<a href='me@example.com'>", "<a>me@example.com</a>", "<mail>me@example.com</mail>"], answer: 0, focus: "Navigation" },
    { question: "Which tag is used to define a client-side image map?", options: ["<map>", "<area>", "<canvas>", "<img map='...'>"], answer: 0, focus: "Navigation" },
    { question: "What is the correct HTML for referring to an external style sheet?", options: ["<style src='...'>", "<link rel='stylesheet' type='text/css' href='...'>", "<stylesheet>...</stylesheet>", "<link href='...'>"], answer: 1, focus: "Navigation" },
    { question: "Which HTML element is used to define a container for an external application?", options: ["<embed>", "<iframe>", "<object>", "<applet>"], answer: 1, focus: "Navigation" },
  ],
  css: [
    // Styling
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "None"], answer: 0, focus: "Styling" },
    { question: "Where in an HTML document is the correct place to refer to an external style sheet?", options: ["At the end", "In the <body> section", "In the <head> section", "None"], answer: 2, focus: "Styling" },
    { question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], answer: 2, focus: "Styling" },
    { question: "Which HTML attribute is used to define inline styles?", options: ["styles", "font", "style", "class"], answer: 2, focus: "Styling" },
    { question: "Which is the correct CSS syntax?", options: ["body:color=black;", "{body;color:black;}", "body {color: black;}", "body:color:black;"], answer: 2, focus: "Styling" },
    { question: "How do you insert a comment in a CSS file?", options: ["// comment", "' comment", "/* comment */", "// comment //"], answer: 2, focus: "Styling" },
    { question: "Which property is used to change the background color?", options: ["background-color", "color", "bgcolor", "background"], answer: 0, focus: "Styling" },
    
    // Visuals
    { question: "Which property is used to change the left margin of an element?", options: ["padding-left", "margin-left", "indent", "spacing"], answer: 1, focus: "Visuals" },
    { question: "How do you select an element with id 'demo'?", options: ["#demo", ".demo", "demo", "*demo"], answer: 0, focus: "Visuals" },
    { question: "How do you select elements with class name 'test'?", options: ["#test", "test", ".test", "*test"], answer: 2, focus: "Visuals" },
    { question: "How do you display hyperlinks without an underline?", options: ["a {decoration:no-underline;}", "a {text-decoration:none;}", "a {underline:none;}", "a {text-decoration:no-underline;}"], answer: 1, focus: "Visuals" },
    { question: "How do you make each word in a text start with a capital letter?", options: ["text-style:capitalize", "transform:capitalize", "text-transform:capitalize", "capitalize:words"], answer: 2, focus: "Visuals" },
    { question: "Which property is used to change the font of an element?", options: ["font-family", "font-style", "font-weight", "font-type"], answer: 0, focus: "Visuals" },
    { question: "How do you make the text bold?", options: ["font:bold;", "style:bold;", "font-weight:bold;", "text:bold;"], answer: 2, focus: "Visuals" },
  ],
  javascript: [
    // Runtime
    { question: "What is 'Hoisting' in JavaScript?", options: ["Moving declarations to top", "Lifting page content", "Variable deletion", "Optimization process"], answer: 0, focus: "Runtime" },
    { question: "Which keyword is used to declare a block-scoped variable?", options: ["var", "let", "global", "def"], answer: 1, focus: "Runtime" },
    { question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "console.log('Hello World');"], answer: 2, focus: "Runtime" },
    { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "def myFunction()"], answer: 0, focus: "Runtime" },
    { question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "exec myFunction"], answer: 1, focus: "Runtime" },
    { question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], answer: 2, focus: "Runtime" },
    { question: "How does a FOR loop start?", options: ["for (i <= 5; i++)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)"], answer: 1, focus: "Runtime" },
    
    // Async
    { question: "Which function executes after a specific delay?", options: ["setInterval", "setTimeout", "setWait", "delay"], answer: 1, focus: "Async" },
    { question: "What does AJAX stand for?", options: ["Asynchronous JavaScript and XML", "Async Java and XML", "Abstract JS and XML", "None"], answer: 0, focus: "Async" },
    { question: "Which object is used to make an HTTP request in AJAX?", options: ["HttpRequest", "XMLHttpRequest", "HttpXML", "XMLRequest"], answer: 1, focus: "Async" },
    { question: "How do you stop an interval timer started by setInterval()?", options: ["stopInterval()", "clearTimer()", "clearInterval()", "endInterval()"], answer: 2, focus: "Async" },
    { question: "What is a Promise in JavaScript?", options: ["A guarantee to execute code", "An object representing future completion", "A function that never fails", "A block of code"], answer: 1, focus: "Async" },
    { question: "Which keywords are used to handle asynchronous code more clearly?", options: ["wait/then", "async/await", "start/end", "try/catch"], answer: 1, focus: "Async" },
    { question: "What is the purpose of fetch()?", options: ["Get cookies", "Network requests", "Import modules", "None"], answer: 1, focus: "Async" },
  ],
  python: [
    // History
    { question: "Who created Python?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"], answer: 0, focus: "History" },
    { question: "In what year was Python first released?", options: ["1989", "1991", "1995", "2000"], answer: 1, focus: "History" },
    { question: "Python is named after which comedy group?", options: ["The Pythons", "Monty Python", "Snake Comedy", "Comedy Snake"], answer: 1, focus: "History" },
    { question: "Where was Python developed?", options: ["Netherlands", "USA", "UK", "Germany"], answer: 0, focus: "History" },
    { question: "Which version of Python was released in 2000?", options: ["Python 1.0", "Python 2.0", "Python 3.0", "Python 4.0"], answer: 1, focus: "History" },
    { question: "When was Python 3.0 released?", options: ["2005", "2008", "2010", "2012"], answer: 1, focus: "History" },
    { question: "What was Python intended to replace?", options: ["C", "ABC language", "Java", "Pascal"], answer: 1, focus: "History" },
    
    // Syntax
    { question: "Which keyword is used to create a function in Python?", options: ["function", "def", "func", "define"], answer: 1, focus: "Syntax" },
    { question: "What character is used for comments in Python?", options: ["/", "//", "#", "/*"], answer: 2, focus: "Syntax" },
    { question: "How do you create a variable with the numeric value 5?", options: ["x = 5", "x = int(5)", "Both", "None"], answer: 2, focus: "Syntax" },
    { question: "What is the correct file extension for Python files?", options: [" .pyth", ".pt", ".py", ".pyt"], answer: 2, focus: "Syntax" },
    { question: "How do you start a FOR loop in Python?", options: ["for x in y:", "for x > y:", "for each x in y", "for (x in y)"], answer: 0, focus: "Syntax" },
    { question: "Which statement is used to stop a loop?", options: ["exit", "stop", "break", "return"], answer: 2, focus: "Syntax" },
    { question: "How do you insert an item at the end of a list?", options: ["add()", "insert()", "append()", "push()"], answer: 2, focus: "Syntax" },
  ],
  git: [
    { question: "Which command initializes a repository?", options: ["git start", "git init", "git create", "git new"], answer: 1, focus: "History" },
    { question: "How do you check the status of your files?", options: ["git status", "git check", "git state", "git info"], answer: 0, focus: "Syntax" },
    { question: "How do you add files to the staging area?", options: ["git push", "git commit", "git add .", "git save"], answer: 2, focus: "Syntax" },
    { question: "How do you record changes to the repository?", options: ["git push", "git record", "git commit -m '...'", "git save"], answer: 2, focus: "Syntax" },
    { question: "How do you push changes to a remote server?", options: ["git send", "git push", "git upload", "git remote"], answer: 1, focus: "Syntax" },
    { question: "How do you create a new branch?", options: ["git branch name", "git new branch", "git checkout -b name", "Both A and C"], answer: 3, focus: "Syntax" },
    { question: "Which command merges branches?", options: ["git join", "git merge", "git combine", "git link"], answer: 1, focus: "Syntax" },
  ]
};
