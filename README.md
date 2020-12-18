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

## Front-End 프레임워크 고민할 점

### 서버 Session을 사용할 수 없다.

- 로그인 기능 구현 시, 로그인된 사용자 정보를 서버 Session에 저장할 수 없어 JWT (JSON Web Token)을 사용하는 등 매요청마다 Front-End에서 로그인된 사용자임을 인증할 수단이 필요하다.

### CSR vs SSR 결정. 사이트가 가진 정보를 검색엔진에 노출시키기 어렵다.

- client side rendering(CSR): SPI로 구성되어 있어서 html로 들어가도 자료, 정보에 대한 내용 없이 div 태그 하나.. 덩그러니 있어서 의미있는 정보나 자료를 구할 수 없음. 이 부분이 문제점이라고 할 수 있음. 사이트가 검색 노출이 덜 됨. 키워드를 올려도. 구글봇이 내용인식을 못하므로. =======> 백엔드와 프론트엔드가 완전히 분리될 수 밖에 없는 이유.

- server side rendering(SSR): html에 모든 데이터를 심어서 데이터가 수정을 html로 자동으로 해서 브라우저로 띄우는 방식 => html에서 자료를 구할 수 있음 => 노출에 더 유리

- 일반적으로 Front-End 프레임워크는 CSR에 해당하며 프레임워크가 직접 지원하거나 외부 라이브러리를 사용하여 SSR로 만들 수 있다.

> https://velog.io/@aaronddy/React-session-
