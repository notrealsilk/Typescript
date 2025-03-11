/**
 * 인터페이스 (상호간에 규칙)
 * 타입의 별칭 지어주기
 * 객체 구조를 정의하는데 특화
 */

// 인터페이스 이름을 헝가리안 표기법(IPerson)으로 쓰기도 함
interface Person {
  readonly name: string;
  age?: number; // 선택적 프로퍼티
  sayHi(): void;
  sayHi(a: number, b: number): void; // 오버로드 시그니쳐(호출 시그니쳐로 사용하기)
}

const person: Person = {
  name: "이정환",
  sayHi: function () {
    console.log("Hi");
  },
};

person.sayHi();
person.sayHi(1, 2);
