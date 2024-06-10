document.addEventListener("DOMContentLoaded", () => {
    const targets = document.getElementsByClassName('fade');
    for (let i = targets.length; i--;) {
      let observer = new IntersectionObserver((entries, observer) => {
        for (let j = entries.length; j--;) {
          if (entries[j].isIntersecting) {
            entries[j].target.classList.add('active');
          } else {
            entries[j].target.classList.remove('active');
          }
        }
      });
      observer.observe(targets[i]);
    }
  });

const rows = document.querySelectorAll('.carousel-row');
// 这段代码是将每一张图片克隆一份，并追加到行的末尾。这是为了实现无缝滚动。
rows.forEach(row => {
  const images = Array.from(row.children);
  images.forEach(image => {
    const clone = image.cloneNode();
    row.appendChild(clone);
  });
//这部分代码根据是否包含 reverse 类来确定滚动方向。
//如果方向是正向1（从左到右），初始滚动位置是0；如果方向是反向-1（从右到左），初始滚动位置是行宽的一半。
  let direction = row.classList.contains('reverse') ? -1 : 1;
  let scrollAmount = direction === 1 ? 0 : row.scrollWidth / 2;
  const scrollStep = 1;
  const scrollDelay = 10;

//scroll 函数每次调用时都会更新 scrollAmount 和 row.scrollLeft。
//当到达滚动边界时，重置 scrollAmount，从而实现无缝滚动。
  function scroll() {
    scrollAmount += direction * scrollStep;
    row.scrollLeft = scrollAmount;

    if (direction === 1 && row.scrollLeft >= row.scrollWidth / 2) {
      scrollAmount = 0;
    } else if (direction === -1 && row.scrollLeft <= 0) {
      scrollAmount = row.scrollWidth / 2;
    }

    setTimeout(scroll, scrollDelay);
  }

  scroll();
});

// 以下是footer
  
  document.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      footer.classList.add('scroll');
    } else {
      footer.classList.remove('scroll');
    }
  });
