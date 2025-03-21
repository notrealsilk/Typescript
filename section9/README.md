# 조건부 타입

## 1. 조건부 타입 소개

- 삼항 연산자로 조건에 따라 타입 결정

### 1) 조건부 타입 (Conditional Type)

```ts
// 조건부 타입: 특정 타입이 다른 타입을 확장하는지 여부에 따라 타입을 결정
type A = number extends string ? string : number; // ❌ number는 string을 확장하지 않으므로 A = number

// 객체 비교 예제
type ObjA = {
  a: number;
};

type ObjB = {
  a: number;
  b: number;
};

type B = ObjB extends ObjA ? number : string; 
// ✅ ObjB는 ObjA를 확장하므로 B = number
```
✔ extends를 사용하여 타입 간의 관계를 평가하고, 조건에 따라 다른 타입을 반환할 수 있음
✔ 객체 비교에서 ObjB가 ObjA를 포함하고 있으므로 ObjB extends ObjA는 true


### 2) 제네릭과 조건부 타입

```ts
// 제네릭과 조건부 타입을 결합하여 특정 타입에 따라 변환
// - <T> : 타입 변수
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number>; // ✅ varA의 타입은 string
let varB: StringNumberSwitch<string>; // ✅ varB의 타입은 number
```
✔ T가 number이면 string, 그렇지 않으면 number 반환
✔ StringNumberSwitch<number> → string
✔ StringNumberSwitch<string> → number

### 3) 조건부 타입을 활용한 함수 반환 타입

```ts
// 조건부 타입을 활용한 함수 오버로딩
function removeSpaces<T>(text: T): T extends string ? string : undefined;
function removeSpaces(text: any) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpaces("hi im winterlood");
result.toUpperCase(); // ✅ 정상

let result2 = removeSpaces(undefined); // result2의 타입은 undefined

```
✔ removeSpaces<T>(text: T): T extends string ? string : undefined;
✔ 입력값이 string이면 string을 반환, 그렇지 않으면 undefined를 반환
✔ result는 string이므로 .toUpperCase() 사용 가능
✔ result2는 undefined이므로 문자열 메서드 사용 불가

## 2. 분산적인 조건부 타입

### 1) 분산적인 조건부 타입 (Distributive Conditional Type)

- 

```ts
// 분산적인 조건부 타입 예제
type StringNumberSwitch<T> = [T] extends [number] ? string : number;

let a: StringNumberSwitch<number>;  // string
let b: StringNumberSwitch<string>;  // number..T가 숫자 타입이 됨

// 분산적인 조건부 
// 문자열, 숫자형 타입으로 모두 평가하고 유니언으로 묶이는 것
let c: StringNumberSwitch<number | string>; 
// (StringNumberSwitch<number> | StringNumberSwitch<string>) → string | number

//
let d: StringNumberSwitch<boolean | number | string>;
// 1단계: 개별적으로 평가
// StringNumberSwitch<boolean> | StringNumberSwitch<number> | StringNumberSwitch<string>

// 2단계: 조건부 타입 적용
// number | string | number

// 결과적으로 number | string

```
✔ T가 유니온 타입(number | string)일 경우, `각 타입을 개별적으로 조건에 적용`한 후 `결과를 합침`

✔ StringNumberSwitch<number | string> → StringNumberSwitch<number> | StringNumberSwitch<string>

✔ 결과적으로 number | string 이 됨

### 2) 실용적인 예제 - Exclude<T, U>

```ts
// 특정 타입을 제외하는 조건부 타입
type Exclude<T, U> = T extends U ? never : T;

type A = Exclude<number | string | boolean, string>;
// 1단계: 개별 평가
// Exclude<number, string> | Exclude<string, string> | Exclude<boolean, string>

// 2단계: 조건부 타입 적용
// number | never | boolean

// 최종 결과
// 유니언 타입에 never(공집합이므로 number타입에 합쳐져서)에 있으면 사라짐
// number | boolean

```
✔ Exclude<T, U>는 T에서 U에 해당하는 타입을 제거하는 역할

✔ Exclude<number | string | boolean, string> → number | boolean

```ts
type B = Exclude<"a" | "b" | "c", "b">; 
// "a" | never | "c" → "a" | "c"

```
✔ "b"가 제외되고 "a" | "c" 만 남음



## 3. infer - 조건부 타입 내에서 타입 추론하기

### 1) infer 키워드란?
- infer는 조건부 타입 내부에서 타입을 추론하는 기능을 제공하는 키워드

- 특정 타입만 추론 가능

✔ extends 조건문 내에서 특정 타입을 추론할 때 사용

✔ 제네릭을 활용하여 함수의 반환 타입, 프로미스 결과 타입 등을 추출 가능


### 2) 함수의 반환 타입 추출 (ReturnType<T>)

```ts
type FuncA = () => string;
type FuncB = () => number;

// 조건부 타입을 사용하여 함수의 반환 타입을 추출
type ReturnType<T> = T extends () => infer R ? R : never;

type A = ReturnType<FuncA>; // string
type B = ReturnType<FuncB>; // number
type C = ReturnType<number>; // never (함수가 아니므로 추출 불가능)

```
✔ infer R → T가 함수 타입이라면, 반환 타입을 R로 추출
✔ FuncA → string, FuncB → number 반환
✔ number 같은 함수가 아닌 타입을 넣으면 never이 반환됨

### 3) 프로미스 결과 타입 추출 (PromiseUnpack<T>)

```ts
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 반드시 Promise 타입이어야 한다.
// 2. Promise 타입 내부의 결과값 타입을 반환한다.

type PromiseA = PromiseUnpack<Promise<number>>; // number
type PromiseB = PromiseUnpack<Promise<string>>; // string

```
✔ infer R → Promise<T> 내부의 T를 추출
✔ Promise<number>이면 number를 반환
✔ Promise<string>이면 string을 반환
