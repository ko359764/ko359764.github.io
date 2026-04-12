// script.js
// 切换下载链接显示
function toggleDownload(element) {
    // 如果点击的是已激活项，则关闭它
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        return;
    }
    
    // 关闭其他所有打开的下载链接
    document.querySelectorAll('.software-item.active').forEach(item => {
        item.classList.remove('active');
    });
    
    // 激活当前项
    element.classList.add('active');
    
    // 重置自动关闭定时器
    resetAutoCloseTimer();
}

// 视频控制功能
const video = document.getElementById('tutorialVideo');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

playBtn.addEventListener('click', () => {
    video.play();
    resetAutoCloseTimer();
});

pauseBtn.addEventListener('click', () => {
    video.pause();
    resetAutoCloseTimer();
});

restartBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
    resetAutoCloseTimer();
});

fullscreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
    resetAutoCloseTimer();
});

// 分类导航功能
const navBtns = document.querySelectorAll('.nav-btn');
const categories = document.querySelectorAll('.category');
const stickyNav = document.querySelector('.sticky-nav');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const categoryId = btn.getAttribute('data-category');
        
        // 更新按钮状态
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 更新分类显示
        categories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.id === categoryId) {
                cat.classList.add('active');
            }
        });
        
        // 滚动到对应分类
        const targetCategory = document.getElementById(categoryId);
        if (targetCategory) {
            targetCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        resetAutoCloseTimer();
        
        // 如果是移动端，点击后关闭导航
        if (window.innerWidth <= 768) {
            stickyNav.classList.remove('active');
        }
    });
});

// 为每个软件项的下载按钮添加点击事件
document.querySelectorAll('.download-text').forEach(text => {
    text.addEventListener('click', function(e) {
        e.stopPropagation();
        const item = this.closest('.software-item');
        toggleDownload(item);
    });
});

// 全局点击事件 - 点击空白处关闭所有下载链接
document.addEventListener('click', function(e) {
    if (!e.target.closest('.software-item') && 
        !e.target.closest('.category-nav') &&
        !e.target.closest('.video-section')) {
        closeAllItems();
    }
});

// 自动关闭定时器
let autoCloseTimer;

// 重置自动关闭定时器
function resetAutoCloseTimer() {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(closeAllItems, 8000);
}

// 关闭所有打开的软件项
function closeAllItems() {
    document.querySelectorAll('.software-item.active').forEach(item => {
        item.classList.remove('active');
    });
}

// 移动端菜单按钮点击事件
mobileMenuBtn.addEventListener('click', () => {
    stickyNav.classList.toggle('active');
});

// PC端滚动隐藏导航
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) { // 仅PC端生效
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动且滚动距离大于100时隐藏导航
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            stickyNav.classList.add('hidden');
        } else {
            stickyNav.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // 滚动停止后显示导航
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            stickyNav.classList.remove('hidden');
        }, 500);
    }
});

// 初始化
resetAutoCloseTimer();