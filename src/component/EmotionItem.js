import React from "react";

const EmotionItem = ({id, img, name, onClick, isSelected}) => {

    const handleOnClick=()=>{
        onClick(id)
    }

    return(<>
        <div className={["emotion_item_id", 
                            isSelected? `EmotionItem_on_${id}`: 'EmotionItem_off'].join(" ")} 
             onClick={handleOnClick}>
            <img src={img} alt={`emotion${id}`}/>
            <div>{id}</div>
            <div>{name}</div>
            <div>{isSelected}</div>
        </div>
    
    </>)
}

export default React.memo(EmotionItem);