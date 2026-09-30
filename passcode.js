// js/passcode.js
const CORRECT_PASSCODE = "2408"; // 👈 ตั้งค่าวันครบรอบของคุณ (เช่น 1402)

const passcodeCard = document.getElementById('passcode-card');
const passcodeInput = document.getElementById('passcode-input');
const btnSubmitPasscode = document.getElementById('btn-submit-passcode');
const passcodeError = document.getElementById('passcode-error');

if (btnSubmitPasscode) {
  btnSubmitPasscode.addEventListener('click', checkPasscode);
}

// เพิ่มกรณีเมื่อกด Enter ในช่องกรอกรหัส ให้ยื่นยันได้ทันที
if (passcodeInput) {
  passcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPasscode();
    }
  });
}

function checkPasscode() {
  const enteredCode = passcodeInput.value.trim();
  
  if (enteredCode === CORRECT_PASSCODE) {
    passcodeError.textContent = "";
    
    // 🔴 แก้ไขตรงนี้: เปลี่ยนหน้าไปยัง quiz.html
    window.location.href = 'quiz.html';
  } else {
    // รหัสผิด -> สั่นการ์ด และแสดงข้อความกวนๆ
    if (passcodeCard) passcodeCard.classList.add('shake-anim');
    passcodeError.textContent = "เอ๊ะ! ลืมวันสำคัญของเราหรือเปล่านะ? 💗 ลองอีกทีสิ!";
    
    setTimeout(() => {
      if (passcodeCard) passcodeCard.classList.remove('shake-anim');
    }, 500);
  }
}