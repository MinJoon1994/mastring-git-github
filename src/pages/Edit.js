import { useNavigate, useParams } from "react-router-dom"
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "./Editor";
import { useContext } from "react";
import { DiaryDisPatchContext } from "../App";

const Edit = () =>{
    // App에서 생성한 메서드 호출
    const {onDelete,onUpdate} = useContext(DiaryDisPatchContext)
    //수정할 일기 id 값 받아오기
    const {id} = useParams();
    //받아온 id값으로 Diary data 받아오기
    const data = useDiary(id);
    const navigate = useNavigate();

    //뒤로가기
    const goBack = () =>{
        navigate(-1)
    }

    //삭제하기
    const onClickDelete= () =>{
        if(window.confirm("일기를 정말 삭제할까요?")){
            onDelete(id)
            navigate("/",{replace:true})
        }
    }

    //수정
    const onSubmit = (data) => {
        if(window.confirm("일기를 정말 수정할까요?")){
            //수정할 값 데이터로 받기
            const{date,content,emotionId} = data
            onUpdate(id,date,content,emotionId)
            navigate("/",{replace:true})
        }
        
    }

    if(!data){
        return <div>일기를 불러오고 있습니다.</div>
    }else{
        return(<>
            <div>
                <Header title={"일기 수정하기"}
                        leftChild={<Button text={"< 뒤로"} type={"outline-warning"} onClick={goBack}/>}
                        rightChild={<Button text={"삭제"} type={"danger"} onClick={onClickDelete}/>}/>
           </div>

           <div className="m-4 w-75 mx-auto alert alert-light">
                <Editor initDate={data} onSubmit={onSubmit}/>
           </div>
        </>)
    }
}

export default Edit