// ดึง Element ปุ่ม
const btnPartner = document.getElementById('btn-role-partner');
const btnCreator = document.getElementById('btn-role-creator');

// เมื่อแฟนคลิก -> ไปหน้า 1 (Passcode)
btnPartner.addEventListener('click', () => {
  navigateToPage('passcode-page');
});

// เมื่อผู้สร้างคลิก -> ไปหน้า 4 (Admin Dashboard)
btnCreator.addEventListener('click', () => {
  navigateToPage('admin-page');
});

// ฟังก์ชันสลับหน้า
function navigateToPage(pageId) {
  document.querySelectorAll('.page-container').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}