// Butterfly Security Control System

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the system
  initSystem();

  // Matrix background effect
  createMatrixEffect();

  // Initialize terminal
  initTerminal();

  // Initialize joystick controls
  initJoystick();

  // System status updates
  startStatusUpdates();
});

function initSystem() {
  console.log("BUTTERFLY Security System Initializing...");

  // Add loading animation
  const loadingBar = document.querySelector(".progress-bar");
  if (loadingBar) {
    simulateLoading(loadingBar);
  }

  // Add hover effects to all interactive elements
  const interactiveElements = document.querySelectorAll(
    ".btn, .nav-link, .stat-card, .control-panel"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

function createMatrixEffect() {
  const container = document.createElement("div");
  container.className = "matrix-bg";
  document.body.appendChild(container);

  // Create falling characters effect
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createFallingChar(container);
    }, i * 100);
  }
}

function createFallingChar(container) {
  const char = document.createElement("div");
  char.textContent = String.fromCharCode(0x30a0 + Math.random() * 96);
  char.style.position = "absolute";
  char.style.left = Math.random() * 100 + "vw";
  char.style.top = "-20px";
  char.style.color = "#00ff00";
  char.style.opacity = "0.3";
  char.style.fontSize = Math.random() * 10 + 10 + "px";
  char.style.fontFamily = "monospace";
  char.style.zIndex = "-1";

  container.appendChild(char);

  // Animation
  const duration = Math.random() * 3000 + 2000;
  const animation = char.animate(
    [
      { top: "-20px", opacity: 0 },
      { top: "20px", opacity: 0.7 },
      { top: "100vh", opacity: 0 },
    ],
    {
      duration: duration,
      easing: "linear",
    }
  );

  animation.onfinish = () => {
    char.remove();
    setTimeout(() => createFallingChar(container), Math.random() * 2000);
  };
}

