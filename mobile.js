let highestZ = 1;

const dragSound = document.getElementById("dragSound");

let musicStarted = false;

class Paper {

  constructor() {
    this.holdingPaper = false;

    this.currentPaperX = 0;
    this.currentPaperY = 0;

    this.startX = 0;
    this.startY = 0;

    this.rotation = Math.random() * 30 - 15;
  }

  init(paper) {

    paper.style.position = "absolute";
    paper.style.touchAction = "none";

    // MULAI DRAG
    paper.addEventListener("pointerdown", (e) => {

      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;

      this.startX = e.clientX - this.currentPaperX;
      this.startY = e.clientY - this.currentPaperY;

      // play audio sekali
      if (!musicStarted && dragSound) {
        dragSound.play().catch(() => {});
        musicStarted = true;
      }

    });

    // SAAT DIGERAKKAN
    window.addEventListener("pointermove", (e) => {

      if (!this.holdingPaper) return;

      this.currentPaperX = e.clientX - this.startX;
      this.currentPaperY = e.clientY - this.startY;

      paper.style.transform = `
        translate(${this.currentPaperX}px, ${this.currentPaperY}px)
        rotate(${this.rotation}deg)
      `;

    });

    // SELESAI DRAG
    window.addEventListener("pointerup", () => {
      this.holdingPaper = false;
    });

  }
}

const papers = document.querySelectorAll(".paper");

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});