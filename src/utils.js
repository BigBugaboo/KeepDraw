/**
 * throttle 限流
 * @param {func} func 回调
 * @param {number} duration 持续时间
 * @param {number} type 1 表时间戳版，2 表定时器版
 */

export const throttle = (func, duration = 1000, type = 1) => {
  let previous, timeout;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timeout = null;
  }

  return function() {
    let args = arguments;

    if (type === 1) {
      let now = Date.now();

      if (now - previous > duration) {
        func.apply(this, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, duration);
      }
    }
  };
};

/**
 * debounce 防抖
 * @param {func} func 回调
 * @param {number} wait 间隔
 * @param {bool} immediate 是否立即执行
 */

export const debounce = (func, wait = 1000, immediate = false) => {
  let timeout;

  return function() {
    let args = arguments;

    if (immediate) {
      // 通过 timeout 为 undefined 判断是否存在定时器,没有则立即执行
      let callNow = !timeout;

      // 设置定时器，防止重复触发
      timeout = setTimeout(() => {
        // 到时后，只为 null 可重复注册事件
        timeout = null;
      }, wait);

      // 如果为 true 表示可执行
      if (callNow) {
        func.apply(this, args);
      }
    } else {
      // 设置定时器，如果重复触发，则重新注册事件
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
};