function initTerminal() {
  const terminalBody = document.querySelector(".terminal-body");
  const cursor = document.querySelector(".terminal-cursor");

  // Simulate terminal commands
  const commands = [
    "security --scan complete",
    "encryption --level maximum",
    "firewall --status active",
    "drone --connection verified",
    "systems --all operational",
  ];

  let commandIndex = 0;

  setInterval(() => {
    if (commandIndex < commands.length) {
      addTerminalLine(terminalBody, `> ${commands[commandIndex]}`);
      commandIndex++;

      // Scroll to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }, 3000);
}

function addTerminalLine(terminal, text) {
  const line = document.createElement("div");
  line.className = "terminal-line text-green-400";
  line.textContent = text;
  terminal.appendChild(line);
}

function initJoystick() {
  const joystick = document.querySelector(".joystick");
  const handle = document.querySelector(".joystick-handle");
  const pitchValue = document.getElementById("pitch-value");
  const rollValue = document.getElementById("roll-value");

  let isDragging = false;

  joystick.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

  joystick.addEventListener("touchstart", startDrag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", stopDrag);

  function startDrag(e) {
    isDragging = true;
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;

    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;

    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate distance from center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = rect.width / 2 - 20; // 20 is handle radius

    // Limit to joystick bounds
    const limitedDistance = Math.min(distance, maxDistance);

    // Calculate angle
    const angle = Math.atan2(deltaY, deltaX);

    // Calculate new position
    const newX = Math.cos(angle) * limitedDistance;
    const newY = Math.sin(angle) * limitedDistance;

    // Update handle position
    handle.style.transform = `translate(${newX}px, ${newY}px)`;

    // Update values
    const pitch = Math.round((newY / maxDistance) * 30);
    const roll = Math.round((newX / maxDistance) * 30);

    pitchValue.textContent = `${pitch}°`;
    rollValue.textContent = `${roll}°`;

    // Send control data to drone (simulated)
    sendControlData(pitch, roll);
  }

  function stopDrag() {
    if (!isDragging) return;

    isDragging = false;

    // Return to center
    handle.style.transform = "translate(0, 0)";
    pitchValue.textContent = "0°";
    rollValue.textContent = "0°";

    // Send zero values
    sendControlData(0, 0);
  }
}

function sendControlData(pitch, roll) {
  // Simulate sending data to drone
  console.log(`Sending control data - Pitch: ${pitch}°, Roll: ${roll}°`);

  // In a real application, this would send data to your drone API
}

function startStatusUpdates() {
  // Simulate real-time status updates
  setInterval(() => {
    updateBatteryLevel();
    updateSignalStrength();
    updateSystemStatus();
  }, 5000);
}

function updateBatteryLevel() {
  const batteryLevel = Math.max(10, Math.floor(Math.random() * 100));
  const batteryBar = document.querySelector(".progress-bar");

  if (batteryBar) {
    batteryBar.style.width = `${batteryLevel}%`;

    // Change color based on level
    if (batteryLevel < 20) {
      batteryBar.className = "progress-bar bg-danger";
    } else if (batteryLevel < 50) {
      batteryBar.className = "progress-bar bg-warning";
    } else {
      batteryBar.className = "progress-bar bg-success";
    }

    // Update battery text
    const batteryText = document.querySelector(".status-card small");
    if (batteryText) {
      batteryText.textContent = `Battery: ${batteryLevel}%`;
    }
  }
}

function updateSignalStrength() {
  const signalLevel = Math.max(70, Math.floor(Math.random() * 100));
  const signalElement = document.querySelector(".col-md-3:last-child h3");

  if (signalElement) {
    signalElement.innerHTML = `${signalLevel}<span class="text-green-400">%</span>`;
  }
}

function updateSystemStatus() {
  // Randomly toggle system status for demo
  const systems = ["GPS", "GYROSCOPE", "CAMERA", "COMMS"];
  const statuses = ["ACTIVE", "STABLE", "READY", "SECURE"];

  systems.forEach((system, index) => {
    const badge = document.querySelector(
      `.col-md-3:nth-child(${index + 1}) .badge`
    );
    if (badge && Math.random() > 0.8) {
      // 20% chance to change status
      badge.textContent = statuses[index];
      badge.className = "badge bg-warning";

      // Return to normal after 2 seconds
      setTimeout(() => {
        badge.textContent = statuses[index];
        badge.className = "badge bg-success";
      }, 2000);
    }
  });
}

function simulateLoading(loadingBar) {
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);

      // Complete loading
      setTimeout(() => {
        document.querySelector(".video-placeholder").innerHTML = `
                    <div class="text-center">
                        <i class="fas fa-satellite-dish fa-4x text-green-500 mb-3"></i>
                        <p class="text-green-400">LIVE FEED ACTIVE</p>
                        <small class="text-green-300">BUTTERFLY-01 CAMERA FEED</small>
                    </div>
                `;
      }, 500);
    } else {
      width++;
      loadingBar.style.width = width + "%";
    }
  }, 30);
}

// Keyboard controls
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      // Simulate upward movement
      document
        .querySelector(".btn-control:first-child")
        .classList.add("active");
      break;
    case "ArrowDown":
      // Simulate downward movement
      document.querySelector(".btn-control:last-child").classList.add("active");
      break;
    case " ":
      // Space bar for hover
      e.preventDefault();
      document.querySelectorAll(".btn-control")[1].classList.add("active");
      break;
  }
});

document.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
    case " ":
      document.querySelectorAll(".btn-control").forEach((btn) => {
        btn.classList.remove("active");
      });
      break;
  }
});

// Export functions for global access
window.butterfly = {
  launch: function () {
    alert("BUTTERFLY-01 Launch Sequence Initiated");
  },
  land: function () {
    alert("BUTTERFLY-01 Landing Sequence Initiated");
  },
  emergency: function () {
    alert("EMERGENCY PROTOCOL ACTIVATED");
  },
};
