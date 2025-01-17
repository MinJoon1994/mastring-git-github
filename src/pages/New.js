import { data, useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "./Editor";
import { useContext } from "react";
import { DiaryDisPatchContext } from "../App";

const NEW =() =>{
    const {onCreate} = useContext(DiaryDisPatchContext)
    const onSubmit =(data)=>{
        const{date,content,emotionId} = data
        onCreate(date,content,emotionId)
        navigate("/",{replace:true})
    }
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (<>
        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로"} type={"outline-danger"} onClick={goBack}/>}/>
        </div>
        <div className="container p-5 w-75 alert alert-light">
            <Editor onSubmit={onSubmit}/>
        </div>
    
    </>)
}

export default NEW;