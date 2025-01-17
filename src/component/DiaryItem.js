import { useNavigate } from "react-router-dom"
import { getEmotionImgById } from "../util"
import Button from "./Button"

const DiaryItem = ({id,emotionId,content,date}) =>{

    const navigate = useNavigate()

    // 수정버튼 이벤트 함수
    const goDiary = () => {
        //링크
        navigate(`/diary/${id}`)
    }

    return(<>
        <div className="row border m-2 p-3">
            <div className="col-3 d-flex justify-content-center align-items-center">
                <div className={["emotion_item_id ",`EmotionItem_on_${emotionId}`].join("")}>
                    <img src={getEmotionImgById(emotionId)}/>
                </div>
            </div>
            <div className="col-6 p-3">
                <div className="fs-3">{new Date(parseInt(date)).toLocaleString()}</div>
                <div className="fs-4 text-body-secondary">
                    {/* 내용이 긴 경우 25자 이내 처리 */}
                    {content.slice(0,25)}...
                </div>
            </div>
            {/* 작업 버튼 */}
            <div className="col-3 p-3 d-flex justify-content-end align-items-center">
                <Button type="outline-primary" text="자세히보기" onClick={goDiary}/>
            </div>
        </div>
    </>)

}

export default DiaryItem