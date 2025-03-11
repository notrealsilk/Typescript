/**
 * 함수 타입 호환성
 * 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는
 * 1. 반환값의 타입이 호환되는가
 * 2. 매개변수의 타입이 호환되는가
 * -> 두 기준이 모두 만족 -> 함수 타입 호환성 만족
 */

// 기준1. 반환값이 호환되는가
// 반환값 기준으로 업캐스팅이면 호환 ㅇ
// 반환값 기준으로 다운캐스팅이면 호환 ㄴ
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b;
// b = a; // Error -> 다운캐스팅이므로 호환 x

// 기준2. 매개변수가 호환되는가
// 2-1. 매개변수의 개수가 같을 때
// 매개변수일 때,  업캐스팅이면 호환 x
// 다운캐스팅일 때, 이면 호환 ㅇ

type C = (value: number) => void; // number
type D = (value: 10) => void; // number 리터럴

let c: C = (value) => {}; 
let d: D = (value) => {};

// c = d;
d = c;

type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

// animalFunc = dogFunc;
dogFunc = animalFunc;

let testFunc = (animal: Animal) => {
  console.log(animal.name);
  //   console.log(animal.color);
};

let testFunc2 = (dog: Dog) => {
  console.log(dog.name);
};

// 2-2. 매개변수의 개수가 다를 때

type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2;
// func2 = func1;
