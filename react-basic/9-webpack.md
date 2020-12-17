# 웹팩 리뉴얼 강좌 소개

- 웹팩 최신 버전인 v4.41을 다루는 웹팩 리뉴얼 강좌입니다.

## 강의 대상

- 이전 강좌(웹팩 버전 3 기준)를 듣고 이미 실무에서 쓰시고 계신 분들에게는 적합하지 않은 강좌입니다.
- 웹팩을 처음 쓰시는 분 혹은 이전 웹팩 강의를 들으면서 잘 이해가 가시지 않은 분들께 적합한 강좌입니다.

## 강의에서 다루는 내용

- 프런트엔드 빌드 시스템
  - NPM, Webpack
- 자바스크립트 모듈화 (AMD, Common.js, ES6 Modules)
- 웹팩 개요 (등장 배경, 철학 등)
- 웹팩 주요 속성 4가지
- 배포 환경에서 알고 있어야 할 웹팩 특징과 설정 등

## [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/concepts/entry.html#entry)

### 1. `Module Bundler` : dependency로 포함되거나 개발자가 직접 생성한 javascript를 한 파일로 압축하여 클라이언트가 요청할 javascript 수를 줄여준다.

### 2. IIFE

### 3. Web Task Manager

- `grunt` `gulp` gulpjs.com

  html/css/js/asset 최적화 및 자동화

- 웹팩과 차이

  gulp는 파일 각각을 최적화하지만, 웹팩은 진입점 1개로 나머지를 자동으로 처리한다.

### 4. `Babel` : JavaScript 호환성 도구 (to ES2015)

- devtool: 'source-map' : 브라우저 개발자도구에서 js 파일의 빌드 전 소스를 참조할 수 있다.

### 5. 주요 속성

- `entry` : 빌드 진입점
- `output` : build 폴더경로. [name], [chunkhash] 등 활용가능
- `loader` : js 파일 이외의 웹 자원을 js 파일로 빌드 ex) style-loader, css-loader, …
- `plugin` : loader의 변환과정을 제어하여 추가적인 기능 수행 [Plugin Repo](https://webpack.js.org/plugins/)

### 6. `Webpack Dev Server` : 소스 수정사항 발생 시 자동 build 및 브라우저 새로고침

- 빌드 결과물이 메모리에 저장됨

```json
"script": {
  "dev": "webpack-dev-server"
}
```

### 7. `HtmlWebpackPlugin` : 템플릿으로 설정한 파일을 기반으로 빌드 결과물을 추가해줌