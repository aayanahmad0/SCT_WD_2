 let startTime = 0;
    let elapsedTime = 0;
    let interval = null;
    let running = false;

    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');

    function updateDisplay() {
      const time = elapsedTime + (running ? Date.now() - startTime : 0);
      const date = new Date(time);

      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');

      display.textContent = `${minutes}:${seconds}:${milliseconds}`;
    }

    function startStopwatch() {
      if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateDisplay, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
      } else {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        running = false;
        startStopBtn.textContent = 'Start';
      }
    }

    function resetStopwatch() {
      clearInterval(interval);
      running = false;
      startTime = 0;
      elapsedTime = 0;
      display.textContent = '00:00:00';
      startStopBtn.textContent = 'Start';
      lapsList.innerHTML = '';
      lapBtn.disabled = true;
    }

    function recordLap() {
      const time = display.textContent;
      const li = document.createElement('li');
      li.textContent = `Lap ${lapsList.children.length + 1}: ${time}`;
      lapsList.appendChild(li);
    }

    startStopBtn.addEventListener('click', startStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);