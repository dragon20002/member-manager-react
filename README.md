# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Issues

### React Router

- 설치
  ```bash
  npm install react-router-dom
  ```

- 사용법

  - `BrowserRouter`, `Switch`, `Route`
    ```js
    // Components/SomeView.js
    import React from 'react';
    import { BrowserRouter, Switch, Route } from 'react-router-dom';
    import HeaderMenu from "../Screens/HeaderMenu";
    import Aladin from "../Screens/Aladin";
    import LionKing from "../Screens/LionKing";
    import SpiderMan from "../Screens/SpiderMan";

    export default () => (
      {/* 리액트라우터 관련 태그 컨테이너 */}
      <BrowserRouter>
        {/* <Link /> 나 <Link />를 포함한 뷰 */}
        <HeaderMenu />

        {/* 라우팅 경로(path)에 따라 화면(component)를 보여주는 컨테이너 */}
        <Switch>
          <Route path="/aladin" component={Aladin} />
          <Route path="/lionking" component={LionKing} />
          <Route path="/spiderman" component={SpiderMan} />
        </Switch>
      </BrowserRouter>
    )
    ```

  - `Link`

    상단 메뉴의 경우, `NavLink` 사용을 추천. (선택된 Link에 active 스타일을 적용됨)

    ```js
    // Components/HeaderMenu.js
    import React from 'react';
    import { Link } from "react-router-dom";

    function HeaderMenu() {
      return (
        <div>
          <ul>
            <li>
              {/* 누르면 <Switch/> 내부를 특정 뷰로 라우팅시켜준다. */}
              <Link to="/aladin">Aladin</Link>
            </li>
            <li>
              <Link to="/lionking">Lion King</Link>
            </li>
            <li>
              <Link to="/spiderman">Spider Man</Link>
            </li>
          </ul>
        </div>
      )
    }

    export default HeaderMenu;
    ```

> 참고 [ki_blank.log](https://velog.io/@ki_blank/React-Router-1.-8njzuummrs)

### ESLint

1. 설치

```
$ npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

# eslint 중 prop type 명시할 때 사용. TypeScript 사용시 안해도 됨.
$ npm i prop-types
```

- VSCode Extensions 추가

  - ESLint
  - Prettier - Code formatter

2. 설정

- {root}/.editorconfig (VSCode 설정)

    ```properties
    [*.{js,jsx,ts,tsx,jsx}]
    indent_style = space
    indent_size = 2
    end_of_line = crlf
    trim_trailing_whitespace = true
    insert_final_newline = true
    max_line_length = 100
    quote_type = single
    spaces_around_brackets = inside
    ```

- {root}/.eslintrc (ESLint 설정)

    ```json
    {
      "env": {
        "browser": true,
        "es6": true,
        "node": true
      },
      "parser": "babel-eslint",
      "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": true
      },
      "extends": ["airbnb"],
      "rules": {
        "linebreak-style": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "class-methods-use-this": 0,
        "jsx-a11y/no-static-element-interactions": 0
      }
    }
    ```

- VSCode 우측하단 ESLint, Prettier 활성화

### [Scoped CSS](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

0. 제약사항

- create-react-app으로 생성한 eject 명령을 실행하지 않은 프로젝트인 경우만 해당

- react-script@2.0.0 이상

1. 사용법

- Button.module.css (or scss, sass)

    ```css
    .error {
      background-color: red;
    }
    ```

- Button.css

    ```css
    .error {
      color: red;
    }
    ```

- Button.js

    ```js
    import React, { Component } from 'react';
    import styles from './Button.module.css'; // Import css modules stylesheet as styles
    import './another-stylesheet.css'; // Import regular stylesheet

    class Button extends Component {
      render() {
        // reference as a js object
        return <button className={styles.error}>Error Button</button>;
      }
    }
    ```

### Docker 사용법

0. 용어 설명

- ***컨테이너*** 어플리케이션을 실행할 수 있는 가상컴퓨팅 자원 또는 공간

- ***도커 이미지*** `컨테이너`를 생성하기 위한 실행 이미지 파일 (템플릿?)

- ***Dockerfile*** `도커 이미지`를 빌드하는 스크립트 (`Makefile` 같은 빌드 스크립트)

1. [Dockerfile](./Dockerfile) 작성

```Dockerfile
# Node 최신버전 이미지를 가져옴 (pull)
FROM node:latest
MAINTAINER dragon20002@naver.com

# 컨테이너로 소스 복사
# .dockerignore 파일을 생성하여 대상에서 제외시킬 수 있음 (build/, node_modules/ 등...)
COPY . /usr/src/member-manager

# 컨테이너의 현재경로 변경
WORKDIR /usr/src/member-manager

# 소스 빌드, 의존성 설치 등등의 작업수행
RUN npm install

# 컨테이너의 포트 열기
EXPOSE 8081

# 어플리케이션 실행
CMD npm run serve
```

2. `Build`

Dockerfile을 로드하여 Docker image를 빌드한다.

```bash
# Dockerfile이 있는 위치에서 아래 커맨드 실행
$ docker build -t member-manager

# (선택) 빌드된 이미지 목록 확인
$ docker images
```

- 자주 사용하는 옵션

| 옵션 | 설명 |
| - | - |
| --force-rm=false | 이미지 생성에 실패했을 때도 임시 컨테이너를 삭제합니다. |
| --no-cache=false | 이전 빌드에서 생성된 캐시를 사용하지 않습니다. Docker는 이미지 생성 시간을 줄이기 위해서 Dockerfile의 각 과정을 캐시하는데, 이 캐시를 사용하지 않고 처음부터 다시 이미지를 생성합니다. |
| -q, --quiet=false | Dockerfile의 RUN이 실행한 출력 결과를 표시하지 않습니다. |
| --rm=true |          이미지 생성에 성공했을 때 임시 컨테이너를 삭제합니다. |
| -t, --tag=""<br> | 저장소 이름, 이미지 이름, 태그를 설정합니다. <저장소 이름>/<이미지 이름>:<태그> 형식입니다. |

> Tag 예시 : 1) `hello`&nbsp;&nbsp;&nbsp;&nbsp;2) `hello:0.1`&nbsp;&nbsp;&nbsp;&nbsp;3) `exampleuser/hello`&nbsp;&nbsp;&nbsp;&nbsp;4) `exampleuser/hello:0.1`

