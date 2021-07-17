# easywebcompiler
CodePen같은 웹컴파일러 사이트 개발  

### Project    <a href="">사이트 바로가기(호스팅 안되어있음)</a>

### 구동 방법
```
git clone > npm install > npm start > 웹 접속
```


### 추후 목표
```
현재는 자바스크립트버전만 있지만 추후에는 자바 및 파이썬, C언어등 점차 늘려 나갈 예정
```

#### develop tool
<img alt="IDE" src="https://img.shields.io/badge/visual studio code -996600.svg" />

#### BackEnd Frame Work
<img src="https://img.shields.io/badge/Node-v10.16.3-green.svg" /> <img src="https://img.shields.io/badge/express-v4.17.1-red.svg" />

![Easy-Web-Compiler-Chrome-2021-07-17-19-45-39](https://user-images.githubusercontent.com/42566975/126034886-5019161a-1cb4-457a-aa14-db9ff2db4541.gif)


## 기능

### 웹 코드 컴파일 (WEB_CODE_COMPILE)
```
1) 코드를 에디터에 입력을 하면 output 화면에서 결과를 보여줌.
2) AutoRun 체크박스가 활성화 되어 있을때는 debounce 처리로 인해 keyup 이벤트 발생을 하여도
   1초동안 중복적으로 호출하지 않고 한번만 호출 하여 결과값을 가져온다.
3) output 결과 창에 로우가 많이 쌓여있을경우를 위해 새로고침 버튼을 누르면 로우들 삭제
4) 코드가 길어질 수 있으므로 쿠키보다는 localstorage를 활용해 작성한 코드를 지속적으로 저장하여 페이지를 닫고 다시 들어와도 코드가 전에 작성한 그대로 남겨져있다.
```
## Debounce 
Debounce 는 자주 사용 되는 이벤트나 함수 들의 실행되는 빈도를 줄여서, 성능 상의 유리함을 가져오기 위한 개념이다.

## cookie vs localstorage vs sessionstorage

### 1. Cookie

후속 요청으로 서버로 다시 보내야하는 데이터를 저장한다. 만료는 유형에 따라 다르며 만료 기간은 서버 측 또는 클라이언트 측 (일반적으로 서버 측)에서 설정할 수 있다.
쿠키는 주로 서버 측에서 읽기(클라이언트 측에서 읽을 수도 있음) 위한 것이며, Local Storage 및 Session Storage는 클라이언트 측에서만 읽을 수 있다.
크기는 4KB보다 작아야 한다.
해당 쿠키에 대해 httpOnly 플래그를 true로 설정하여 쿠키를 안전하게 만들 수 있다. 이렇게하면 쿠키에 대한 클라이언트 측 액세스가 차단된다.

### 2. Local Storage
만료일이 없는 데이터를 저장하고 JavaScript를 통해서만 지워진다.
저장 용량 한도는 3가지 중에서 가장 높다.


### 3. Session Storage

Session Storage 객체는 세션에 대해서만 데이터를 저장한다. 즉, 브라우저 또는 탭이 닫힐 때까지만 데이터가 저장된다.
데이터는 서버로 전송되지 않는다.
저장 용량 한도가 쿠키보다 크다(최소 5MB).
