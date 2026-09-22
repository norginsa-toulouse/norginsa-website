// Mobilmenyen (sidebar) i navbaren. Temavekslingen ligger i assets/js/theme.js.
const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebar = document.getElementById('mobileSidebar');

// Sidebar open/close with body scroll lock
function openSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
    sidebarOverlay.classList.add('opacity-100', 'pointer-events-auto');
    document.body.classList.add('sidebar-open');
    sidebar.focus();
}
function closeSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
    sidebarOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.classList.remove('sidebar-open');
}
sidebarOpenBtn && sidebarOpenBtn.addEventListener('click', openSidebar);
sidebarCloseBtn && sidebarCloseBtn.addEventListener('click', closeSidebar);
sidebarOverlay && sidebarOverlay.addEventListener('click', closeSidebar);
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
