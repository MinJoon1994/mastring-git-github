import Button from "../component/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../component/Header";
import Editor from "./Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../util";
import DiaryList from "../component/DiaryList";

const Home =() =>{

    // Home 타이틀은 현재 시스템 날짜를 설정하기 위해 State 객체에 값을 설정
    const [pivotDate, setPivotDate] = useState(new Date())
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`

    // 월을 1씩 증가, 감소 하는 함수
    const onIncreaseMonth =() =>{
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1))
    }
    const onDecreaseMonth =() =>{
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()-1))
    }

    // 날짜에 따라 일기 필터링하기 위한 일기 내용 전체 data 공유
    const data = useContext(DiaryStateContext)
    // 날짜에 따라 일기 필터링한 데이터만 저장
    const [filteredData, setFilterData] = useState([])
    // pivotDate가 변할 때마다 해당 월에 작성된 일기 필터링
    useEffect(()=>{

        if(data.length>=1){// 일기 내용이 있을 경우만 처리
            const {beginTimeStamp,endTimeStamp} = getMonthRangeByDate(pivotDate)
            setFilterData(
                data.filter((it)=> it.date >= beginTimeStamp &&it.date <= endTimeStamp)
            )
            
            console.log("sorted it",filteredData)
            
        }else{
            setFilterData([]) //비어 있는 배열 설정
        }

    },[data,pivotDate])    

    //1 .URL에 쿼리 스트림 값 읽기
    const [saerchParams, setSearchParams] = useSearchParams();
    //console.log(saerchParams.get("sort"))
    //console.log(saerchParams.get("name"))
    const navigate = useNavigate();//웹페이지 히스토리 객체
    
    //이전 페이지 이동
    const handleeOnGoBack = () => {
        navigate(-1)
    }

    return <div>
    <div className="container w-75">

            <Header
                title={headerTitle}
                leftChild={<Button
                    type="success"
                    text={"<"}
                    onClick={onDecreaseMonth}
                />}
                rightChild={<Button
                    type="warning"
                    text={">"}
                    onClick={onIncreaseMonth}
                />}
            />
            {/* 해당 월에 일기 내용 목록 LIST */}
            <DiaryList data={filteredData}/>


            {/* 테스트 */}
            {/* <Editor
                initDate={{
                    //현재 날짜를 타임스탬프로 전달
                    date: new Date().getTime(),
                    emotionId:1,
                    content:"이전에 작성했던 일기"
                }}
                onSubmit={()=>alert("작성완료 클릭")}
            /> */}

        {/* Home 페이지 Button
        <span className="m-3">
            <Button
                type={"success"}
                text={"버튼 텍스트"}
                onClick={()=>{alert('HI')}}
            />

            <Button
                type={"warning"}
                text={"전송"}
                onClick={()=>{alert('전송합니다.')}}
            />

            <Button
                text={"기타스타일"}
                onClick={()=>{alert('기타버튼')}}
            />
        </span> */}
        </div>
    </div>    
}

export default Home;