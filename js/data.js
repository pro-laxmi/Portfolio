// js/data.js
// This file acts as a simple database for my portfolio content.

const blogPosts = [
    {
        id: 1, // Your main blog post, now with corrected heading IDs
        title: "Forging My Digital World: The Story Behind This Portfolio",
        date: "July 28, 2025",
        author: "Laxmidhar Panda",
        summary: "More than just code, this is the story of my first major web project. A deep dive into the triumphs, the bugs, and the 'aha!' moments that brought this interactive portfolio to life.",
        image: "images/project_portfolio_main.png",
        tags: ["WebDev","Three.js", "JavaScript", "Debugging", "Journey"],
        content: `
            <p>Every developer remembers their first major project—the one that pushes them beyond tutorials and into the wild, messy, and wonderful world of creating something from scratch. For me, that project is the very website you're on right now. I wanted to build more than just a static online resume; I wanted to craft an experience, a small digital world that reflected my passion for both code and creativity. This is the real story of how it came to be, complete with all the struggles, the late nights, and the breakthroughs.</p>

            <h2 id="the-vision">The Vision: An Interactive Cosmos Inspired by last year TEDxIITGandhinagar theme "The Cosmos Within".</h2>
            <p>The idea of adding motion didn't come from a coding tutorial. It came from the world of digital art and ,last year theme for TEDxIITGandhinagar being in the design team taugh me a lot of things but we will discuss them in any other blog, now getting back to the topic. I was scrolling through sites like Awwwards, Dribbble, Reddit etc, and I was captivated by portfolios that felt alive. They used abstract 3D shapes and subtle animations to create a mood. That's what I wanted. I didn't want a flat page; I wanted a space. The revolving icosahedron in the center isn't just a random shape; it represents a core idea, a multifaceted 'gem' of creativity, constantly in motion. The starfield wasn't just a background; it was the universe in which this idea lived. The tool to bring this vision from my mind to the browser was <strong>Three.js</strong>. I knew it would be a great challenge, but I was determined to make it happen. There were a lot of struggles and teaching all together because I was new to this I was mostly focused on AI and Automation but just want to check my capability and explore other aspects instead of just doing what I know. There were a lot of hurdles but here are some that I remember because they traumatised me to the core <strong>(*≧▽≦)ツ┏━┓</strong>(You masochist ^_~)</p>

            <img src="images/blog/inspiration-moodboard.jpg" alt="Inspiration for the 3D portfolio design">

            <h2 id="hurdle-1-performance">Hurdle #1: My Laptop Sounded Like a Jet Engine</h2>
            <p>My first version of the homepage was technically working, but it was a disaster in practice. I had generated over a thousand stars, each a separate 3D object, and my animation loop was running wild. On my powerful laptop, it was mostly fine, but the moment I opened it on an older machine, the fan kicked into overdrive and the animation chugged along at a painful 10 frames per second. The site was practically unusable. This was my brutal introduction to <strong>performance optimization</strong>. I spent days learning about browser rendering, the importance of <code>requestAnimationFrame</code>, and the concept of "draw calls." The fix involved drastically reducing the number of stars (from 1000 to 400) and ensuring my animation code was as efficient as possible. It was a tough lesson: cool features are worthless if they crash the user's browser.</p>

            <h2 id="hurdle-2-loading-glitches">Hurdle #2: The Dreaded "Flash" and the Shifting Fonts</h2>
            <p>With the animation smoother, I noticed two new, unprofessional-looking glitches. First, for a split second on loading, the page would appear as plain, ugly HTML before the CSS snapped it into place (the "Flash of Unstyled Content"). Second, my beautiful 'Poppins' font would load a moment late, causing all the text to suddenly shift and resize. It made the site feel cheap. After a lot of searching, I learned to fix both. The "flash" was solved by moving my CSS <code>&lt;link&gt;</code> tags to the top of the <code>&lt;head&gt;</code>, forcing the browser to load styles first. The font shift was trickier, but I learned about font-display properties in CSS and proper font preloading techniques to ensure a much smoother visual load.</p>

            <h2 id="hurdle-3-disappearing-stars">Hurdle #3: The Disappearing Stars Saga</h2>
            <p>This was the bug that almost made me quit. The starfield looked perfect on the top section, but vanished as soon as I scrolled down, leaving a solid black void. It felt like scrolling off the edge of the universe. I was convinced it was a complex JavaScript bug. I spent days tweaking my Three.js camera settings and scroll logic, getting nowhere. Utterly stuck, I started a session with a development AI, explaining my problem. It immediately pointed me towards the CSS. The problem wasn't the animation at all; it was the solid background color on the <code>&lt;body&gt;</code> tag itself, which was covering up the canvas element layered behind it. The fix was to apply the background to the root <code>&lt;html&gt;</code> element and make the body transparent on the homepage. I felt foolish, but also incredibly relieved. It was a huge lesson: don't assume the problem is where you think it is.</p>

            <h2 id="hurdle-4-responsive-design">Hurdle #4: Responsive Design is More Than a Hamburger Menu</h2>
            <p>I finally got the mobile menu working after a long battle with a single missing HTML ID. I thought I had conquered responsive design. I was wrong. When I started testing on actual devices—my phone, my friend's tablet—it was a mess. My beautiful grid of projects looked squished, text in the "About Me" section was overflowing its container, and the font sizes were all wrong. I learned that responsive design isn't a single feature; it's a mindset. I had to go back through my entire CSS, learning to use flexible units like percentages and "clamp{}" for font sizes, and adjusting my grid layouts with media queries for multiple screen sizes, not just "desktop" and "mobile." It probably doubled the time I spent on my CSS, but it was worth it.</p>

            <h2 id="the-next-frontier">The Next Frontier: The GitHub API Challenge</h2>
            <p>Right now, my GitHub stats page is just static, hard-coded numbers. It looks fine, but it's not real. My next major goal for this project is to bring it to life by pulling my actual statistics directly from the <strong>GitHub API</strong>. This is a whole new mountain to climb. I'm currently learning about how to make API calls with JavaScript's <code>fetch()</code>, how to handle asynchronous code with <code>async/await</code> so the page doesn't freeze while waiting for data, and how to process the JSON data that the API sends back. It's a huge challenge, but being able to display my live commit and repository stats automatically will be a massive upgrade and a great new skill to have.</p>

            <h2 id="final-thoughts">Final Thoughts: The Beauty of the Struggle</h2>
            <p>Building this portfolio was a rollercoaster. There were moments of pure frustration where nothing seemed to work, followed by incredible "aha!" moments when a bug was finally squashed. Every error, from a simple CSS typo to a complex performance issue, taught me something invaluable. This site is more than a collection of my projects; it's a testament to the process of learning, debugging, and the sheer satisfaction of building something with your own two hands (and a little help from the developer community and AI along the way). It's a living project, and I can't wait to see how it evolves as I continue my journey in web development.</p>
        `
    },
];

const projectData = [
    {
        id: 1,
        title: "Personal Portfolio Website",
        date: "2025-07-26", // Use YYYY-MM-DD format for easy sorting
        summary: "A fully responsive, interactive personal portfolio built from the ground up using HTML, CSS, and vanilla JavaScript, featuring a dynamic 3D homepage.",
        image: "images/project_portfolio_main.png", // Use a real image path later
        tags: ["HTML", "CSS", "JavaScript", "Three.js"],
        liveLink: "https://pro-laxmi.github.io/Portfolio/",
        sourceLink: "https://github.com/pro-laxmi/Portfolio"
    }
    // To add a new project, copy the object above and paste it here.
    // Make sure to give it a new 'id' and update the date.
];