// Valentine Invitation - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  const questionScreen = document.getElementById('question-screen');
  const successScreen = document.getElementById('success-screen');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const invalidMessage = document.getElementById('invalid-message');

  let noClickCount = 0;

  // Yes button - show success screen
  yesBtn.addEventListener('click', () => {
    // Add a cute "pop" feedback
    yesBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      yesBtn.style.transform = '';
    }, 150);

    // Transition to success screen
    questionScreen.classList.remove('active');
    questionScreen.style.opacity = '0';
    questionScreen.style.transform = 'scale(0.9)';
    questionScreen.style.transition = 'all 0.4s ease-out';

    setTimeout(() => {
      successScreen.classList.add('active');
      successScreen.style.opacity = '1';
      addConfettiHearts();
    }, 400);
  });

  // No button - show invalid message (cute way)
  noBtn.addEventListener('click', () => {
    noClickCount++;
    
    // Hide invalid message if it was showing, then show again with animation
    invalidMessage.classList.add('hidden');
    
    // Shake the no button
    noBtn.style.animation = 'none';
    noBtn.offsetHeight; // Trigger reflow
    noBtn.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      noBtn.style.animation = '';
    }, 500);

    // Show the cute invalid message
    setTimeout(() => {
      invalidMessage.classList.remove('hidden');
      invalidMessage.style.animation = 'none';
      invalidMessage.offsetHeight;
      invalidMessage.style.animation = 'wiggle 0.5s ease-in-out';
    }, 100);

    // Make the No button run away on repeated clicks (playful)
    if (noClickCount >= 3) {
      const maxX = window.innerWidth - noBtn.offsetWidth - 40;
      const maxY = window.innerHeight - noBtn.offsetHeight - 40;
      const randomX = Math.random() * maxX + 20;
      const randomY = Math.random() * maxY + 20;
      
      noBtn.style.position = 'fixed';
      noBtn.style.left = randomX + 'px';
      noBtn.style.top = randomY + 'px';
      noBtn.style.transition = 'all 0.3s ease-out';
    }
  });

  // Add shake animation for No button
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);

  // Create confetti hearts for success screen
  function addConfettiHearts() {
    const container = document.querySelector('.confetti-hearts');
    const hearts = ['💕', '💖', '💗', '❤️', '💝', '🌸'];
    
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('span');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -30px;
        font-size: ${1 + Math.random() * 1.5}rem;
        animation: confetti-fall ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 0.5}s forwards;
        opacity: 0;
      `;
      container.appendChild(heart);
      
      setTimeout(() => {
        heart.style.opacity = '1';
      }, 50);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
  }
});
