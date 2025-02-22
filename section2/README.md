# TS 기본

![image](img/스크린샷%202025-02-23%20오전%2012.33.32.png)

: ts의 내장 타입 (기본적으로 제공)

## TS 환경 세팅

#### Node.js 패키지를 초기화

```
npm init
```


#### @types/node 패키지를 설치

- Node.js의 내장 기능(함수 및 클래스)에 대한 타입 선언을 제공

```
npm i @types/node
```

#### 프로젝트 폴더/tsconfig.json 파일 생성

```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true,
    "moduleDetection": "force"
  },
  "include": ["src"]
}
```

- target : 컴파일 결과 생성되는 자바스크립트 코드의 버전 결정, 
ESNext는 최신 자바스크립트를 의미함

- module : 컴파일 결과 생성되는 자바스크립트 코드의 모듈 시스템 결정

- outDir : 컴파일 결과 생성되는 자바스크립트 파일들의 위치 결정

- strict : 엄격한 타입 검사 여부 설정

- moduleDetection : 모든 타입스크립트 파일(.ts)에 export 키워드를 자동으로 추가하여 격리된 모듈로 취급되도록 만드는 옵션

- include : tsc로 컴파일 할 타입스크립트 파일의 범위 설정

#### Node.js가 ES 모듈 시스템을 사용하도록 설정

- tsconfig.json의 module 옵션을 ‘ESNext’로 설정했기 때문에 자동으로 타입스크립트 코드가 ES 모듈 시스템을 사용하는 자바스크립트 코드로 컴파일 되기 때문

```
{
	...
	"type": "module",
	...
}
```

### ts-node를 이용해 타입스크립트 파일을 즉시 실행

- ts-node 옵션을 추가

```
{
  "compilerOptions": {
    ...
  },
	"ts-node": {
		"esm": true
	},
  "include": ["src"]
}
```

## 원시타입과 리터럴타입

- 원시 타입 : 1가지 값만 저장

#### type annotation

: 콜론과 함께 변수 타입 정의

: number / string / boolean / null /undefind 등

```js
let num1: number = 123;
```


### 임시로 null값을 넣고 싶다면? `"strcitNullChecks":false`

- `"strcitNullChecks":false` -> null 엄격한 검사 x

- `"strcit": ~~` 옵션의 하위 옵션!

```
{
  "compilerOptions": {
    ...
    "strictNullChecks": false,
		...
  },
  "ts-node": {
    "esm": true
  },
  "include": ["src"]
}
```

### 리터럴 타입

- 값 그 자체가 타입이 됨

```js
// numA에는 10 이외의 값을 저장할 수 없음
let numA: 10 = 10;
```

## 배열과 튜플

### 배열

#### 기본
```js
let numArr: number[] = [1, 2, 3]
let strArr: string[] = ["hello", "im", "winterlood"];
// <> .. 제네릭 문법
let boolArr: Array<boolean> = [true, false, true];

```

#### 배열에 들어가는 요소의 타입이 다양하면??

```js
let multiArr: (number | string)[] = [1, "hello"];
```

#### 다차원 배열

```js
let doubleArr : number[][] = [
  [1, 2, 3], 
  [4, 5],
];
```

### 튜플

- 길이와 타입이 고정된 배열

```js
// 타입 3개 이므로 값도 3개만 저장 가능
let tup2: [number, string, boolean] = [1, "hello", true];
```

- 튜플 실 사용 예시

``` js
const users: [string, number][] = [
  ["이정환", 1],
  ["이아무개", 2],
  ["김아무개", 3],
  ["박아무개", 4],
  [5, "조아무개"], // 오류 발생
];
```

## 객체

### 객체 타입 정의 (2)

#### object로 정의하기

```js
let user: object = {
  id: 1,
  name: "이정환",
};
```

#### 객체 리터럴 타입

- 구조적 타입 시스템 (프로퍼티를 기준으로 타입 정의)

```js
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user.id;

```

### 특수한 프로퍼티 정의

#### 선택적 프로퍼티(Optional Property)

- ? -> 프로퍼티가 없어도 됨, 있다면 설정한 타입이어야 함

```js
let user: {
  id?: number;
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user = {
  id: "id", // 오류 발생!
  name: "홍길동",
};
```

#### 읽기전용 프로퍼티(Readonly Property)

- 값이 수정되면 안되는 값에 설정 (ex.. api 키)

```js
let user: {
  id?: number;
  readonly name: string; // name은 이제 Readonly 프로퍼티가 되었음
} = {
  id: 1,
  name: "이정환",
};

user.name = "dskfd"; // 오류 발생
```

## 타입 별칭과 인덱스 시그니처

### 타입 별칭

- 중복된 타입을 타입 별칭을 사용해서 코드 수 줄임!

``` js
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user: User = {
  id: 1,
  name: "이정환",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

let user2: User = {
  id: 2,
  name: "홍길동",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

```

### 인덱스 시그니쳐

- 프로퍼티가 없어도 오류 안남

```js
// [key : 키 타입] : value 타입
type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
  // (... 약 100개의 국가)
  Brazil : 'bz'
};
```

- 주의! 인덱스 시그니쳐의 value 타입과 직접 추가한 프로퍼티의 value 타입이 호환되거나 일치해야함

```js
type CountryNumberCodes = {
  [key: string]: number;
  Korea: string; // 오류!
};
```


