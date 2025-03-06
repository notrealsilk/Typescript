/**
 * 타입 단언 (type assertion)
 * 타입 단언은 컴파일러에게 '이 타입이다' 라고 알려주는 것
 */

type Person = {
  name: string;
  age: number;
};

// as : 초기화 값의 타입을 간주함
let person = {} as Person;
person.name = "이정환";
person.age = 27;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도", // 타입 단언을 통해 Dog 타입으로 간주
} as Dog;

/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B
 * A가 B의 슈퍼타입이거나
 * A가 B의 서브타입이어야 함
 */

// (A)number, (B)never 타입 -> 모든 타입의 서브 타입
// A가 B의 슈퍼타입이므로 타입 단언 가능
let num1 = 10 as never;
let num2 = 10 as unknown;

let num3 = 10 as unknown as string; // 지양

/**
 * const 단언
 */

let num4 = 10 as const;

let cat = {
  name: "야옹이",
  color: "yellow",
} as const;

// cat.name = '' // 에러..const 단언으로 인해 변경 불가

/**
 * Non Null 단언
 */

type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글1",
};

const len: number = post.author!.length;
