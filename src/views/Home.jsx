import React from 'react';
import Style from './Home.module.css';
import './Home.css';

function Home() {
  // prettier-ignore
  return (
    <div className="react-question sub-content1">
      <h5 className={Style.title}>React 관련 질문</h5>

      <h3 className={Style.h3}>Q1. real DOM 과 vitual DOM 개념 설명</h3>
      <ul>
        <li className={Style.li}>
          <b className={Style.b}>DOM</b>
          <p>Document Object Model로 HTML 문서를 프로그래밍적으로 접근가능하게 해주는 인터페이스</p>
          <p>
            HTML은 브라우저에 의해 해석되어 실제 문서를 나타내는 노드 개체들의 트리구조로 변환됩니다. (DOM Parser)
            <br />
            DOM의 목적은 javascript를 사용해서 이 문서에 대한 프로그래밍 인터페이스를 제공하는 것입니다.
          </p>
          <p>DOM node 에 접근하여 편집을 하면 DOM 이 업데이트 되는데 비용이 많이든다.</p>
          <p>
            새로운 node 를 추가하면 DOM 에 해당 node 를 추가하여 업데이트 해줘야하며, 만약 이러한 업데이트로 인해
            레이아웃에 대한 변화가 생기면 웹페이지 일부 또는 전체를 다시 랜더링 될 수 있다.(reflow, layout)
          </p>
        </li>
        <li className={Style.li}>
          <b className={Style.b}>virtual DOM</b>
          <p>real DOM 을 추상화한 DOM → real DOM 에 사본정도로 이해</p>
          <p>DOM 조작 및 업데이트에 대해 성능 최적화를 하고자 등장</p>
          <p>
            * document.createDocumentFragment() → 가상돔도 결국에는 real DOM 에 반영을 해줘야하기 때문에
            createDocumentFragment() 호출한다.
          </p>
          <p>결국에는 가상돔은 DOM 조작 및 업데이트를 자동화 해주는 수단으로 이해해도 된다.</p>
          <p>react 에서는 2개의 가상돔을 비교(diffing)하여, real DOM 에 변경사항을 그룹화 하여 수행한다.</p>
        </li>
      </ul>

      <h3 className={Style.h3}>Q2. react 란?</h3>
      <ul>
        <li className={Style.li}>페이스북에서 개발하고 관리하는 UI 를 만들기 위한 javascript 라이브러리다.</li>
      </ul>

      <h3 className={Style.h3}>Q3. react 특징은?</h3>
      <ul>
        <li className={Style.li}>단방향 데이터 흐름 : 데이터를 추적하기 쉽고, 디버깅을 쉽게 해줌</li>
        <li className={Style.li}>virtual DOM : 가상돔을 사용하여, DOM 변경 시 필요한 최소한만 갱신하게 하여 성능</li>
        <li className={Style.li}>UI Component 기반 : UI 를 컴포넌트로 쪼개어 재사용성 및 유지보수 이점을 취함</li>
      </ul>

      <h3 className={Style.h3}>Q4. JSX 란?</h3>
      <ul>
        <li className={Style.li}>JavaScript XML 의 약자다.</li>
        <li className={Style.li}>JSX 는 &#123;&apos; &apos;&#125;</li>
        <li className={Style.li}>React.createElement(component, props, ...children) 생성한다.</li>
        <li className={Style.li}>JSX 는 자바스크립트로 HTML 코드 작성을 쉽게 도와주는 문법(템플릿 언어는 아니다)</li>
      </ul>

      <h3 className={Style.h3}>Q5. HOC(High-Order-Component) 란?</h3>
      <ul>
        <li className={Style.li}>컴포넌트 로직을 재사용하기 위한 기술</li>
        <li className={Style.li}>컴포넌트를 받아, 컴포넌트를 반환함</li>
        <li className={Style.li}>HOC 접두사는 with 로 시작하는게 관행</li>
      </ul>
      <p className={Style.p}>
        <code className={Style.code}>
          <span className={Style.keyword}>const</span>
          &nbsp;
          <span className={Style.name}>hoc</span>
          &nbsp;=&nbsp;
          <span className={Style.value}>ReactComponent</span>
          &nbsp;=&gt;&nbsp;
          <span className={Style.value}>EnhancedReactComponent</span>
          ;
          <br />
          &nbsp;... or ...
          <br />
          <span className={Style.keyword}>const</span>
          &nbsp;
          <span className={Style.name}>hoc</span>
          &nbsp;= (
          <span className={Style.value}>ReactComponent</span>
          ) =&gt; &#123;&nbsp;
          <span className={Style.keyword}>return </span>
          <span className={Style.value}>ReactComponent</span>
          &nbsp;&#125;
        </code>
      </p>

      <h3 className={Style.h3}>Q6. FLUX 설명</h3>
      <ul>
        <li className={Style.li}>
          프론트엔드에서 적용된 MVC 패턴에 대한 문제로 나온 패턴
          <br />
          (양방향, 규모가 클수록 데이터가 어떻게 변경되는가를 추적하기 어렵고 많은 Model 전부를 제어하는것도 어려워짐, View 와 Model 의 관계가 복잡해짐)
        </li>
        <li className={Style.li}>
          <span>단방향 데이터 흐름 모델의 개념을 따르는 아키텍쳐</span>
          <img className={Style.img} src="/react_question/one_way_data_flow.png" alt="" />
          <img className={Style.img} src="/react_question/flux_flow.png" alt="" />
        </li>
        <li className={Style.li}>flux 에서는 UI 는 데이터를 전달받기만 하면 된다</li>
        <li className={Style.li}>
          UI 쪽에 데이터를 변경할때마다 직접 Store 와 동기화를 하는게 아닌,
          action 을 일으켜 store 에 변경사항을 업데이트해주고 그 변경사항을 UI 에 전달해준다.
          <br />
          → 가장 큰 장점은 한방향으로 흐르기 때문에 추적이 쉽고 예측가능하다는 점이다
        </li>
      </ul>

      <h3 className={Style.h3}>Q7. Redux 란?</h3>
      <ul>
        <li className={Style.li}>
          <span>Flux 아키텍처를 기반으로 단방향 데이터 흐름 상태관리 라이브러리</span>
          <img className={Style.img} src="/react_question/redux_arch.png" alt="" />
        </li>
        <li className={Style.li}>action : UI 에서 상태변경이 일어난 모든 사건 (dispatch)</li>
        <li className={Style.li}>reducer : 사건에 따른 상태값에 대한 변화를 일으킨다 (mutation)</li>
        <li className={Style.li}>store : 상태값들이 있는 저장소</li>
      </ul>

      <h3 className={Style.h3}>Q8. Redux 3가지 원칙</h3>
      <ul>
        <li className={Style.li}>
          <b className={Style.b}>single source of truth(하나의 진실)</b>
          <br />
          redux 는 애플리케이션 상태를 한곳에서 관리하기 위해 단 한개의 store 만을 사용(flux 는 여러개의 스토어 사용가능)
        </li>
        <li className={Style.li}>
          <b className={Style.b}>state is readOnly(상태는 읽기전용)</b>
          <br />
          View 에서 state 를 직접 접근하여 변경할 수 없다.
        </li>
        <li className={Style.li}>
          <b className={Style.b}>changes are made with Pure Functions(변화는 순수함수로 만들어져야한다)</b>
          <br />
          reducer 는 순수함수(pure function) 으로만 되야한다는 의미이다 → side-effect(부수효과) 가 없는 함수를 의미
        </li>
      </ul>

      <h3 className={Style.h3}>Q9. Redux-sage 란?</h3>
      <ul>
        <li className={Style.li}>
          애플리케이션에서 Redux 사용시 발생가능한 side-effect(사이드 이펙트 : 부작용) 을 쉽게 관리하고자 사용하는 라이브러리
        </li>
        <li className={Style.li}>여기서 말하는 부작용은 비동기 로직, Axios Call, request success/fail 처리 등이다.</li>
      </ul>

      <h3 className={Style.h3}>Q10. 함수형 프로그래밍(FP)이란?</h3>
      <b className={Style.b}>함수형 프로그래밍은</b>
      <ul>
        <li className={Style.li}>
          <b className={Style.b}>Function</b>
          &nbsp;: 함수를 이용해서
        </li>
        <li className={Style.li}>
          <b className={Style.b}>No Side Effect</b>
          &nbsp;: 사이드이펙트 없도록
        </li>
        <li className={Style.li}>
          <b className={Style.b}>Declarative Programming</b>
          <span>
            &nbsp;: 선언형 프로그래밍을 이용하는 것. 함수는 인풋과 아웃풋이 있고 (입력과 출력이 없을수도 있지만..),
            각각의 인풋과 아웃풋이 연결이 되어 하나의 커다란 아웃풋을 만들게 되며 연결되게 됨.
            순수 함수는 항상 동일한 인풋에 대해 동일한 아웃풋을 낸다. 그래서 상태를 가지지 않음.
            <br />
            → 항상 동일한 출력을 한다.
          </span>
          <p className={Style.p}>
            <code className={Style.code}>
              <span className={Style.comment}>&#47;&#47; 선언형 패턴</span>
              <br />
              <span className={Style.keyword}>const</span>
              &nbsp;
              <span className={Style.name}>shortNames</span>
              &nbsp;=&nbsp;
              <span className={Style.name}>names</span>
              .
              <span className={Style.value}>filter</span>
              (
              <span className={Style.name}>name</span>
              &nbsp;=&gt;&nbsp;
              <span className={Style.name}>name</span>
              .
              <span className={Style.value}>length</span>
              &nbsp;&lt;&nbsp;
              <span className={Style.value}>5</span>
              );
            </code>
          </p>
        </li>
        <li className={Style.li}>함수는 재사용 가능하도록 설계된 프로그램 코드의 집합</li>
        <li className={Style.li}>결국에는 순수함수들을 조합하여 애플리케이션을 만드는 방식</li>
        <li className={Style.li}>선언형 프로그래밍은 무엇(What)을 할 것인가를 표현</li>
      </ul>

      <h3 className={Style.h3}>Q11. 상태가 없는 컴포넌트와 상태가있는 컴포넌트에 대한 설명</h3>
      <b className={Style.b}>상태가 없는 컴포넌트(stateless component)</b>
      <ul>
        <li className={Style.li}>내부적으로 state 를 가지지 않는 컴포넌트</li>
        <li className={Style.li}>기계적으로 부작용이 없다는 것이 보증 + 컴포넌트가 알 수 없는 상태에 따라 동작이 바뀌지 않음</li>
      </ul>

      <b className={Style.b}>상태가 있는 컴포넌트(satateful component)</b>
      <ul>
        <li className={Style.li}>내부적으로 state 가지고 있는 컴포넌트</li>
        <li className={Style.li}>
          UI 와 관련된 state 를가짐(특정 UI에서 props 를 통해 toggle 하는게 아닌, 자신이 직업 toggle 관련 state를 관리)
        </li>
      </ul>

      <blockquote cite="https://blog.naver.com/z1004man/221878557383">
        <p className={Style.p}>
          ※ 출처 :
          <a href="https://blog.naver.com/z1004man/221878557383">
            선비같은 개발자 | react 기술면접 질문
          </a>
        </p>
      </blockquote>
    </div>
  );
}

export default Home;
