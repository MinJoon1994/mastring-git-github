import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { useEffect, useState } from "react";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormattedDate } from "../util";
import Viewer from "../component/Viewer";

//---------------------------------------------------------//
// Diary 페이지 구현
//---------------------------------------------------------//
// 특정 일기를 상세 조회하는 페이지
const Diary =() =>{

    //url path에서 설정된 매개변수 값 읽기
    const {id} =useParams();
    // const parmas = useParams();
    // console.log(id)
    // console.log(parmas, parmas.id)
    
    const data = useDiary(id)
    const navigate = useNavigate()

    const goBack = () =>{
        navigate(-1)
    }
    const goEdit = () =>{
        navigate(`/edit/${id}`)
    }

    if(!data){}

    else{
        const {date,emotionId,content} = data
        //일기 날짜 형식 설정
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`
        if(emotionId===1 || emotionId===2){
            return(
            <div>
                <Header title={title} 
                        leftChild={<Button text={"< 뒤로가기"} type={"outline-danger"} onClick={goBack}/>} 
                        rightChild={<Button text={"수정하기"} type={"outline-primary"} onClick={goEdit}/>}/>
                <hr/>
                <div className="m-3 p-3 alert alert-success">
                    <Viewer content={content} emotionId={emotionId}/>
                </div>
            </div>
            )
        }
        else if(emotionId===3 || emotionId===4){
            return(
            <div>
                <Header title={title} 
                        leftChild={<Button text={"< 뒤로가기"} type={"outline-danger"} onClick={goBack}/>} 
                        rightChild={<Button text={"수정하기"} type={"outline-primary"} onClick={goEdit}/>}/>
                <hr/>
                <div className="m-3 p-3 alert alert-warning">
                    <Viewer content={content} emotionId={emotionId}/>
                </div>
            </div>
            )
        }
        else if(emotionId===5){
            return(
            <div>
                <Header title={title} 
                        leftChild={<Button text={"< 뒤로가기"} type={"outline-danger"} onClick={goBack}/>} 
                        rightChild={<Button text={"수정하기"} type={"outline-primary"} onClick={goEdit}/>}/>
                <hr/>
                <div className="m-3 p-3 alert alert-danger">
                    <Viewer content={content} emotionId={emotionId}/>
                </div>
            </div>
            )
        }
    }  
}

export default Diary;