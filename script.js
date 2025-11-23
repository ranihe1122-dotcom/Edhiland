// 等待所有 HTML 内容加载完毕
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. [设置] 找到所有需要的元素 ---
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const sections = document.querySelectorAll('.content-section');
    const form = document.getElementById('oc-form');
    const fileInput = document.getElementById('q7-images');

    
    // --- 2. [功能] 点击链接时平滑滚动 + 立即高亮 ---
    // (这段代码必须在 "sections" 被定义之后)
    if (navLinks.length > 0 && sections.length > 0) {
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                
                // 立即移除所有高亮
                navLinks.forEach(function(nav) {
                    nav.classList.remove('active');
                });

                // 只高亮被点击的这一个
                event.currentTarget.classList.add('active');
            });
        });
    }

    
    // --- 3. [功能] "返回顶部" 按钮 ---
    // (这段代码必须在 "scrollToTopButton" 被定义之后)
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    
    // --- 4. "ScrollSpy" (滚动侦测) 功能 ---
    // (这段代码必须在 "sections" 和 "navLinks" 被定义之后)
    if (sections.length > 0 && navLinks.length > 0) {
        
        function updateActiveLinkOnScroll() {
            let currentActiveSection = '';
            const offset = 150; 

            sections.forEach(section => {
                const sectionTop = section.offsetTop; 
                if (window.scrollY >= sectionTop - offset) {
                    currentActiveSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active'); 
                if (link.getAttribute('href') === '#' + currentActiveSection) {
                    link.classList.add('active'); 
                }
            });
        }

        window.addEventListener('scroll', updateActiveLinkOnScroll);
        updateActiveLinkOnScroll();
    }


    // --- 5. 表单验证 (Form Validation) ---
    // (这段代码必须在 "form" 和 "fileInput" 被定义之后)
    if (form && fileInput) {
        
        fileInput.addEventListener('change', function() {
            
            const files = fileInput.files;
            const maxFiles = 3;
            const maxSizeMB = 5;
            const maxSizeBytes = maxSizeMB * 1024 * 1024; // 5MB 转换为字节

            // 1. 检查文件数量
            if (files.length > maxFiles) {
                alert(`你最多只能上传 ${maxFiles} 张图片。`);
                fileInput.value = null; // 清空已选择的文件
                return;
            }

            // 2. 检查每个文件的大小
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > maxSizeBytes) {
                    alert(`文件 "${file.name}" 太大了 (超过 ${maxSizeMB}MB)。`);
                    fileInput.value = null; // 清空已选择的文件
                    return;
                }
            }
        });
    }

}); // [关键] 确保这是文件的最后一行