3. `Run`

빌드한 Docker image로 Docker Container 실행

```bash
# `member-manager` 이미지 태그를 가진 이미지로 컨테이너를 생성 및 실행
$ docker run -d -p {prefer_port}:8081 member-manager

# (선택) 컨테이너 목록 및 상태 확인
$ docker ps -a
```

- 실행 결과

![docker-ps-result](readme_img/docker-ps-result.png)

- 자주 사용하는 옵션

| 옵션 | 설명 |
| - | - |
| -d | detached mode 흔히 말하는 백그라운드 모드 |
| -p | 호스트와 컨테이너의 포트를 연결 (포워딩) |
| -v | 호스트와 컨테이너의 디렉토리를 연결 (마운트) |
| -e | 컨테이너 내에서 사용할 환경변수 설정 |
| --name | 컨테이너 이름 설정 |
| --it | -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션 (컨테이너의 표준 입력과 로컬 컴퓨터의 키보드 입력을 연결) |
| --rm | 프로세스 종료시 컨테이너 자동 제거 |
| --link | 컨테이너 연결 [컨테이너 명:별칭] |

4. 관리 및 모니터링

```bash
# 모든 컨테이너 확인
$ docker ps -a

# 컨테이너 시작/정지/재시작
$ docker start/stop/restart {컨테이너 Id or Name}

# 컨테이너 접속
#   접속 종료 시 `Ctrl+p` `Ctrl+q` 순서대로 입력
#   컨테이너 종료 시 `exit` or `Ctrl+d`
$ docker attach {컨테이너 Id or Name}

# 컨테이너 제거
$ docker rm {컨테이너 Id or Name}
```

> 출처<br />
> [pyrasis.com | 가장 빨리 만나는 Docker 20장 - 2. build](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter20/02)<br />
> [velog@wlsdud2194 | Docker 도커 - #1 기본 명령어 모음](https://velog.io/@wlsdud2194/-Docker-%EB%8F%84%EC%BB%A4-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%AA%A8%EC%9D%8C)

## Front-End 프레임워크 고민할 점

### `서버 Session을 사용불가`

로그인 기능 구현 시, 로그인된 사용자 정보를 서버 Session에 저장할 수 없어 JWT (JSON Web Token)을 사용하는 등 매요청마다 Front-End에서 로그인된 사용자임을 인증할 수단이 필요하다.

### `CSR vs SSR 결정`

CSR의 경우, 사이트가 가진 정보를 검색엔진에 노출시키기 어렵다.

- client side rendering(CSR): SPI로 구성되어 있어서 html로 들어가도 자료, 정보에 대한 내용 없이 div 태그 하나.. 덩그러니 있어서 의미있는 정보나 자료를 구할 수 없음. 이 부분이 문제점이라고 할 수 있음. 사이트가 검색 노출이 덜 됨. 키워드를 올려도. 구글봇이 내용인식을 못하므로. =======> 백엔드와 프론트엔드가 완전히 분리될 수 밖에 없는 이유.

- server side rendering(SSR): html에 모든 데이터를 심어서 데이터가 수정을 html로 자동으로 해서 브라우저로 띄우는 방식 => html에서 자료를 구할 수 있음 => 노출에 더 유리

- 일반적으로 Front-End 프레임워크는 CSR에 해당하며 프레임워크가 직접 지원하거나 외부 라이브러리를 사용하여 SSR로 만들 수 있다.

> 출처<br />
> https://velog.io/@aaronddy/React-session-
