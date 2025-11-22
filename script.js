// 等待所有 HTML 内容加载完毕
document.addEventListener('DOMContentLoaded', function() {

    // 找到所有的导航链接
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    // 找到 "Scroll to Top" 按钮
    const scrollToTopButton = document.getElementById('scrollToTop');

    // --- 1. 处理导航链接的 "active" 状态 ---
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            
            // 首先，移除所有链接的 'active' 类
            navLinks.forEach(function(nav) {
                nav.classList.remove('active');
            });

            // 然后，只给被点击的链接添加 'active' 类
            event.currentTarget.classList.add('active');
        });
    });

    // --- 2. 处理 "Scroll to Top" 按钮 ---
    scrollToTopButton.addEventListener('click', function() {
        // window.scrollTo(0, 0); // 瞬间返回顶部
        
        // 平滑滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 3. (进阶) 滚动时自动更新 Active 状态 (ScrollSpy) ---
    // 这个功能更复杂，我们可以在你熟悉基础版后再添加
    
});