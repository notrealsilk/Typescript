# 클래스

- JS 클래스 문서

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes

## 1. 자바스크립트의 클래스 소개

- 클래스 : 객체를 생성하기 위한 템플릿

- 생성자 `constructor` : 인스턴스를 초기화하는 함수

- 메서드 `extends` : 클래스 내부 함수

- 상속 : 기존 클래스를 확장하여 새로운 클래스 정의

- `super()` : 부모 클래스의 생성자 또는 메서드를 호출할 때 사용

### 1) 클래스 없이 객체를 직접 만든 경우

```ts
// 객체
let studentA = {
  name: "이정환",
  grade: "A+",
  age: 27,
  // 메서드
  study() {
    console.log("열심히 공부 함");
  },
  introduce() {
    console.log("안녕하세요!");
  },
};
```
✔ 반복적으로 사용할 객체 구조를 만들기에는 비효율적
✔ 동일한 형식의 여러 객체를 만들기 어렵고 코드 중복 발생

### 2) 클래스 사용 – 생성자와 메서드 정의

```ts
// 클래스 선언 -> 파스칼
class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    // this -> 클래스가 만들고 있는 객체
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("열심히 공부 함");
  }

  introduce() {
    console.log(`안녕하세요 ${this.name} 입니다!`);
  }
}

// 클래스 인스턴스 생성
// `new 클래스 이름` : 클랙스로 객체 생성 = 인스턴스 생성
const studentB = new Student("홍길동", "A+", 27);
studentB.study();       // 열심히 공부 함
studentB.introduce();   // 안녕하세요 홍길동 입니다!

```
✔ constructor를 통해 인스턴스 초기화
✔ 메서드를 클래스 내부에 정의하면 모든 인스턴스가 공유

### 3) 클래스 상속 – extends

```ts
class StudentDeveloper extends Student {
  favoriteSkill;

  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age); // 부모 클래스 생성자 호출
    this.favoriteSkill = favoriteSkill;
  }

  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}

const studentDeveloper = new StudentDeveloper("이정환", "B+", 27, "TypeScript");
studentDeveloper.introduce();      // 안녕하세요 이정환 입니다!
studentDeveloper.programming();    // TypeScript로 프로그래밍 함

```
✔ StudentDeveloper는 Student 클래스를 상속
✔ super()를 통해 부모 생성자 호출
✔ 추가 필드와 메서드로 기능 확장 가능

## 2. 타입스크립트 클래스

- 클래스 : 객체를 생성하기 위한 설계도. 필드, 생성자, 메서드 포함

- 필드 타입 명시 : TypeScript에서는 각 필드에 타입을 지정

- 생성자 `constructor` : 객체 생성 시 초기화할 값 정의

- 상속 `extends` : 다른 클래스를 기반으로 기능 확장 가능

- 클래스 타입 사용 : 클래스 자체를 타입처럼 활용 가능 `(const obj: ClassType = { ... })`


### 1) 클래스 없이 객체 직접 생성

```ts
const employee = {
  name: "이정환",
  age: 27,
  position: "developer",
  work() {
    console.log("일함");
  },
};
```
✔ 객체 구조가 고정되지 않아 재사용이 어렵고, 타입 체크가 제한적

### 2) 타입스크립트의 클래스 선언

```ts
class Employee {
  // 필드 타입 명시
  name: string;
  age: number;
  position: string;

  // 생성자
  // `생성자 안에서 타입의 값을 명시`하면 클래스 필드에서 값이 없다고 오류가 나던 것이 사라짐
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}

// 클래스 인스턴스 생성
const employeeB = new Employee("이정환", 27, "개발자");
console.log(employeeB); // Employee { name: '이정환', age: 27, position: '개발자' }
```
✔ 클래스의 각 속성에 타입을 명시함으로써 정적 타입 체크 가능
✔ 생성자 constructor를 통해 초기값 필수화

### 3) 클래스 상속 (extends)

