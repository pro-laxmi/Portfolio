// js/data.js

// This file acts as a simple database for your portfolio content.
// To add a new blog post, just copy one of the existing objects and paste it at the top of the array.

const blogPosts = [
    {
        id: 2,
        title: "Mastering CSS Grid",
        date: "July 10, 2025",
        author: "Laxmidhar Panda",
        // A short summary for the blog list page
        summary: "A beginner-friendly tutorial on creating complex, responsive layouts with CSS Grid. Say goodbye to floats!",
        // The main image for the blog post
        image: "images/project2.jpg", // Replace with your image path
        tags: ["WebDev", "CSS", "Tutorial"],
        // The full content for the blog post page. Use HTML tags like <p>, <h2>, <img> etc.
        content: `
            <p>CSS Grid is a revolutionary layout system that makes creating complex, two-dimensional layouts on the web more intuitive than ever before. In this post, we'll dive into the core concepts and build a practical example.</p>
            
            <h2>Why Use CSS Grid?</h2>
            <p>For years, developers relied on hacks like floats and positioning to create layouts. These methods were never designed for complex page structure and often led to fragile, hard-to-maintain code. CSS Grid provides a proper system for creating rows and columns, defining how elements should be placed within them.</p>
            
            <img src="https://placehold.co/800x400/2a2a4a/ffffff?text=CSS+Grid+Diagram" alt="CSS Grid Diagram">

            <h2>Core Concepts</h2>
            <p>The two fundamental parts of a grid layout are the <strong>grid container</strong> (the parent element) and the <strong>grid items</strong> (the children). By applying <code>display: grid;</code> to the container, you unlock a powerful set of properties to control your layout.</p>
            <p>We'll explore properties like <code>grid-template-columns</code>, <code>grid-gap</code>, and how to place items using line numbers or named areas. Stay tuned!</p>
        `
    },
    {
        id: 1,
        title: "The Rise of AI",
        date: "July 25, 2025",
        author: "Laxmidhar Panda",
        summary: "An in-depth look at the current state of artificial intelligence and where it's headed. From LLMs to generative art.",
        image: "images/project1.jpg", // Replace with your image path
        tags: ["AI", "Tech", "Future"],
        content: `
            <p>Artificial Intelligence is no longer a concept from science fiction; it's a transformative technology that is reshaping industries and our daily lives. This article explores the recent breakthroughs and what they mean for the future.</p>
            
            <h2>Large Language Models (LLMs)</h2>
            <p>Models like GPT-4 and Gemini have demonstrated an incredible ability to understand and generate human-like text. This has unlocked applications from advanced chatbots to automated content creation and code generation.</p>
            
            <h2>Generative Art and Diffusion Models</h2>
            <p>Tools like Midjourney and Stable Diffusion are allowing anyone to create stunning visual art from simple text prompts. These models work by starting with random noise and gradually refining it into an image that matches the description, a process known as diffusion.</p>
            
            <img src="https://placehold.co/800x400/2a2a4a/ffffff?text=AI+Generated+Art" alt="AI Generated Art">

            <h2>What's Next?</h2>
            <p>The pace of innovation is staggering. We can expect to see AI become even more integrated into our tools, leading to increased productivity and new forms of creative expression. However, it also raises important ethical questions that we must address as a society.</p>
        `
    }
    // To add a new post, copy the object above and paste it here.
    // Make sure to give it a new, unique 'id'.
];
