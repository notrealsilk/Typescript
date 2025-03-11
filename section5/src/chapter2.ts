/**
 * 선언 합침
 * 동일한 인터페이스 2개 정의해도 오류 x(= 중복선언 시,모든 선언이 합쳐짐)
 * 모듈 보강 시 사용
 */

interface Person {
  name: string;
}

interface Person {
  name: string; // 중복선언 (타입이 같아야함) 
  age: number;
}

interface Developer extends Person {
  name: "hello";
}

const person: Person = {
  name: "",
  age: 27,
};

/**
 * 모듈 보강
 */

interface Lib {
  a: number;
  b: number;
}

interface Lib {
  c: string;
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: "hello",
};
