# 인터페이스

## 1. 인터페이스

- 객체의 구조를 정의

### 1) 인터페이스 기본 구조

```ts
// ✔ readonly: 읽기 전용 속성 → 값을 변경할 수 없음
// ✔ age?: number: 선택적 속성 → 없어도 됨
// ✔ 메서드 (sayHi): 인터페이스 내부에서 함수의 타입을 정의

 interface Person {
  readonly name: string; // 읽기 전용 속성
  age?: number; // 선택적 속성
  sayHi(): void; // 함수 선언
  sayHi(a: number, b: number): void; // 오버로드 시그니처
}
```

### 2) 인터페이스를 사용하여 객체 생성

```ts
// ✔ readonly 속성인 name은 변경 불가능
// ✔ sayHi() 메서드는 매개변수 없이 호출 가능하며, 오버로딩된 형태(sayHi(1,2))도 가능

const person: Person = {
  name: "이정환",
  sayHi: function () {
    console.log("Hi");
  },
};

person.sayHi(); // "Hi"
person.sayHi(1, 2); // 오버로딩된 함수 호출

```

## 2. 인터페이스 확장

- 인터페이스 확장(상속, extends)을 사용하면 기존 인터페이스를 기반으로 새로운 인터페이스를 정의

- 다중 상속(다중 확장)이 가능

### 1) 기본적인 인터페이스 확장

🔹 기본 타입
```ts
// ✔ Animal 타입은 공통 속성(name, color)을 정의

type Animal = {
  name: string;
  color: string;
};
```

🔹 단일 인터페이스 확장
```ts
// ✔ Dog는 Animal을 상속받아 isBark 속성을 추가
// ✔ dog 객체는 Animal의 속성과 Dog의 속성을 모두 포함해야 함

interface Dog extends Animal {
  isBark: boolean;
}

const dog: Dog = {
  name: "바둑이",
  color: "갈색",
  isBark: true,
};
```

🔹 다중 확장 (Multiple Inheritance)
```ts
// ✔ Cat, Chicken은 Animal을 상속받아 각각 isScratch, isFly 속성을 추가

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}

// ✔ DogCat은 Dog와 Cat을 모두 확장하여 두 인터페이스의 모든 속성을 가짐
// ✔ dogCat 객체는 Dog의 isBark와 Cat의 isScratch 속성을 모두 포함해야 함

interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "개냥이",
  color: "검은색",
  isBark: true,
  isScratch: true,
};
```

## 3. 인터페이스 선언 합치기(Declaration Merging)

- 동일한 이름의 인터페이스를 여러 번 선언해도 오류가 발생하지 않고, 모든 선언이 자동으로 합쳐지는 기능

  - ✔ 인터페이스 확장이 필요 없을 때 유용

  - ✔ 타입을 점진적으로 확장할 때 사용

  -  ✔ 모듈 보강(Augmentation) 시 활용 가능

### 1) 기본적인 선언 합침

🔹 인터페이스 중복 선언
```ts
interface Person {
  name: string;
}

interface Person {
  name: string; // 동일한 속성은 중복되어도 오류 없음 (단, 타입이 동일해야 함)
  age: number;  // 새로운 속성 추가
}

const person: Person = {
  name: "홍길동",
  age: 27,
};

```

### 2) 선언 합침과 인터페이스 확장의 차이

- ✔ **인터페이스 확장(extends)**을 사용하면 명시적으로 상속 관계를 설정해야 함

- ✔ 선언 합침은 동일한 이름의 인터페이스가 자동으로 병합됨

```ts
interface Developer extends Person {
  name: "hello"; // name 속성의 값을 특정 리터럴 값으로 제한
}

```

### 3) 모듈 보강 (Module Augmentation)

- 기존 라이브러리나 인터페이스를 확장할 때 모듈 보강

```ts
// ✔ Lib 인터페이스가 두 번 선언되었지만, c 속성이 추가되어 자동으로 합쳐짐

// ✔ 기존 라이브러리를 확장할 때 유용하게 활용 가능

interface Lib {
  a: number;
  b: number;
}

interface Lib {
  c: string; // 기존 Lib 인터페이스에 새로운 속성 추가
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: "hello",
};
```