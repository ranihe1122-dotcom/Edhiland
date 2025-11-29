// 等待所有 HTML 内容加载完毕
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. [设置] 找到所有需要的元素 ---
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const sections = document.querySelectorAll('.content-section');
    const form = document.getElementById('oc-form');
    const fileInput = document.getElementById('q7-images');

    
    // --- 2. [功能] 点击链接时平滑滚动 + 立即高亮 ---
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
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    
    // --- 4. "ScrollSpy" (滚动侦测) 功能 ---
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

    
    // --- 6. 角色弹窗 (Modal) 逻辑 ---
    
    // 找到所有的“打开”链接
    const openModalLinks = document.querySelectorAll('[data-modal-target]');
    // 找到所有的“关闭”按钮
    const closeModalButtons = document.querySelectorAll('.modal-close');

    // 监听所有“打开”链接
    openModalLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止链接默认的 "#" 跳转
            
            // 1. 获取目标弹窗的 ID
            const modalId = link.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            
            // 2. 显示这个弹窗
            if (modal) {
                modal.classList.add('visible');
            }
        });
    });

    // 监听所有“关闭”按钮
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 找到这个按钮所在的弹窗 (父元素)
            const modal = button.closest('.modal-overlay');
            
            // 隐藏这个弹窗
            if (modal) {
                modal.classList.remove('visible');
            }
        });
    });
    
    // (可选) 点击遮罩背景时也关闭弹窗
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // 检查点击的是否是遮罩本身 (而不是内容卡片)
            if (event.target === overlay) {
                overlay.classList.remove('visible');
            }
        });
    });


}); // [关键] 确保这是文件的最后一行
