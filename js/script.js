/* ========== js/script.js (Complete and Corrected) ========== */

document.addEventListener('DOMContentLoaded', () => {

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
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
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

        const newsGrid = document.getElementById('news-grid');
        if (newsGrid && typeof blogPosts !== 'undefined') {
            const latestPosts = blogPosts.slice(0, 3);
            latestPosts.forEach(post => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <h3><a href="blog-post.html?id=${post.id}">${post.title}</a></h3>
                    <p>${post.summary}</p>
                `;
                newsGrid.appendChild(newsItem);
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


    // --- ★★★ RESTORED SINGLE BLOG POST PAGE LOGIC ★★★ ---
    const blogPostContainer = document.getElementById('blog-post-container');
    if (blogPostContainer && typeof blogPosts !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
            document.title = `${post.title} | Laxmidhar Panda`;
            const containerDiv = blogPostContainer.querySelector('.container');
            containerDiv.innerHTML = `
                <div class="blog-post-header">
                    <h1>${post.title}</h1>
                    <p class="blog-post-meta">By ${post.author} on ${post.date}</p>
                </div>
                <img src="${post.image}" alt="${post.title}" class="blog-post-image">
                <div class="blog-post-content">
                    ${post.content}
                </div>
            `;
        } else {
            blogPostContainer.innerHTML = `<div class="container"><h2 class="section-title">Blog Post Not Found</h2><p style="text-align:center;">Sorry, we couldn't find the blog post you were looking for.</p></div>`;
        }
    }
});