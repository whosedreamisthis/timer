class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.active = false;
    this.isPaused = true;
    this.durationInput = durationInput;
    if (callbacks) {
      this.onTick = callbacks.onTick;
      this.onStart = callbacks.onStart;
      this.onComplete = callbacks.onComplete;
    }
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.pauseButton.addEventListener("click", this.pause);
    this.startButton.addEventListener("click", this.start.bind(this));

    this.durationInput.addEventListener("change", this.change);
  }

  change = (evt) => {
    this.timeRemaining = evt.target.value;
  };

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 50);
    this.startButton.disabled = true;
    this.pauseButton.disabled = false;
    this.durationInput.disabled = true;
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.timeRemaining = 0;
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
    }
    if (this.onTick) {
      this.onTick(this.timeRemaining);
    }
  };

  pause = () => {
    //this.isPaused = true;
    clearInterval(this.interval);
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
    this.durationInput.disabled = false;
  };

  onDurationChanged() {}

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
