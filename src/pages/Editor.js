import { useCallback, useEffect, useState } from "react";
import { emotionList, getFormattedDate } from "../util";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import "../component/Emotionitem.css"
import EmotionItem from "../component/EmotionItem";

const Editor =({initDate, onSubmit}) =>{
    const [state, setState] = useState({
        date:getFormattedDate(new Date()),
        emotionId: 3,
        content:""
    })
    
    // props에 받은 initDate 를 의존성 배열에 저장
    // useEffect(콜백함수, 의존성배열)
    useEffect(()=>{
        // initDate 가 falsy 한 값: 부모 컴포넌트에서 정상적인 initDate 받지 못 한 경우
        if (initDate){
            setState({
                ...initDate,
                // state.date 속성은 타임 스탬프형식 -> Date 객체 전환 -> yyyy-mm-dd 형식으로 전환
                date: getFormattedDate(new Date(parseInt(initDate.date)))
            })
        }
    },[initDate]) // initDate 값이 변경될 때 마다 콜백함수 호출


    const navigate = useNavigate();//웹페이지 히스토리 객체

    const handleChangeDate = (e)=>{

        //setter()를 통해 state값 변경하기
        setState({
            ...state,
            date: getFormattedDate(new Date()) //e.target.value
        })
        console.log(new Date())
        console.log('change Date: ',state.date)

    }

    const handleChangeContent = (e) =>{
        setState({
            ...state,
            content: e.target.value
        })
    }

    const handleSubmit = () =>{
        onSubmit(state)
    }

    //이전 페이지 이동
    const handleeOnGoBack = () => {
        navigate(-1)
    }

    //감정 이미지 List
    const handleChangeEmotion = useCallback((emotionId) => {
        console.log('감정 이미지 클릭:',emotionId)
        setState({
            ...state,
            emotionId
        })
    },[])//Editor 컴포넌트의 마운트 시점 이후에는 다시 생성하지 않도록 메모제이션 설정

    return (<>

            <div className="mt-4">
                <h4>오늘의 날짜</h4>
                <div className="row">
                    <div className="col-4">
                    <input className="form-control" type="date" 
                            value={state.date}
                            onChange={handleChangeDate}/>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h4>오늘의 감정</h4>
                {/* 개별 스타일 => xxx.css 작성 import "../xxx.css" */}
                <div className="d-flex justify-content-around emotion_item">
                    {
                         emotionList.map((it)=>(
                        //     <img key={it.id} 
                        //          src={it.img}
                        //          alt={`emotion${it.id}`}
                        //     />
                        // 
                            <EmotionItem
                                key={it.id}
                                {...it}
                                onClick={handleChangeEmotion}
                                isSelected={state.emotionId === it.id}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="mt-4">
                <h4>오늘의 일기</h4>
                <div className="form-floating">
                    <textarea className="form-control" 
                              value={state.content} 
                              onChange={handleChangeContent} rows="15"></textarea>
                    <label for="content">오늘은 어땠나요?</label>
                </div>
            </div>    
            <div className="d-flex justify-content-start gap-2 mx-auto mt-3">
                
                <Button text={"작성완료"} 
                        onClick={handleSubmit}/>
                <Button text={"취소하기"}
                        type="danger"
                        onClick={handleeOnGoBack}/>
            </div>    

        </>)
}

export default Editor;