# 타입 조작하기

## 1. 타입 조작하기


## 2. 인덱스드 엑세스 타입

- 객체 또는 배열, 튜플에서 특정 요소의 타입을 가져올 때 사용하는 타입스크립트 문법

✔ 객체 속성의 타입을 동적으로 추출 가능
✔ 배열/튜플의 요소 타입을 가져올 수 있음
✔ 타입 안전성을 높이는 데 유용

### 1) 객체에서 인덱스드 엑세스 타입 사용

```ts
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}[];

```
✅ PostList[number] → 배열의 요소(Post 객체)의 타입을 가져옴
✅ PostList[number]["author"] → Post 객체의 author 속성 타입을 가져옴

```ts
function printAuthorInfo(author: PostList[number]["author"]) {
  console.log(`${author.name}-${author.id}`);
```
✔ author 매개변수의 타입을 PostList[number]["author"]로 지정하여 객체의 구조를 유지한 채 안전한 타입 체크 가능

### 2) 배열 요소 타입 가져오기

```ts
const post: PostList[0] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
    age: 27,
  },
};

printAuthorInfo(post.author);

```
✅ PostList[0] → PostList 배열의 첫 번째 요소(Post 객체)의 타입을 가져옴


### 3) 튜플에서 인덱스드 엑세스 타입 사용

```ts
type Tup = [number, string, boolean];

// 특정 인덱스의 타입 가져오기
type Tup0 = Tup[0]; // number
type Tup1 = Tup[1]; // string
type Tup2 = Tup[2]; // boolean

// type Tup3 = Tup[3]; // ❌ 오류 (튜플에 존재하지 않는 인덱스)

```
✔ Tup[0] → number
✔ Tup[1] → string
✔ Tup[2] → boolean

### 4) 튜플에서 모든 요소의 타입 가져오기

```ts
type TupNum = Tup[number]; // number | string | boolean
```
✅ Tup[number] → Tup 배열에서 가능한 모든 요소 타입의 유니온 타입을 가져옴
✔ 결과: number | string | boolean


## 3. keyof 연산자

- keyof 연산자는 객체 타입에서 모든 키의 유니온 타입을 추출하는 연산자

✔ 객체의 키를 안전하게 참조할 수 있도록 도와줌
✔ 동적 속성 접근을 타입 안전하게 처리 가능

### 1) keyof 연산자 기본 사용법

```ts
const person = {
  name: "이정환",
  age: 27,
};

// `typeof person`을 사용해 객체의 타입을 가져옴
type Person = typeof person;

// keyof Person → "name" | "age"
function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
}

// 올바른 키 사용 (✅ 정상)
getPropertyKey(person, "name"); // "이정환"
getPropertyKey(person, "age");  // 27

// 잘못된 키 사용 (❌ 오류 발생)
// getPropertyKey(person, "address"); // Error: 'address'는 'name' | 'age'에 포함되지 않음

```
✅ keyof typeof person → "name" | "age" 타입이 생성됨
✅ getPropertyKey 함수는 "name" 또는 "age"만 허용하여 안전한 동적 속성 접근 가능
✅ 잘못된 키("address")를 입력하면 타입 에러 발생


### 2) 실용적인 keyof 활용 예시

```ts
function printAllKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

const personKeys = printAllKeys(person);
console.log(personKeys); // ["name", "age"]

```
✔ Object.keys(obj)의 반환값을 타입 안전하게 keyof T로 변환
✔ 객체의 모든 키를 안전하게 가져올 수 있음


## 4. 맵드 타입

- 객체 타입의 속성을 동적으로 변환하여 새로운 타입을 생성하는 기능

✔ keyof를 활용해 기존 타입의 속성을 변형 가능
✔ 속성을 선택적으로 만들거나(Partial), 읽기 전용(Readonly)으로 변경 가능
✔ 타입 유연성을 높이고 중복을 줄이는 데 유용

### 1) 기본적인 맵드 타입 예제

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

