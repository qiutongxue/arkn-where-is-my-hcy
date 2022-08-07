const SPEED = 200

let curProgress = 0

const progressDOMs = document.querySelectorAll('.progress')

const clamp = (n, min, max) => {
  if (n < min) return min
  if (n > max) return max
  return n
}

function inc(amount) {
  let n = clamp(curProgress / 100, 0.008, 0.994)
  if (!n) {
    return start();
  } else if (n > 1) {
    return;
  } else {
    if (typeof amount !== 'number') {
      if (n >= 0 && n < 0.2) { amount = 0.1; }
      else if (n >= 0.2 && n < 0.5) { amount = 0.04; }
      else if (n >= 0.5 && n < 0.8) { amount = 0.02; }
      else if (n >= 0.8 && n < 0.99) { amount = 0.005; }
      else { amount = 0; }
    }

    n = clamp(n + amount, 0, 0.994);
    return set(n * 100);
  }
};

function start() {

  const work = function() {
    setTimeout(function() {
      if (curProgress >= 100) return;
      inc();
      work();
    }, SPEED);
  };

  work();
}

const setWidth = (width) => {
  progressDOMs.forEach(dom => {
    dom.style.width = `${width | 0}%`
  })
}

const setNumber = (p) => {
    const span = document.querySelector('.progress-num')
    span.innerText = `${p | 0}`
}

function set(n) {
  curProgress = n
  setWidth(curProgress / 2)
  setNumber(curProgress)
  if (curProgress >= 100) {
    const loading = document.getElementById('loading')
    setTimeout(() => {
      loading.style.transform = 'translateY(-100%)'
      setTimeout(() => loading.style.display = 'none', 500)
    }, 100)
  }
}

function done() {
  set(100)
}

start()

window.addEventListener('load', () => {
  done()
})

