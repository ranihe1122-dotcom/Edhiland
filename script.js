// 等待所有 HTML 内容加载完毕
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. [设置] 找到所有需要的元素 ---
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // [新增] 找到所有的内容板块 (section)
    const sections = document.querySelectorAll('.content-section');

    
    // --- 2. [功能] 点击链接时平滑滚动 + 立即高亮 ---
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            
            // 立即移除所有高亮
            navLinks.forEach(function(nav) {
                nav.classList.remove('active');
            });

            // 只高亮被点击的这一个
            event.currentTarget.classList.add('active');
            
            // 注意：平滑滚动 (scroll-behavior: smooth) 是在 CSS 里处理的,
            // JavaScript 只需要确保高亮被正确切换。
        });
    });

    
    // --- 3. [功能] "返回顶部" 按钮 ---
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    
    // --- 4. [新增] "ScrollSpy" (滚动侦测) 功能 ---
    
    // 创建一个函数，用于在滚动时更新高亮
    function updateActiveLinkOnScroll() {
        let currentActiveSection = '';

        // 我们需要一个 "偏移量"。
        // 当一个板块的顶部距离屏幕顶部 150px 时，我们就认为它 "激活" 了
        const offset = 150; 

        // 遍历所有的内容板块
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // 获取板块距离文档顶部的距离
            
            // 检查当前滚动位置是否已经经过了这个板块的顶部 (减去偏移量)
            if (window.scrollY >= sectionTop - offset) {
                currentActiveSection = section.getAttribute('id');
            }
        });

        // 遍历所有的导航链接
        navLinks.forEach(link => {
            link.classList.remove('active'); // 先移除所有高亮
            
            // 如果链接的 href (例如 "#links") 
            // 匹配我们找到的当前板块ID (例如 "links")
            if (link.getAttribute('href') === '#' + currentActiveSection) {
                link.classList.add('active'); // 就给它添加高亮
            }
        });
    }

    // [新增] 把这个函数 "绑定" 到窗口的 'scroll' 事件上
    window.addEventListener('scroll', updateActiveLinkOnScroll);
    
    // [新增] 页面刚加载时也立即运行一次, 
    // 这样如果你刷新页面时在页面中间, 高亮也能正确显示
    updateActiveLinkOnScroll();

});
