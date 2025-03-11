# 함수와 타입

## 1. 함수 타입

- 매개변수의 타입과 반환값의 타입을 명확히 지정

### 1) 기본적인 함수 타입 선언

```ts
function func(a: number, b: number): number {
  return a + b;
}

// a: number, b: number → 매개변수 타입 지정
// : number → 반환값 타입 지정
```
### 2) 화살표 함수 타입 정의

```ts
const add = (a: number, b: number): number => a + b;
```

### 3) 매개변수 타입

- 기본값이 있는 매개변수

```ts
function introduce(name = "이정환", age: number, tall?: number) {
  console.log(`name : ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}

// name = "이정환" → 기본값이 있는 매개변수
// tall?: number → 선택적(optional) 매개변수

```

### 4) 나머지 매개변수 (Rest Parameters)

```ts
function getSum(...rest: [number, number, number]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));

  return sum;
}

// ...rest: [number, number, number] → 튜플 타입을 사용하여 정확한 개수(3개)만 받도록 제한
// rest.forEach((it) => (sum += it)) → 모든 요소를 더해서 반환

```

## 2. 함수 타입 표현식과 호출 시그니쳐

### 1) 함수 타입 표현식 (Function Type Expression)

- 함수의 타입을 변수처럼 정의

```ts
type Operation = (a: number, b: number) => number;
// → 함수 타입을 Operation이라는 별칭으로 정의

const add: (a: number, b: number) => number = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
// → 변수를 선언할 때 Operation을 타입으로 사용
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;

```

### 2) 호출 시그니처 (Call Signature) 

- 함수 타입에 추가적인 속성을 부여

```ts
type Operation2 = {
  (a: number, b: number): number; // 함수 타입 정의
  name: string; // 추가 속성 정의 가능
};

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;


// Operation2 타입은 함수 타입과 추가 속성을 함께 정의할 수 있음

// 예제에서는 name: string; 속성을 추가했지만, 실제로 add2.name을 사용하려면 따로 할당해야 함.
```
- 속성 추가하는 법

```ts
add2.name = "덧셈 함수";
console.log(add2.name); // "덧셈 함수"

//  name 속성은 함수에 자동으로 할당되지 않으므로, 직접 값을 넣어야 함
```

## 3. 함수 타입의 호환성 

- 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은지를 판단하는 기준

- ✅ 호환성 판단 기준 (2가 만족해야 ㅇ)

  - 반환값의 타입이 호환되는가?

  - 매개변수의 타입이 호환되는가?

### 1) 반환값의 타입 호환성

- 업캐스팅(상위 타입으로 변환) → ✅ 호환 가능

- 다운캐스팅(하위 타입으로 변환) → ❌ 호환 불가능

```ts
type A = () => number;
type B = () => 10; // number의 하위 타입 (리터럴 타입)

let a: A = () => 10;
let b: B = () => 10;

a = b;  // ✅ 업캐스팅 (number ← 10) → OK!
b = a;  // ❌ 다운캐스팅 (10 ← number) → Error!

// b는 10이라는 고정된 값을 반환하지만, a는 number를 반환하므로 b = a는 불가능 ❌
```

### 2) 매개변수의 타입 호환성

- 매개변수 개수가 같을 때

  - 매개변수 타입 업캐스팅 → ❌ 호환 불가능

  - 매개변수 타입 다운캐스팅 → ✅ 호환 가능

```ts
// c = d의 경우, d는 10만 받을 수 있지만 c는 모든 number를 받으므로 호환 불가능 ❌

// 반면, d = c는 10을 포함한 number 타입을 받을 수 있으므로 호환 가능 ✅

type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {}; 
let d: D = (value) => {};

// c = d; // ❌ 업캐스팅이므로 불가능
d = c;   // ✅ 다운캐스팅이므로 가능

```
- 객체 타입을 매개변수로 사용할 때

  - 매개변수의 속성이 많을수록 구체적

  - 구체적인 타입을 받는 함수(Dog)는 일반적인 타입(Animal)을 받는 함수로 대체 가능


```ts
type Animal = { name: string };
type Dog = { name: string; color: string };

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

// animalFunc = dogFunc; // ❌ Error (Animal 타입을 Dog 타입으로 받을 수 없음)
dogFunc = animalFunc;   // ✅ OK! (Dog는 Animal보다 더 구체적이므로 호환 가능)

```

-  매개변수 개수가 다를 때
  - 매개변수 개수가 적은 함수 → 매개변수 개수가 많은 함수로 대입 가능 ✅

```ts
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // ✅ OK! (두 번째 매개변수를 무시하면 되므로 가능)
// func2 = func1; // ❌ Error (두 번째 매개변수가 없으므로 불가능)


```


## 4. 함수 오버로딩

- 하나의 함수가 매개변수 개수나 타입에 따라 다른 동작을 수행하도록 만듦

- TS 에서만 사용가능

### 1) 함수 오버로딩 구조

- 1️⃣ 오버로드 시그니처 (Overload Signatures)   

  - 다양한 매개변수 조합을 정의하는 선언부

- 2️⃣ 구현 시그니처 (Implementation Signature)

  - 실제 동작을 구현하는 함수 본문

```ts
// ✅ 오버로드 시그니처 (함수 선언부)
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// ✅ 구현 시그니처 (실제 동작)
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c); // 3개의 숫자를 더한 값 출력
  } else {
    console.log(a * 20); // 1개의 숫자에 20을 곱한 값 출력
  }
}

// ✅ 함수 호출
func(1);       // 1 * 20 = 20
func(1, 2, 3); // 1 + 2 + 3 = 6

```

## 5. 사용자 정의 타입 가드

- 함수를 이용해서 타입 가드 만드는 문법

```ts
// ✅ 강아지(Dog)인지 판별하는 함수
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

// ✅ 고양이(Cat)인지 판별하는 함수
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}


// ✔ isDog(animal)이 true일 경우, animal의 타입이 Dog로 확정됨

// ✔ "isScratch" in animal을 추가적으로 활용하여 Cat 타입인지 체크 가능

function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log("강아지입니다:", animal);
    // TypeScript가 자동으로 `Dog` 타입으로 인식 (isBark 사용 가능)
    console.log(animal.isBark); // ✅ OK!
  } else if ("isScratch" in animal) {
    console.log("고양이입니다:", animal);
    // `isScratch` 속성이 있는 경우 Cat 타입으로 확정됨
    console.log(animal.isScratch); // ✅ OK!
  }
}

```