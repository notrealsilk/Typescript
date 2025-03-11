/**
 * 제네릭
 */

// 제네릭 함수
// 모든 타입에 두루두루 쓸 수 있는 함수
// 함수의 인수에 따라 함수의 반환값을 가변적으로 처리할 수 있게 하는 방법

// 타입 변수`<T>`를 선언
function func<T>(value: T): T {
  return value;
}

let num = func(10);
// num.toUpperCase();

if (typeof num === "number") {
  num.toFixed();
}

let bool = func(true);

let str = func("string");

let arr = func<[number, number, number]>([1, 2, 3]);
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}
