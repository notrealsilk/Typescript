/**
 * 인터페이스의 확장(상속)
 * 객체 타입이면 가능
 */

type Animal = {
  name: string;
  color: string;
};

// Animal 인터페이스를 확장한 Dog 인터페이스(isBark 속성 추가)
// 원본 타입의 서브타입이면 상속이 가능
interface Dog extends Animal {
  isBark: boolean;
}

const dog: Dog = {
  name: "",
  color: "",
  isBark: true,
};

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}

// 다중확장
// Dog, Cat 인터페이스를 상속한 DogCat 인터페이스
// Dog, Cat 인터페이스의 속성을 모두 가지고 있어야 함
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  isBark: true,
  isScratch: true,
};
