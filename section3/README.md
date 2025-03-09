# 타입스크립트 이해하기

## 0. 타입스크립트 이해하기

- 어떤 기준으로 타입을 정의하는지?

- 어떤 기준으로 타입간의 관계를 정의 하는지?

- 어떤 기준으로 타입의 오류를 검사?

## 1. 타입은 집합이다

### 타입 = 집합

![alt text](<img/스크린샷 2025-02-23 오후 2.25.23.png>)

``` ts
// number Type (슈퍼 타압)
let num :number = 20;

// number literal Type (서브 타입)
let num :20 = 20;
```

### 타입 호환성

- 어떤 타입을 다른 타입을 취급해도 괜찮은가? 

![alt text](<img/스크린샷 2025-02-23 오후 2.29.29.png>)

#### 업 캐스팅

: 서브 타입의 값을 슈퍼 타입의 값으로 취급

: 대부분 가능

#### 다운캐스팅

![alt text](<img/스크린샷 2025-02-23 오후 2.31.02.png>)

: 대부분 불가능


## 2. 타입 계층도와 함께 기본타입 살펴보기

![alt text](타입계층도.png)

### unknown 타입 (전체 집합)

- 모든 값 넣기 가능

```ts
// 업 캐스트 (가능)
let a: unknown = 1;                 // number -> unknown
let b: unknown = "hello";           // string -> unknown
let c: unknown = true;              // boolean -> unknown
let d: unknown = null;              // null -> unknown
let e: unknown = undefined;         // undefined -> unknown
let f: unknown = [];                // Array -> unknown
let g: unknown = {};                // Object -> unknown
let h: unknown = () => {};          // Function -> unknown

// 다운 캐스트 (불가능)
let unknownValue: unknown;

let a: number = unknownValue;
// 오류 : unknown 타입은 number 타입에 할당할 수 없습니다.

```

### never 타입 (공집합 타입)

- 모든 타입의 서브 집합 -> 즉, never 타입은 어떤 타입에든 담기기 가능 (업 캐스팅)

- 다운 캐스팅 불가! -> `어떤 값이든 저장이 되면 안되는 값에 사용`

```ts
let neverVar: never;

// 업 캐스팅
let a: number = neverVar;            // never -> number
let b: string = neverVar;            // never -> string
let c: boolean = neverVar;           // never -> boolean
let d: null = neverVar;              // never -> null
let e: undefined = neverVar;         // never -> undefined
let f: [] = neverVar;                // never -> Array
let g: {} = neverVar;                // never -> Object


// 다운 캐스팅 절대 불가 (즉, 어떤 값이든 절대 담기면 안되는 변수에 사용하기)
```

### void 타입

- 아무것도 반환하지 않는 함수의 반환값 타입으로 주로 사용

- void 타입은 undefined 타입의 슈퍼 타입임

```ts
let voidVar: void;

voidVar = undefined; // undefined -> void (ok)

let neverVar: never;
voidVar = neverVar; // never -> void (ok)
```

### any 타입 (치트키)

- 타입 계층도를 완전히 무시 (모든 타입의 슈퍼 타입이자 서브 타입이 됨.. 단 never타입에는 예외)

- 사용 지양

```ts
let anyValue: any;

let num: number = anyValue;   // any -> number (다운 캐스트)
let str: string = anyValue;   // any -> string (다운 캐스트)
let bool: boolean = anyValue; // any -> boolean (다운 캐스트)

anyValue = num;  // number -> any (업 캐스트)
anyValue = str;  // string -> any (업 캐스트)
anyValue = bool; // boolean -> any (업 캐스트)
```

## 3. 객체 타입의 호환성

### 기본

```ts
// 슈퍼 타입
type Book = {
  name: string;
  price: number;
};

// 서브 타입
//  ProgrammingBook < Book
type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programmingBook: ProgrammingBook = {
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs",
};

book = programmingBook; // ✅ OK -> 업 캐스팅 (슈퍼 = 서브)
programmingBook = book; // ❌ NO -> 다운 캐스팅 (서브 = 슈퍼)
```

### 초과 프로퍼티 검사

- 변수를 객체 리터럴로 초기화 할 때 발동하는 타입스크립트의 특수한 기능

-  타입에 정의된 프로퍼티 외의 다른 초과된 프로퍼티를 갖는 객체를 변수에 할당할 수 없도록 막음

```ts
// 초과 프로퍼티 검사
type Book = {
  name: string;
  price: number;
};

let book2: Book = { // 오류 발생
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  skill: "reactjs", // -> 여길 주석처리해야 오류 x
};
```

```ts
// 변수에 미리 값을 담아둔 다음 변수값을 인수로 전달
let book3: Book = programmingBook;

func(programmingBook);
```

## 4. 대수 타입

- 여러 개의 타입을 합성해서 새롭게 만들어낸 타입

### 합집합 타입

- 기본

```ts
// 합집합 타입 - Union 타입

// 기본
let a: string | number | boolean;

a = 1;
a = "hello";
a = true;

// 배열
let arr: (number | string | boolean)[] = [1, "hello", true];
```

- 객체 

![alt text](img/image.png)

```ts
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

/////////////////////////////

let union1: Union1 = { // ✅
  name: "",
  color: "",
};

let union2: Union1 = { // ✅
  name: "",
  language: "",
};

let union3: Union1 = { // ✅
  name: "",
  color: "",
  language: "",
};


let union4: Union1 = { // ❌ -> 어디에도 포함안됨
  name: "",
};
```

