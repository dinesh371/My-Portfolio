(function () {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Default to dark mode
  if (!savedTheme || savedTheme === 'dark') {
    body.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('portfolio-theme', currentTheme);
    });
  }

  // Initialize Charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#eef4ff'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#a4b0c4'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#a4b0c4'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    }
  };

  // Project Charts
  const iamCtx = document.getElementById('iamChart');
  if (iamCtx) {
    new Chart(iamCtx, {
      type: 'doughnut',
      data: {
        labels: ['Before', 'After'],
        datasets: [{
          data: [100, 5],
          backgroundColor: ['#ef4444', '#34d399']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#eef4ff'
            }
          }
        }
      }
    });
  }

  const endpointCtx = document.getElementById('endpointChart');
  if (endpointCtx) {
    new Chart(endpointCtx, {
      type: 'radar',
      data: {
        labels: ['Detection', 'Response', 'Prevention', 'Monitoring'],
        datasets: [{
          label: 'Effectiveness',
          data: [100, 95, 100, 98],
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#eef4ff'
            }
          }
        },
        scales: {
          r: {
            ticks: {
              color: '#a4b0c4'
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.1)'
            },
            pointLabels: {
              color: '#a4b0c4'
            }
          }
        }
      }
    });
  }

  const networkCtx = document.getElementById('networkChart');
  if (networkCtx) {
    new Chart(networkCtx, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Performance',
          data: [60, 75, 85, 100],
          borderColor: '#34d399',
          backgroundColor: 'rgba(52, 211, 153, 0.1)',
          tension: 0.4
        }]
      },
      options: chartOptions
    });
  }

  const automationCtx = document.getElementById('automationChart');
  if (automationCtx) {
    new Chart(automationCtx, {
      type: 'bar',
      data: {
        labels: ['Manual Tasks', 'Automated Tasks'],
        datasets: [{
          data: [15, 85],
          backgroundColor: ['#ef4444', '#34d399']
        }]
      },
      options: chartOptions
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Loading Screen
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.getElementById('loadingProgress');

  if (loadingScreen && loadingProgress) {
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        // Hide loading screen after a short delay
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start reveal animations
            initRevealAnimations();
          }, 500);
        }, 500);
      }
      loadingProgress.style.width = progress + '%';
    }, 100);
  } else {
    // If loading screen elements don't exist, just init animations
    initRevealAnimations();
  }
})();

// Enhanced Reveal Animations
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 150); // Stagger animations
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Special handling for timeline cards
  document.querySelectorAll('.timeline-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}
