/* ========== js/script.js (Complete and Corrected) ========== */

document.addEventListener('DOMContentLoaded', () => {
    // --- PROJECTS PAGE: Render projects dynamically from data.js ---
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && typeof projectData !== 'undefined') {
        // Sort by id descending (unique id, newest first)
        const sortedProjects = [...projectData].sort((a, b) => b.id - a.id);
        projectsGrid.innerHTML = '';
        sortedProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.summary}</p>
                    <div class="project-links">
                        <a href="${project.liveLink}" target="_blank">Live Demo</a>
                        <a href="${project.sourceLink}" target="_blank">Source Code</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // --- 1. GLOBAL FUNCTIONALITY (Runs on all pages) ---

    const header = document.querySelector('header');
    const mainContent = document.querySelector('main');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const navLinks = document.getElementById('nav-links');

    // Mobile Menu Toggler
    if (hamburgerBtn && navLinks && closeBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.add('is-open');
            document.body.classList.add('no-scroll');
        });

        const closeMenu = () => {
            navLinks.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        };

        closeBtn.addEventListener('click', closeMenu);
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                closeMenu();
            }
        });
    }

    // Header Scroll Effect
    // Header Hide on Scroll Up, Show on Scroll Down (for blog post and all pages)
    if (header) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        let lastDirection = null;
        function onScroll() {
            const currentY = window.scrollY;
            if (currentY > lastScrollY && currentY > 80) {
                if (lastDirection !== 'down') {
                    header.style.transform = 'translateY(-100%)';
                    lastDirection = 'down';
                }
            } else {
                // Scrolling up
                if (lastDirection !== 'up') {
                    header.style.transform = 'translateY(0)';
                    lastDirection = 'up';
                }
            }
            lastScrollY = currentY;
        }
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        // Initial state
        header.style.transition = 'transform 0.3s cubic-bezier(.4,0,.2,1)';
    }

    // Reading Progress Bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar && !document.body.classList.contains('home-page')) {
        const updateProgressBar = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };
        window.addEventListener('scroll', updateProgressBar);
    }
    
    // Page Transition Handler
    const allLinks = document.querySelectorAll('a');
    if (mainContent) {
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    mainContent.classList.add('fade-out'); 
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                });
            }
        });
    }


    // --- 2. HOMEPAGE-SPECIFIC FUNCTIONALITY ---
    if (document.body.classList.contains('home-page')) {
        
        const exploreButton = document.getElementById('explore-button');
        if (exploreButton) {
            exploreButton.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        // --- This is the NEW code to paste in script.js ---
    // --- This is the NEW code to paste in script.js ---
    const newsListContainer = document.getElementById('news-list-container');
    if (newsListContainer && typeof blogPosts !== 'undefined' && typeof projectData !== 'undefined') {

        const allBlogs = blogPosts.map(post => ({...post, type: 'blog'}));
        const allProjects = projectData.map(project => ({...project, type: 'project'}));
        const newsFeed = [...allBlogs, ...allProjects];

        // Sort the entire feed by date, newest first
        newsFeed.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Get the 7 most recent items
        const latestItems = newsFeed.slice(0, 7);

        // Function to format the date nicely (e.g., "Jul 28, 2025")
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        latestItems.forEach(item => {
            const newsRow = document.createElement('div');
            newsRow.className = 'news-item-row';

            let link = '';
            let description = '';

            if (item.type === 'blog') {
                link = `blog-post.html?id=${item.id}`;
                description = `Published a new blog post: <a href="${link}">${item.title}</a>.`;
            } else if (item.type === 'project') {
                link = item.liveLink || 'projects.html';
                description = `Launched a new project: <a href="${link}" target="_blank">${item.title}</a>.`;
            }

            newsRow.innerHTML = `
                <div class="news-date">${formatDate(item.date)}</div>
                <div class="news-description">${description}</div>
            `;
            newsListContainer.appendChild(newsRow);
        });
    }

        const bgCanvas = document.getElementById('bg-canvas');
        if (bgCanvas) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.position.setZ(5);
            const geometry = new THREE.IcosahedronGeometry(1.5, 0);
            const material = new THREE.MeshStandardMaterial({ color: 0x9c88ff, metalness: 0.3, roughness: 0.4 });
            const shape = new THREE.Mesh(geometry, material);
            scene.add(shape);
            const pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(5, 5, 5);
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(pointLight, ambientLight);
            function addStar() {
                const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
                const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const star = new THREE.Mesh(starGeometry, starMaterial);
                const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
                star.position.set(x, y, z);
                scene.add(star);
            }
            Array(400).fill().forEach(addStar);
            const mouse = { x: 0, y: 0 };
            document.addEventListener('mousemove', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            });
            function animate() {
                requestAnimationFrame(animate);
                shape.rotation.y += 0.002;
                shape.rotation.x += 0.001;
                camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
                camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
                camera.lookAt(scene.position);
                renderer.render(scene, camera);
            }
            animate();
            gsap.registerPlugin(ScrollTrigger);
            document.querySelectorAll('.content-section').forEach(section => {
                gsap.to(section, { autoAlpha: 1, scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 30%', toggleActions: 'play none none reverse' } });
            });
            gsap.to(shape.rotation, { x: 3, y: 6, scrollTrigger: { trigger: "#page-content", start: "top top", end: "bottom bottom", scrub: true } });
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }


    // --- ★★★ RESTORED BLOG LIST PAGE LOGIC ★★★ ---
    // --- BLOG PAGE: Add scroll-to-top button ---
    if (document.getElementById('blog')) {
        let scrollBtn = document.getElementById('scrollToTopBtn');
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTopBtn';
            scrollBtn.title = 'Scroll to top';
            scrollBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
            document.body.appendChild(scrollBtn);
        }
        scrollBtn.style.display = 'none';
        scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
    }
    const blogPage = document.getElementById('blog');
    if (blogPage && typeof blogPosts !== 'undefined') {
        const postsGrid = document.getElementById('blog-posts-grid');
        const searchInput = document.getElementById('blogSearchInput');
        const categoryList = document.getElementById('category-list');
        let allCards = [];

        function displayPosts(postsToDisplay) {
            postsGrid.innerHTML = '';
            postsGrid.appendChild(searchInput);
            postsToDisplay.forEach(post => {
                const card = document.createElement('div');
                card.className = 'blog-card';
                card.setAttribute('data-tags', post.tags.join(',').toLowerCase());
                card.innerHTML = `
                    <a href="blog-post.html?id=${post.id}">
                        <div class="blog-card-content">
                            <p class="blog-date">${post.date}</p>
                            <h3>${post.title}</h3>
                            <p>${post.summary}</p>
                            <div class="blog-tags">
                                ${post.tags.map(tag => `<span>#${tag}</span>`).join('')}
                            </div>
                        </div>
                    </a>
                `;
                postsGrid.appendChild(card);
            });
            allCards = postsGrid.querySelectorAll('.blog-card');
        }
        
        function populateCategories() {
            const allTags = new Set();
            blogPosts.forEach(post => post.tags.forEach(tag => allTags.add(tag)));
            categoryList.innerHTML = `<li><a href="#" data-category="all">All</a></li>`;
            allTags.forEach(tag => {
                categoryList.innerHTML += `<li><a href="#" data-category="${tag.toLowerCase()}">${tag}</a></li>`;
            });
            categoryList.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    const category = e.target.getAttribute('data-category');
                    filterByCategory(category);
                });
            });
        }

        displayPosts(blogPosts);
        populateCategories();

        searchInput.addEventListener('keyup', () => {
            const searchTerm = searchInput.value.toLowerCase();
            allCards.forEach(card => {
                const textContent = card.textContent.toLowerCase();
                card.style.display = textContent.includes(searchTerm) ? 'block' : 'none';
            });
        });

        function filterByCategory(category) {
            allCards.forEach(card => {
                const tags = card.getAttribute('data-tags');
                const shouldShow = category === 'all' || tags.includes(category);
                card.style.display = shouldShow ? 'block' : 'none';
            });
        }
    }


    // --- SINGLE BLOG POST PAGE LOGIC ---
    // --- SINGLE BLOG POST PAGE LOGIC (Corrected) ---
    // --- SINGLE BLOG POST PAGE LOGIC (Definitive Fix) ---
// --- SINGLE BLOG POST PAGE LOGIC (Definitive Fix) ---
const blogPostContainer = document.getElementById('blog-post-container');
if (blogPostContainer && typeof blogPosts !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = blogPosts.find(p => p.id === postId);

    if (post) {
        document.title = `${post.title} | Laxmidhar Panda`;
        
        const mainArticle = blogPostContainer.querySelector('.blog-post-main');
        mainArticle.innerHTML = `
            <div class="blog-post-header">
                <h1>${post.title}</h1>
                <p class="blog-post-meta">By ${post.author} on ${post.date}</p>
            </div>
            <img src="${post.image}" alt="${post.title}" class="blog-post-image">
            <div class="blog-post-content">
                ${post.content}
            </div>
        `;

        const tocList = document.getElementById('toc-list');
        const headings = mainArticle.querySelectorAll('h2');
        const tocSidebar = document.getElementById('toc-sidebar');

        if (headings.length > 0 && tocList && tocSidebar) {
            headings.forEach(heading => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = heading.textContent;
                link.href = `#${heading.id}`;
                // Add a progress bar span for glowing effect
                const progress = document.createElement('span');
                progress.className = 'toc-progress';
                listItem.appendChild(link);
                listItem.appendChild(progress);
                tocList.appendChild(listItem);
            });

            const tocLinks = tocList.querySelectorAll('a');
            
            // This is the new, more reliable scroll logic
            const activateLink = (id) => {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            };

            const handleScroll = () => {
                let current = '';
                headings.forEach(heading => {
                    const headingTop = heading.getBoundingClientRect().top;
                    // This checks if the heading has scrolled past a certain point (150px from the top)
                    if (headingTop < 150) {
                        current = heading.getAttribute('id');
                    }
                });

                // If we've scrolled past all headings, keep the last one active
                // Otherwise, if no heading is past the mark (we're at the top), activate the first one
                if (current === '' && tocLinks.length > 0) {
                    current = headings[0].getAttribute('id');
                }
                
                activateLink(current);
            };

            // Run the function once on load and then on every scroll event
            handleScroll();
            window.addEventListener('scroll', handleScroll);

        } else if (tocSidebar) {
            // If there are no headings in the post, hide the sidebar completely
            tocSidebar.style.display = 'none';
        }

    } else {
        // If the blog post ID is not found, show an error
        blogPostContainer.innerHTML = `<div class="container"><h2 class="section-title">Blog Post Not Found</h2><p style="text-align:center;">Sorry, we couldn't find the blog post you were looking for.</p></div>`;
    }
}
});

// --- RESUME PAGE MEME LOGIC (Using a Reliable API) ---
const memeSection = document.getElementById('meme-section');
if (memeSection) {
    const memeImage = document.getElementById('meme-image');
    const newMemeBtn = document.getElementById('new-meme-btn');
    const apiUrl = 'https://meme-api.com/gimme/ProgrammerHumor'; // API endpoint for programming memes

    async function showRandomMeme() {
        try {
            // Show a loading state while we fetch the meme
            if (memeImage) {
                memeImage.src = 'https://placehold.co/600x400/1a1a2e/ffffff?text=Finding+Meme...';
            }

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // The API provides the image URL in the 'url' property
            if (memeImage && data.url) {
                memeImage.src = data.url;
            }

        } catch (error) {
            console.error('Failed to fetch meme:', error);
            // If the API fails, show an error message
            if (memeImage) {
                memeImage.src = 'https://placehold.co/600x400/1a1a2e/ffffff?text=Oops!+Could+not+load+meme.';
            }
        }
    }

    // Show a meme when the page first loads
    showRandomMeme();

    // Add a click listener to the button to show a new meme
    if (newMemeBtn) {
        newMemeBtn.addEventListener('click', showRandomMeme);
    }
}