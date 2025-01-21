
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { getEmotionImgById } from './util';
import Home   from './pages/Home';
import NEW    from './pages/New';
import Diary  from './pages/Diary';
import Editor   from './pages/Editor';
import Edit from './pages/Edit';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import Footer from './component/footer';

const mockData = [

  {
    id: "mock1",
    date: new Date(2025, 0, 1).getTime(), // 2025년 1월 1일
    content: "오늘은 오랜만에 맑은 날씨를 만끽하며 산책을 다녀왔다. 따뜻한 햇살과 신선한 공기에 마음까지 밝아진 기분이다. 작은 꽃들을 보며 웃음이 나왔고, 이런 평범한 순간들이 얼마나 소중한지 느꼈다.",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date(2025, 0, 2).getTime(), // 2025년 1월 2일
    content: "오랜만에 친구와의 약속이 있어 아침부터 설레었다. 함께 나눈 대화와 웃음이 하루를 가득 채워줬다. 돌아오는 길엔 마음이 한결 따뜻해졌고, 오늘의 행복이 오래 남길 바랐다.",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date(2025, 0, 3).getTime(), // 2025년 1월 3일
    content: "오늘은 특별한 일 없이 조용히 흘러갔다. 따뜻한 차 한 잔과 책 한 권으로 마음의 여유를 찾은 평화로운 하루였다. 이런 소소한 시간이야말로 진정한 행복이라는 걸 다시금 깨달았다.",
    emotionId: 3,
  },
  {
    id: "mock4",
    date: new Date(2025, 0, 4).getTime(), // 2025년 1월 4일
    content: "아침부터 일이 꼬여 하루가 답답하게 흘러갔다. 예상치 못한 실수와 불편한 대화가 이어져 기분이 나빴다. 하지만 오늘을 교훈 삼아 내일은 더 나아질 거라 믿어본다.",
    emotionId: 4,
  },
  {
    id: "mock5",
    date: new Date(2025, 0, 5).getTime(), // 2025년 1월 5일
    content: "예상치 못한 오해로 마음이 상했고, 차분히 넘기려 했지만 쉽게 가라앉지 않는 화가 났다. 감정을 억누르려 했지만 결국 말로 표현하고 나서야 조금 나아졌다. 앞으로는 더 솔직하게 표현해야겠다고 다짐했다.",
    emotionId: 5,
  },

]

// 일기 데이터 관리 기능을 처리하는 함수를 컴포넌트 밖에
// state: 상태관리 객체인 State
// action은 전달받은 매개변수 객체 (type,data)
function reducer(state,action){
  switch(action.type){
    case "CREATE" : {
      return [action.data, ...state] //[데이터, 스프레드 연산자(기존배열)] => 병합
    }
    case "UPDATE" : {
      //기존 data.id와 수정 data.id가 같으면 action.data에 있는 값으로 전환
      //그렇지 않다면 기존 data를 그대로 state에 반환
      return state.map((it) => {
        return String(it.id) === String (action.data.id)?{...action.data}: it
      })
    }
    case "DELETE" : {
      // 기존 data.id 삭제 data.id가 일치하지 않은 action.data에 값을 반환
      return state.filter((it)=>{
        return String(it.id) !== String(action.data.id)})
    }
    case "INIT":{
      return action.data;
    }
    default : return state;
  }
}

export const DiaryStateContext = React.createContext()//객체
export const DiaryDisPatchContext = React.createContext()//함수

