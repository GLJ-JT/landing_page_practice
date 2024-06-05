// script.js

class TextScramble {
  constructor(element) {
      this.element = element;
      this.chars = 'abcdefghijklmnopqrstuvwxyz';
      this.scrambleIntervals = new Map();
      this.init();
  }

  
  init() {
    this.element.querySelectorAll('a').forEach(link => {
        link.setAttribute('data-original-text', link.textContent);
        link.addEventListener('mouseover', () => {
            this.stopScramble(link); // Stop any ongoing scramble
            this.scrambleText(link, 'hover');
        });
        link.addEventListener('mouseleave', () => {
            this.stopScramble(link); // Stop any ongoing scramble
            this.scrambleText(link, 'leave');
        });
    });
}

scrambleText(link, action) {
    const originalText = link.getAttribute('data-original-text');
    const charsArray = Array.from(originalText);
    const totalDuration = 500; // Total duration in milliseconds
    const frameRate = 30; // Frames per second
    const frameDuration = 1000 / frameRate;
    const iterations = Math.ceil(totalDuration / frameDuration);

    let frame = 0;
    const scrambleInterval = setInterval(() => {
        if (frame < iterations) {
            link.textContent = this.generateScrambledText(charsArray, frame / iterations, action);
            frame++;
        } else {
            clearInterval(scrambleInterval);
            link.textContent = originalText;
            this.scrambleIntervals.delete(link);
        }
    }, frameDuration);

    // Store the interval ID so it can be cleared later
    this.scrambleIntervals.set(link, scrambleInterval);
}

stopScramble(link) {
    if (this.scrambleIntervals.has(link)) {
        clearInterval(this.scrambleIntervals.get(link));
        this.scrambleIntervals.delete(link);
    }
}

generateScrambledText(charsArray, progress, action) {
    const scrambledText = charsArray.map((char, index) => {
        if (action === 'hover' && index === 0) {
            return char; // Preserve the initial letter on hover
        }
        if (action === 'leave' && index >= charsArray.length - Math.floor(progress * charsArray.length)) {
            return charsArray[index]; // Preserve letters from right to left on leave
        }
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    });

    // Ensure that the scrambling progresses from left to right or right to left
    if (action === 'hover') {
        const maxIndex = Math.floor(progress * charsArray.length);
        for (let i = 1; i < maxIndex; i++) {
            scrambledText[i] = charsArray[i];
        }
    } else if (action === 'leave') {
        const minIndex = charsArray.length - Math.floor(progress * charsArray.length);
        for (let i = minIndex; i < charsArray.length; i++) {
            scrambledText[i] = charsArray[i];
        }
    }

    return scrambledText.join('');
}
}

// Init TextScramble
document.querySelectorAll('[data-text-scramble]').forEach(element => {
new TextScramble(element);
});