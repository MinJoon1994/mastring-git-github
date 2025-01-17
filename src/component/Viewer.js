import { emotionList, getEmotionImgById } from "../util"
import EmotionItem from "./EmotionItem"
import "./Viewer.css"

const Viewer = ({content,emotionId}) => {

    const emotionItem = emotionList.find((it)=>it.id === emotionId)

    return(<>
        <div>
            <h4 className="fs-4 text-center">오늘의 감정</h4>
        </div>
        
        <div className="w-25 mt-3 mx-auto">
            <div className={["emotion_item_id ",`EmotionItem_on_${emotionId}`].join("")}>
                <img src={getEmotionImgById(emotionId)}/>
                <div className="fs-4">{emotionItem.name}</div>
            </div>
        </div>

        <div>
            <h4 className="fs-4 mt-5 text-center">오늘의 일기</h4>
        </div>
        <div className="w-75 mx-auto m-4">
            <div className="content_box">{content}</div>
        </div>


    </>)
}

export default Viewer