function App() {
  //데이터 로딩 상태 구현
  const [isDataLoaded, setIsDateLoaded] = useState(false)

  // 일기 데이터 관리 State 객체
  // State 객체 데이터 업데이트하는 함수는 컴포넌트 외부 함수 사용 => useReduce()
  const [data, dispatch] = useReducer(reducer,[]); //data 변수 초기값은 비어있는 배열
  const idRef = useRef(0) // DOM 참조형 (식별자 역할), 변수 역할

  // mock 데이터는 컴포넌트의 라이프사이클과 관련없고, 컴포넌트가 리렌더할 때 다시 생성할 필요가 없는 값이나
  // 함수는 반드시 컴포넌트 외에 선언
  //초기칠 설정
  //useEffect 콜백함수는 마운트 시점에 1번만 호출되어 함수 dispatch를 호출
  useEffect(()=>{
    dispatch({
      type:"INIT",
      data:mockData,
    })
    setIsDateLoaded(true)
  },[])

  //기능별 함수 정의
  //1. 일기 내용 추가
  const onCreate = (date,content,emotionId) => {
    dispatch({
      type:"CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(), //현재 시스템 날짜를 타임스탬프 형식
        content,
        emotionId
      }
    })//end dispatch()
    idRef.current += 1; // 일기 관리 데이터 고유 식별자(ID역할)
  }

  //일기 데이터 구분하는 고유 식별자 : targetId
  //2. 일기 내용 수정
  const onUpdate = (targetId, date,content,emotionId) => {
    dispatch({
      type:"UPDATE",
      data:{
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    })
  }
  const onDelete = (targetId) => {
    dispatch({
      type:"DELETE",
      data:{
        id: targetId
      }
    })
  }



  if(!isDataLoaded){
    return<div>데이터를 불러오는 중입니다.</div>
  }else{
    return (
      <DiaryStateContext.Provider value={data}>
      <DiaryDisPatchContext.Provider value={{
        onCreate,
        onUpdate,
        onDelete,
      }}>
      <div className="mt-4">
        <div className='container'>
          <h1 className='myfont_title text-center'>감정 일기장 V1</h1>
          <h5>Welcome to 운영팀 웹 어드민 시스템</h5>
          <p>접근 권한이 필요하신분은 운영팀에 문의해주세요.</p>
          <div className='mx-auto'>        
  
          {/* 컴포넌트 연결(마운트) 하기 */}
          {/* <div>
            <Home/>
            <NEW/>
            <Diary/>
            <Edit/>
          </div> */}
          
          {/* 하이퍼링크 기능 => 네비게이션 메뉴 링크 기능 */}
          <div className="d-flex gap-2">
            <Link to={"/"}>Home</Link>
  
            <Link to={"/new"}>New</Link>
  
            <Link to={"/diary"}>diary</Link>
  
            <Link to={"/edit"}>Edit</Link>
          </div>          
          <hr/>
  
          {/* URL을 분석하여 페이지 연결(URL Controller 역할)
          특정 경로 요청시 특정 컴포넌트 마운트 */}
          <Routes>
            <Route path="/"           element={<Home/>}/>
            <Route path="/new"        element={<NEW/>}/>
            {/* path에 매개변수 선언하여 인자값 전달 */}
            <Route path="/diary/:id"  element={<Diary/>}/>
            <Route path="/edit/:id"       element={<Edit/>}/>
          </Routes>
  
          </div>
  
          {/* 스타일 적용 : class -> className에서 클래스명 사용 */}
          {/* <div>
            <button type='button' className="btn btn-primary">primary</button>
            <button type='button' className="btn btn-secondary">secondary</button>
            <button type='button' className="btn btn-danger">danger</button>
          </div> */}
  
          {/* 이미지 불러오기 */}
          {/* <div>
            <img src={getEmotionImgById(1)} alt="감정1"/>
            <img src={getEmotionImgById(2)} alt="감정2"/>
            <img src={getEmotionImgById(3)} alt="감정3"/>
            <img src={getEmotionImgById(4)} alt="감정4"/>
            <img src={getEmotionImgById(5)} alt="감정5"/>
          </div> */}
  
        </div>
      </div>
      <Footer/>
      </DiaryDisPatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }

}

export default App;

/*
페이지 라우팅: 요청에 따라 적절한 페이지를 반환하는 일련의 과정
ex) https://myproject.com/blog 요청 -> blog.html 반환
  1. 서버 사이드렌더링(url 방식)와 클라이언트 사이드 렌더링

  리액트 라우터 : 페이징 라우팅 전용라이브러리

  일기 관리 기능 만들기

  1. 일기 데이터 State는 최상위 컴포넌트인 App생성
  2. useReduce로 



*/
