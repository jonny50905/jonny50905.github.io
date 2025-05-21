document.addEventListener('DOMContentLoaded', function() {
    // 導航欄滾動效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });

    // 漢堡選單功能
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', function() {
        // 切換導航選單
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');

        // 鏈結動畫
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // 平滑捲動
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // 如果是行動裝置，點擊後關閉選單
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    });

    // 技能動畫
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function showSkills() {
        const triggerBottom = window.innerHeight * 0.8;
        const skillsTop = skillsSection.getBoundingClientRect().top;
        
        if (skillsTop < triggerBottom) {
            skillBars.forEach(bar => {
                bar.style.width = bar.parentElement.getAttribute('data-width');
            });
        }
    }
    
    window.addEventListener('scroll', showSkills);

    // 表單提交事件
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // 這裡可以加入表單提交到後端的程式碼
            alert(`感謝您的訊息！\n姓名: ${name}\n電子郵件: ${email}\n訊息: ${message}\n\n我們會盡快回覆您！`);
            
            // 清空表單
            this.reset();
        });
    }

    // 設定技能條寬度初始值
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        bar.parentElement.setAttribute('data-width', width);
    });

    // 頁面載入時就檢查技能是否可見
    showSkills();

    // 添加淡入淡出動畫效果
    const fadeElements = document.querySelectorAll('.timeline-item, .education-item, .project-item, .share-item');
    
    function checkFade() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化淡入淡出元素的樣式
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // 初始檢查
});
