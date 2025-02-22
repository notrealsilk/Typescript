# 타입스크립트 개론

## 타입 스크립트 등장 배경

: js에 타입을 명시 한 것

: node.js의 등장으로 단순히 웹 브라우저에서만 실행가능했던 js가 모바일 앱, 데스크탑 앱 등 다양한 환경에서 사용 가능해짐 -> 엄격한 규칙 필요 

## js단점과 ts 특징

### 타입 시스템
  - 정적 타입 시스템 (java)

  : 코드 실행 전 타입 지정

  : 타이핑 양 증가, 유연 x

  - 동적 타입 시스템 (파이썬, js)

  : 코드 실행 후 타입 결정

  : 오류 발견 어렵

### ts

  : 동적 + 정적 타입 시스템 적용

  : 코드 실행 전 타입 검사 + 타입이 정해지지 x은 변수는 알아서 자동으로 타입 추론

## ts 동작 원리

![alt text](<img/스크린샷 2025-02-22 오후 11.39.43.png>)

: ts코드 -> 파싱트리 후에 타입 검사를 함 -> 통과하면 js코드가 됨

## ts 시작하기

### Node.js 패키지 초기화

``` bash
npm init
```

### @types/node 설치하기


``` bash
npm i @types/node
```

### 타입스크립트 컴파일러 설치하기

- windows

``` bash
npm i -g tsx
```

- mac

(-g : global 환경에 적용)

``` bash
sudo npm i -g tsx
```

### 타입스크립트 파일을 실행

``` bash
tsx src/index.ts
```


### 한번에 타입스크립트코드를 컴파일부터 실행시키는 도구

#### ts-node

: ts + node.js 가 동시에 있는 것!

- Windows

``` bash
npm i -g ts-node
```

- mac

``` bash
sudo npm i -g ts-node
```

## 타입스크립트 컴파일러 옵션 설정하기

- 컴파일러 옵션 즉, 개발 환경에 따라 얼마나 규칙을 엄격하게 할 지 커스텀 가능

### 컴파일러 옵션(tsconfig.json) 자동 생성하기

``` bash
tsc --init
```

#### include 옵션

- src 폴더 아래의 모든 타입스크립트 파일이 동시에 컴파일

``` tsconfig.json
{
  "include": ["src"]
}
```

### target 옵션

- 자바스크립트 코드의 버전을 설정

- compilerOptions 안에 설정

- ESNext(최신 자바스크립트 버전)으로 설정

```
{
  "compilerOptions": {
    "target": "ESNext" 
  },
  "include": ["src"]
}
```

### module 옵션

- js 코드의 모듈 시스템을 설정

```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext"
  },
  "include": ["src"]
}
```

### outDir

- 컴파일 결과인 js코드가 dist 폴더에 생성

```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### strict

- 타입 검사 엄격함 수준 결정

- true 설정 : 코드를 아주 엄격하게 검사

- fasle 설정도 o

```
{
  "compilerOptions": {
    ...
    "strict": true
  },
  "include": ["src"]
}
```


### ModuleDetection 옵션

- force : 모든 타입스크립트 파일이 로컬 모듈(독립 모듈)로 취급

- 타입스크립트의 모든 파일은 기본적으로 전역 파일(모듈)로 취급 -> so, 파일에 `export` (파일 개별 모듈화)를 사용하거나 `"moduleDetection": "force"` 사용

```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
		"moduleDetection": "force"
  },
  "include": ["src"]
}
```
