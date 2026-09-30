import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// 🗓️ 1. คำนวณเวลานับจริง (กำหนดวันที่เริ่มคบกันที่นี่)
const START_DATE = new Date("2026-08-24T00:00:00"); // 👈 เปลี่ยนเป็น YYYY-MM-DD จริงของคุณ

function updateTimer() {
  const now = new Date();
  const diff = now - START_DATE;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
}
setInterval(updateTimer, 1000);
updateTimer();

// ✉️ 2. ระบบจดหมายเปิดพร้อมประกายดาว
const lettersData = {
  1: "ขอบคุณที่เข้ามาเป็นความสดใสและเรื่องราวดีๆ ในทุกๆ วันของเค้านะคะ 💕✨",
  2: "ไม่ว่าจะเจอเรื่องเหนื่อยแค่ไหน หันมาก็จะเจอเค้าคอยกอดและเคียงข้างเสมอเลยนะ 🌸⭐",
  3: "รักเธอที่สุดในโลกเลย! ขอบคุณสำหรับความรักและความอบอุ่นที่มีให้กันเสมอครับ 🥰💖"
};

const modal = document.getElementById('letter-modal');
const letterText = document.getElementById('letter-text');

window.openLetter = function(id) {
  letterText.textContent = lettersData[id];
  modal.classList.add('active');
};

// ปิดจดหมายเมื่อคลิกที่พื้นที่ว่างภายนอก
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// 📝 3. ระบบบันทึกและดึงข้อความความในใจจาก Firestore
const noteInput = document.getElementById('note-input');
const btnSaveNote = document.getElementById('btn-save-note');
const notesContainer = document.getElementById('notes-display');

async function loadNotes() {
  notesContainer.innerHTML = "";
  try {
    const q = query(collection(db, "love_notes"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      const item = document.createElement('div');
      item.className = 'note-item';
      item.textContent = doc.data().text;
      notesContainer.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading notes: ", err);
  }
}

btnSaveNote.addEventListener('click', async () => {
  const text = noteInput.value.trim();
  if (!text) return;

  btnSaveNote.disabled = true;
  btnSaveNote.textContent = "กำลังบันทึก...";

  try {
    await addDoc(collection(db, "love_notes"), {
      text: text,
      createdAt: serverTimestamp()
    });
    noteInput.value = "";
    await loadNotes();
  } catch (err) {
    alert("ไม่สามารถบันทึกได้ ลองอีกครั้งนะ");
  } finally {
    btnSaveNote.disabled = false;
    btnSaveNote.textContent = "บันทึกความรู้สึก 💖";
  }
});

loadNotes();