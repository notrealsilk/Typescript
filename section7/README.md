# 제너릭

## 1. 제너릭 소개

- 다양한 타입에서 재사용할 수 있는 범용적인 코드

- ✔ 함수, 인터페이스, 클래스 등에 적용 가능

- ✔ 타입을 미리 정하지 않고, 사용할 때 결정 가능

- ✔ 유연하지만 타입 안정성을 유지할 수 있음

### 1) 제네릭 함수 (Generic Function)

- ✔ T는 타입 변수(type variable) 로, 함수가 호출될 때 실제 타입으로 대체됨

- ✔ func(10)을 호출하면 T = number, func("string")을 호출하면 T = string

```ts
// <T> 타입 변수 선언
function func<T>(value: T): T {
  return value;
}

// 함수 호출 시 타입이 자동으로 결정됨
let num = func(10);         // T = number
let bool = func(true);      // T = boolean
let str = func("string");   // T = string
let arr = func<[number, number, number]>([1, 2, 3]); // T = [number, number, number]

```

### 2) 제네릭을 활용한 제약 조건 (Constraints)

- 제네릭을 사용할 때, 특정 조건을 만족하는 타입만 허용할 수도 있음

- ✔ extends를 사용해 특정 속성이 있는 타입만 받도록 제한 가능

```ts
// { length: number } 속성을 가진 타입만 허용
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("Hello");  // ✅ OK (문자열은 length 속성을 가짐)
getLength([1, 2, 3]); // ✅ OK (배열도 length 속성을 가짐)
// getLength(10); // ❌ 오류 발생 (number는 length 속성이 없음)

```

## 2. 타입 변수 응용하기

### 1) 제네릭을 사용해 서로 다른 타입의 값을 바꿔 반환

✔ T와 U를 사용해 매개변수의 타입이 다를 수 있도록 유연성 제공

✔ "1"(string)과 2(number)를 입력하면 [2, "1"]을 반환

```ts
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);

```

### 2) 제네릭을 사용하여 튜플의 첫 번째 요소 타입을 반환

✔ T를 첫 번째 요소의 타입으로 지정

✔ 나머지 요소는 unknown[]으로 두어 가변적인 길이 허용

✔ 첫 번째 요소만 반환하여 타입 안정성을 유지

```ts
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]); // ✅ number 반환 (0)
let str = returnFirstValue([1, "hello", "mynameis"]); // ✅ number 반환 (1)

```

### 3) 제네릭에 타입 제한 (Constraints) 추가

✔ T extends { length: number } → length 속성이 있어야 함

✔ 문자열, 배열, length 속성이 있는 객체는 허용

✔ undefined, null은 허용되지 않음

```ts
interface A {
  length: number;
}

interface B extends A {}

// T의 타입을 length 속성이 있는 객체로 제한
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123");      // ✅ OK (문자열은 length 속성이 있음)
getLength([1, 2, 3]);  // ✅ OK (배열도 length 속성이 있음)
getLength({ length: 1 }); // ✅ OK (객체에 length 속성이 있음)

// getLength(undefined); // ❌ 오류 발생 (undefined는 length 속성이 없음)
// getLength(null); // ❌ 오류 발생 (null도 length 속성이 없음)

```

## 3. map, forEach 메서드 타입 정의하기

### 1)

```ts

```

## 4. 제네릭 인터페이스 & 제네릭 타입 별칭

### 1)

```ts

```

## 5. 제네릭 클래스

### 1)

```ts

```

## 6. 프로미스와 제네릭

### 1)

```ts

```