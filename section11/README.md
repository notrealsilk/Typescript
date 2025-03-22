# 리액트와 타입스크립트

## 1. 외부 라이브러리 사용하기

### JS 만들어진 라이브러리

- 타입스크립트는 기본적으로 라이브러리를 설치해도 바로 사용 불가 (라이브러리에서 타입 정보를 제공하지 않기 때문)

- `DT` 마크가 붙어 있는 라이브러리는 다른 것을 추가로 설치해줘야 TS로 사용가능 (총 2개 이상 설치해야함)

- 즉, `Definitelt Types` (=`@types/~~`) 설치해야 ㅇ

  - 예)) lodash (JS 배열, 객체를 쉽게 사용하게 해주는 라이브러리)

  - `@types/lodash`를 설치해줘야 ㅇ

### TS 만들어진 라이브러리

- `TS` 마크가 붙어있는 라이브러리는 명령어만 입력하면 바로 설치해서 사용 가능

  - 예)) Reaxt Router DOM (페이지 이동 관련)


## 2. 타입스크립트 템플릿 소개

### 1. 프로젝트 생성

- CRA (Create React App) 방식
    
    ```bash
    npx create-react-app . --template typescript
    ```
    
- **최근 권장 방식 - Vite 사용**
    
    ```bash
    npm create vite@latest
    ```
    
    - 프로젝트 이름 입력
    - 프레임워크 선택: `React`
    - Variant 선택: `TypeScript`

---

### 2. 타입 선언 패키지 설치 (CRA 방식일 경우 직접 설치 필요)

```bash
npm i @types/node @types/react @types/react-dom @types/jest
```

> Vite + React + TS 템플릿은 기본적으로 포함되어 있음
> 

---

### 3. tsconfig.json 설정

```json
{
  "compilerOptions": {
    // 변환할 JavaScript 버전 (ES5: 구형 브라우저 호환을 위해 사용 가능)
    "target": "ES5",

    // 사용할 모듈 시스템 (CommonJS: Node.js에서 사용되는 방식)
    "module": "CommonJS",

    // 엄격한 타입 검사 활성화 (타입 안정성을 높여줌)
    "strict": true,

    // JS 파일도 함께 컴파일할 수 있게 허용
    "allowJs": true,

    // ES6 모듈을 CommonJS처럼 import/export 할 수 있게 허용
    "esModuleInterop": true,

    // JSX를 React 방식으로 변환 (React 17+에서는 "react-jsx" 사용 권장)
    "jsx": "react-jsx"
  },

  // TypeScript가 포함할 파일들의 범위 지정 (src 폴더 내부만 검사)
  "include": ["src"]
}
```

---

### 4. 파일 확장자 변경

- 기존 `.jsx` → `.tsx`로 변경
- 개별 컴포넌트 파일들도 `.tsx`로 변경 필요
