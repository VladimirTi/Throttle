'use strict';

/**
 * Реализовать декоратор `throttle`:
 * Так чтобы текущие координаты мышки в консоли при движении печатались раз в секунду
 * 1 раз когда мышь только шевельнулась
 * дальше каждую секунду
 * После остановки дождаться очередную секунду и напечатать координаты в последний раз
 * Функция onMove должна получать тот же `this` и аргументы, что и обёртка
**/
const throttle = (func, delay) => {
  let lastCallTime;
  let timer;
  return (...args) => {
    const callTime = Date.now();
    if(!lastCallTime || callTime >= lastCallTime + delay) {
      lastCallTime = Date.now();
      func(...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    }
  }
};

function onMove(event) {
  throttlePositionElement.textContent = `x: ${ event.clientX }, y: ${ event.clientY }`
}

function onMoveRealtime(event) {
  realtimePositionElement.textContent = `x: ${ event.clientX }, y: ${ event.clientY }`
}

const realtimePositionElement = document.querySelector('#realtime');
const throttlePositionElement = document.querySelector('#throttle');

const wrapper = throttle(onMove, 1000);

document.addEventListener('mousemove', wrapper);
document.addEventListener('mousemove', onMoveRealtime);