```ts
class ExecutiveOfficer extends Employee {
  officeNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position); // 부모 클래스 생성자 호출
    this.officeNumber = officeNumber;
  }
}
```
✔ ExecutiveOfficer는 Employee를 상속받아 추가 필드와 기능을 확장
✔ super()를 통해 부모 클래스의 생성자 호출 필수

### 4) 클래스 타입을 직접 사용하는 경우

```ts
const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {
    console.log("일함");
  },
};
```
✔ 클래스 자체도 하나의 타입으로 활용 가능
✔ 구조만 맞춘다면 new 없이도 객체를 만들 수 있음
✔ 하지만 메서드 로직이나 캡슐화는 클래스 인스턴스에서만 보장됨


## 3. 접근 제어자

- TS 클래스에서는 `접근 제어자`를 사용해 클래스의 속성과 메서드의 외부 접근 가능 여부를 제어 가능

- 주의 - 생성자에 접근 제어자 쓸 때는, 필드에서는 정의 생략 해야 ㅇ
- public	: 기본값. 어디서든 접근 가능

- protected	: 클래스 내부 + 자식 클래스에서만 접근 가능 (외부 접근 x)

- private	: 클래스 내부에서만 접근 가능 (자식클래스 접근 x, 외부 접근 x)

### 1) 기본 예제

```ts
class Employee {
  constructor(
    private name: string,      // 외부 접근 불가
    protected age: number,     // 상속받은 클래스에서만 접근 가능
    public position: string    // 어디서든 접근 가능
  ) {}

  work() {
    console.log(`${this.name} 일함`);
  }
}

```


### 2) 상속 클래스에서의 접근

```ts
class ExecutiveOfficer extends Employee {
  officeNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  func() {
    this.age;       // ✅ protected → 접근 가능
    // this.name;    // ❌ private → 접근 불가
  }
}

```
✔ age는 protected → 자식 클래스 내부에서 사용 가능
✔ name은 private → 자식 클래스에서도 접근 불가

### 3) 외부에서의 접근 예시

```ts
const employee = new Employee("이정환", 27, "developer");

// employee.name = "홍길동"; // ❌ private → 접근 불가
// employee.age = 30;        // ❌ protected → 접근 불가
employee.position = "디자이너"; // ✅ public → 접근 가능

console.log(employee); // { position: '디자이너' }

```
✔ position은 public이므로 외부 수정 가능
✔ name, age는 접근 제한으로 인해 외부에서 접근 불가능


## 4. 인터페이스와 클래스

- **인터페이스를 구현(implements)**함으로써, 정해진 구조(계약서)를 따르도록 강제

- interface : 클래스가 따라야 할 규칙(속성과 메서드 명세) 정의, public으로 정의됨

- implements :	클래스가 인터페이스를 구현할 때 사용

- 클래스 내부 필드 : 	인터페이스에 명시된 필드는 반드시 구현, 추가 필드는 자유롭게 선언 가능

- 접근 제어자	: 인터페이스는 접근 제어자 사용 불가 → 클래스에서 public, private 등 설정

### 1) 인터페이스 정의

```ts
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

```

✔ CharacterInterface는 캐릭터 객체가 반드시 가져야 할 속성과 메서드를 명시
✔ 클래스가 이 인터페이스를 구현하면, 인터페이스의 구조를 따라야 함

### 2) 클래스에서 인터페이스 구현

```ts
// 캐릭터 클래스가 CharacterInterface(=설계도)를 구현한다
class Character implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
    private extra: string // 인터페이스에는 없어도 됨 (추가 가능)
  ) {}

  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
}
```

✔ Character 클래스는 CharacterInterface를 implements 하여 구조를 따름
✔ move() 메서드와 name, moveSpeed 속성은 반드시 구현해야 함
✔ 인터페이스에 **없는 필드(extra)**는 클래스 내부에서 자유롭게 추가 가능
