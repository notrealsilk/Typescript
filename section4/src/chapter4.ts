/**
 * 사용자 정의 타입가드
 */

type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;

// 객체가 Dog인지 구분하는 함수
// animal is Dog는 타입 단언 ```(animal as Dog)```을 사용하여 타입을 강제로 Dog로 변환
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined; // 여기서 타입단언
}

// 객체가 Cat인지 구분하는 함수
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) {
    // 강아지
    animal;
  } else if ("isScratch" in animal) {
    // 고양이
  }
}