### 교집합 타입

- 기본

```ts
let variable: number & string; 
// never 타입으로 추론된다
```

- 객체

```ts
let intersection1: Intersection = {
  name: "",
  color: "",
  language: "", // 1개 라도 빠지면 에러 ㅇ
};
```

## 5. 타입 추론

- 타입스크립트는 `변수의 초기값`을 기준으로 자동으로 타입을 추론해줌

- 단, 함수의 매개변수는 타입 추론 x -> 정의해줘야 ㅇ

### 주의 사항 (2)

#### Any 타입의 진화

```ts
let d; // 암시적인 any 타입
d = 10; // number
d.toFixed(); // number

d = "hello"; // string
d.toUpperCase(); // string
d.toFixed(); // 오류 
```

#### const 상수의 추론

- const -> Literal 타입(가장 좁은 타입으로 추론)으로 추론

```ts
const num = 10;
// 10 Number Literal 타입으로 추론

const str = "hello";
// "hello" String Literal 타입으로 추론
```

### 최적 공통 타입

- 최적의 공통 타입으로 추론

``` ts
let arr = [1, "string"];
// (string | number)[] 타입으로 추론
```

## 6. 타입 단언

- 컴파일러에게 특정 값이 특정 타입임을 명시적으로 알려주는 문법

- `A as B`

  - A가 B의 슈퍼타입(Supertype)

  - A가 B의 서브타입(Subtype) 

### 기본

```ts
let num1 = 10 as never;   // 가능 (number가 never의 슈퍼타입)
let num2 = 10 as unknown; // 가능 (unknown이 모든 타입의 슈퍼타입)
```

### const 단언 (Const Assertion)

``` ts
let num4 = 10 as const; // num4의 타입이 '10' (리터럴 타입)이 됨

let cat = {
  name: "야옹이",
  color: "yellow",
} as const;

// cat.name = ''  // ❌ 오류 발생 (읽기 전용 속성이므로 변경 불가)

```

### Non-null 단언

- 변수가 null 또는 undefined가 아님을 컴파일러에게 확신시킬 때 사용

- ! (느낌표) 연산자

```ts
type Post = {
  title: string;
  author?: string; // author 속성은 선택적(optional)
};

let post: Post = {
  title: "게시글1",
};

const len: number = post.author!.length;

```


## 7. 타입 좁히기

- 조건문 등을 활용하여 넓은 타입을 더 구체적인 좁은 타입으로 한정

### typeof를 활용한 타입 좁히기

```ts
function func(value: number | string | Date | null | Person) {
  if (typeof value === "number") {
    console.log(value.toFixed()); // number 타입이므로 toFixed() 사용 가능
  } else if (typeof value === "string") {
    console.log(value.toUpperCase()); // string 타입이므로 toUpperCase() 사용 가능
  }
}

```

### instanceof를 활용한 타입 좁히기

- 객체가 특정 생성자의 인스턴스인지 확인

```ts
else if (value instanceof Date) {
  console.log(value.getTime()); // Date 객체이므로 getTime() 사용 가능
}

```

### in 연산자를 활용한 타입 좁히기

- 객체에 특정 속성이 존재하는지 확인

- ⚠️ null을 체크하지 않으면 in 연산자 사용 시 에러가 발생할 수 있으므로 value &&를 추가

```ts
else if (value && "age" in value) {
  console.log(`${value.name}은 ${value.age}살 입니다`);
}

// "age" in value를 통해 value가 Person 타입인지 확인

// value.name, value.age 속성을 안전하게 사용할 수 있음

```

## 8. 서로소 유니온 타입

- 교집합이 x는 타입들로만 만든 유니온 타입을 말함

- 타입좁히기 더 쉽게하기

- `tag` 사용 -> switch-case 타입 문법사용해서 타입 좁히기 가능

### 1) 사용자 역할 구분 (tag 사용)
```ts
type Admin = { tag: "ADMIN"; name: string; kickCount: number };
type Member = { tag: "MEMBER"; name: string; point: number };
type Guest = { tag: "GUEST"; name: string; visitCount: number };

type User = Admin | Member | Guest;

function login(user: User) {
  switch (user.tag) {
    case "ADMIN":
      console.log(`${user.name}님, ${user.kickCount}명 강퇴했습니다.`);
      break;
    case "MEMBER":
      console.log(`${user.name}님, ${user.point}포인트 보유 중`);
      break;
    case "GUEST":
      console.log(`${user.name}님, ${user.visitCount}번 방문`);
      break;
  }
}

```

2) 비동기 작업 상태 관리 (state 사용)

```ts
type LoadingTask = { state: "LOADING" };
type FailedTask = { state: "FAILED"; error: { message: string } };
type SuccessTask = { state: "SUCCESS"; response: { data: string } };

type AsyncTask = LoadingTask | FailedTask | SuccessTask;

function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING":
      console.log("로딩 중...");
      break;
    case "FAILED":
      console.log(`에러 발생: ${task.error.message}`);
      break;
    case "SUCCESS":
      console.log(`성공: ${task.response.data}`);
      break;
  }
}

```

3) 함수 타입 정의 시 객체 타입 또는 화살표 함수 형태로 선언

```ts
type Call = { (value: number): void };
type Call2 = (value: number) => void;
const call: Call2 = (value) => {};

```