/**
 * throttle 限流
 * @param {func} callBack 回调
 * @param {number} duration 持续时间
 * @return func
 */
export const throttle = (callBack, duration = 500) => {
  let lastTime = new Date().getTime();
  return () => {
    const nowTime = new Date().getTime();
    if (nowTime - lastTime > duration) {
      callBack();
      lastTime = nowTime;
    }
  };
};

/**
 * debounce 防抖
 * @param {func} callBack 回调
 * @param {number} time 间隔
 * @return func
 */
export const debounce = (callBack, time = 1000) => {
  let t = null;
  return () => {
    clearTimeout(t);
    t = setTimeout(callBack(), time);
  };
};
