const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }
document.querySelectorAll('[data-dropdown]').forEach((trigger) => { trigger.addEventListener('click', (event) => { event.stopPropagation(); const menu = document.getElementById(trigger.dataset.dropdown); document.querySelectorAll('.dropdown.open').forEach((openMenu) => { if (openMenu !== menu) openMenu.classList.remove('open'); }); menu.classList.toggle('open'); }); });
document.addEventListener('click', () => document.querySelectorAll('.dropdown.open').forEach((menu) => menu.classList.remove('open')));
const sidebar = document.getElementById('adminSidebar'); const overlay = document.querySelector('.sidebar-overlay');
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
document.querySelector('[data-sidebar-open]').addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('open'); });
document.querySelector('[data-sidebar-close]').addEventListener('click', closeSidebar); document.querySelectorAll('.sidebar a').forEach((link) => link.addEventListener('click', closeSidebar));
document.querySelector('[data-report]').addEventListener('click', () => { showToast('Preparing your dashboard report...'); setTimeout(() => window.print(), 700); });
document.querySelector('.select-control').addEventListener('change', (event) => showToast(`Showing adoption statistics for ${event.target.value.replace(' Year', '')}.`));