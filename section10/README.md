# 유틸리티 타입

## 1. 유틸리티 타입 소개

### 1) Partial<T> (부분적인 속성)

```ts
// 특정 객체 타입의 모든 프로퍼티를 선택적(?) 프로퍼티로 변경하는 타입
type Partial<T> = {
  [key in keyof T]?: T[key];
};

interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

// Partial<Post>를 사용하여 일부 속성만 포함 가능
const draft: Partial<Post> = {
  title: "제목 나중에 짓자",
  content: "초안...",
};
```
✔ Partial<T>를 사용하면 객체의 모든 속성이 선택적(?)이 됨
✔ 초기 값이 없는 상태의 객체를 다룰 때 유용

### 2) Required<T> (모든 속성을 필수로 변경)

```ts
// 특정 객체 타입의 모든 프로퍼티를 필수(-?)로 변경하는 타입
type Required<T> = {
  [key in keyof T]-?: T[key];
};

// 모든 속성이 필수(`thumbnailURL`도 필수)
const withThumbnailPost: Required<Post> = {
  title: "한입 타스 후기",
  tags: ["ts"],
  content: "",
  thumbnailURL: "https://...",
};

```
✔ Required<T>를 사용하면 모든 선택적 속성이 필수가 됨
✔ 모든 필수 데이터를 받아야 하는 API 응답 처리 등에 유용

### 3)Readonly<T> (읽기 전용 속성)

```ts
// 특정 객체 타입의 모든 프로퍼티를 읽기 전용(readonly)으로 변경하는 타입
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};

const readonlyPost: Readonly<Post> = {
  title: "보호된 게시글 입니다.",
  tags: [],
  content: "",
};

// readonlyPost.content = ""; // ❌ 오류 (읽기 전용 속성)

```
✔ Readonly<T>를 사용하면 객체의 모든 속성이 수정 불가능(readonly) 상태가 됨
✔ 불변성(Immutable) 객체를 다룰 때 유용


## 2. 맵드 타입 기반의 유틸리티 타입1

### 1) Pick<T, K> (특정 속성만 선택)

```ts
// 객체 타입에서 특정 프로퍼티만 골라내는 타입
type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};

interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

// title과 content만 선택
const legacyPost: Pick<Post, "title" | "content"> = {
  title: "옛날 글",
  content: "옛날 컨텐츠",
};

```

✔ Pick<T, K>를 사용하면 필요한 속성만 선택적으로 사용할 수 있음
✔ API 응답에서 일부 속성만 선택할 때 유용

### 2) Omit<T, K> (특정 속성 제외)

```ts
// 특정 프로퍼티를 제외하는 타입
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// title을 제외한 나머지 속성만 사용 가능
const noTitlePost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};

```
✔ Omit<T, K>를 사용하면 특정 속성을 제외하고 나머지 속성만 유지 가능
✔ 보안 이슈로 특정 데이터를 제외하고 응답할 때 유용

### 3) Record<K, V> (객체 타입 매핑)

```ts
// 특정 키와 값을 사용해 객체 타입을 생성하는 타입
type Record<K extends keyof any, V> = {
  [key in K]: V;
};

// "large", "medium", "small", "watch" 키에 { url, size } 값이 들어가는 타입
type Thumbnail = Record<
  "large" | "medium" | "small" | "watch",
  { url: string; size: number }
>;

```
✔ Record<K, V>를 사용하면 객체의 키와 값 타입을 동적으로 설정 가능
✔ 기존 객체의 구조를 유지하면서 값을 변환할 때 유용

## 3. 맵드 타입 기반의 유틸리티 타입 2

### 1) Exclude<T, U> (제외)

```ts
// T에서 U에 해당하는 타입을 제거하는 타입
type Exclude<T, U> = T extends U ? never : T;

// "boolean"을 제외하고 "string"만 남김
type A = Exclude<string | boolean, boolean>;
// 1단계: Exclude<string, boolean> | Exclude<boolean, boolean>
// 2단계: string | never
// 최종 결과: string

```
✔ Exclude<T, U>를 사용하면 유니온 타입에서 특정 타입을 제외 가능
✔ 예: 특정 데이터 타입을 필터링할 때 유용

### 2) Extract<T, U> (추출)

```ts
// T에서 U에 해당하는 타입만 추출하는 타입
type Extract<T, U> = T extends U ? T : never;

// "boolean"만 추출
type B = Extract<string | boolean, boolean>;
// 1단계: Extract<string, boolean> | Extract<boolean, boolean>
// 2단계: never | boolean
// 최종 결과: boolean

```
✔ Extract<T, U>를 사용하면 유니온 타입에서 특정 타입만 골라낼 수 있음
✔ 예: 특정 속성만 추출할 때 유용

### 3) ReturnType<T> (함수 반환 타입 추출)

```ts
// 함수의 반환값 타입을 추출하는 타입
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

function funcA() {
  return "hello";
}

function funcB() {
  return 10;
}

// 함수의 반환 타입을 자동으로 추출
type ReturnA = ReturnType<typeof funcA>; // "hello" → string
type ReturnB = ReturnType<typeof funcB>; // 10 → number

```
✔ ReturnType<T>를 사용하면 함수의 반환값 타입을 추출할 수 있음
✔ 예: API 응답 타입을 자동으로 추출할 때 유용



## 4. 조건부 타입 기반의 유틸리티 타입

### 1)

```ts

```

### 2)

```ts

```