```
✅ User 인터페이스에서 속성을 변형하여 새로운 타입을 생성

🔹 선택적 속성 타입 (Partial<T>)

```ts
type PartialUser = {
  [key in "id" | "name" | "age"]?: User[key];
};

```
✅ 모든 속성을 **선택적(?)**으로 변경

```ts
// PartialUser 타입을 활용하여 부분 업데이트 가능
function updateUser(user: PartialUser) {
  // ... 수정 기능
}

updateUser({ age: 25 }); // ✅ 일부 속성만 전달 가능

```
✔ updateUser() 함수에서 id, name 없이 age만 변경 가능


🔹 모든 속성을 boolean으로 변환

```ts
type BooleanUser = {
  [key in keyof User]: boolean;
};
```
✅ 기존 User 타입의 모든 속성을 boolean 타입으로 변환


```ts
const isUserActive: BooleanUser = {
  id: true,
  name: false,
  age: true,
};
```
✔ 속성의 타입을 변경하는 데 유용

🔹 읽기 전용 속성 (Readonly<T>)

```ts
type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};
```
✅ 모든 속성을 **읽기 전용(readonly)**으로 변환

```ts
function fetchUser(): ReadonlyUser {
  return {
    id: 1,
    name: "이정환",
    age: 27,
  };
}

const user = fetchUser();
// user.id = 2; // ❌ Error: Readonly 속성이므로 수정 불가능

```
✔ 불변(Immutable) 객체를 만들 때 사용

## 5. 템플릿 리터럴 타입
- 문자열을 조합하여 새로운 타입을 동적으로 생성할 수 있는 기능

✔ 타입의 조합을 유연하게 생성 가능
✔ 반복되는 문자열 패턴을 줄이고, 타입을 더 정교하게 설정할 수 있음

### 1) 템플릿 리터럴 타입 (Template Literal Type)

```ts
// 문자열을 조합하여 새로운 타입을 동적으로 생성하는 기능
type Color = "red" | "black" | "green";
type Animal = "dog" | "cat" | "chicken";

// Color와 Animal을 조합한 새로운 타입 생성
type ColoredAnimal = `${Color}-${Animal}`;

// ✅ ColoredAnimal 타입은 "red-dog" | "red-cat" | "red-chicken" | "black-dog" | ... 과 같이 조합된 문자열 타입을 자동으로 생성

const myPet: ColoredAnimal = "red-dog"; // ✅ 정상
// const wrongPet: ColoredAnimal = "blue-dog"; // ❌ 오류 (Color에 "blue" 없음)

```
✔ 템플릿 리터럴 타입을 사용하면 문자열 타입을 동적으로 조합 가능

### 2) 조건부 타입 (Conditional Type)

```ts
// 조건부 타입: 타입을 조건에 따라 다르게 설정하는 기능
type IsString<T> = T extends string ? "문자열" : "문자열 아님";

type Test1 = IsString<string>;  // "문자열"
type Test2 = IsString<number>;  // "문자열 아님"

// ✅ T extends string ? → T가 string이면 "문자열", 아니면 "문자열 아님"을 반환
```
✔ 제네릭과 함께 사용하면 더욱 강력함
✔ 유연한 타입 변환이 가능하여 활용도가 높음

### 3) 맵드 타입과 조건부 타입 활용

```ts
// 기본 User 타입 정의
type User = {
  id: number;
  name: string;
  age: number;
};

// ✅ User 타입을 변형하는 여러 맵드 타입

// 선택적 속성 타입 (Partial<T>)
type PartialUser = {
  [key in keyof User]?: User[key];
};

// ✅ 모든 속성을 선택적(?)으로 변경

// 읽기 전용 속성 (Readonly<T>)
type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};

// ✅ 모든 속성을 읽기 전용(readonly)으로 변환

// boolean 값으로 변환
type BoolUser = {
  [key in keyof User]: boolean;
};

// ✅ User의 속성을 모두 boolean으로 변환


```