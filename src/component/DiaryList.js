import { useEffect, useState } from "react"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"

const sortOptionList = [
    {value:"latest",name:"최신순"},
    {value:"oldest",name:"오래된 순"}

]

const DiaryList = ({data}) =>{
    const [sortType,setSortType] = useState("latest")
    const [sortedData, setSortedData] = useState([])
    const navigate = useNavigate() //하이퍼링크 기능

    useEffect(()=>{
        const compare = (a,b) =>{
            if(sortType==="latest"){
                //내림차순(b(새로 바뀌는 데이터) - a(초기 데이터))
                return Number(b.date) - Number(a.date) 
            }else{
                //오름차순(a(초기 데이터) - b(새로 바뀌는 데이터))
                return Number(a.date) - Number(b.date)
            }
        }
        
        // 배열복사
        const copyList = JSON.parse(JSON.stringify(data))
        //정렬 처리
        copyList.sort(compare)
        setSortedData(copyList)

    },[data,sortType])

    //정렬 옵션 선택시
    const onChangeSortType = (e) => {
        console.log(e.target.value)
        setSortType(e.target.value)
    }

    //새 일기 쓰기 버튼 클릭
    const onClickNew=()=>{
        navigate("/new") //태그 <a href="/new"></a> 유사기능
    }

    return(<>
        <div className="row mt-3">
            <div className="col-4">
                <select class="form-select" 
                    value={sortType} onChange={onChangeSortType}>
                    {
                        sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>{it.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col-8">
                <div className="d-grid">
                    <Button type={"primary"} text={"새 일기 쓰기"}
                    onClick={onClickNew}/>
                </div>

            </div>
            {/* Diary List 출력 */}
            <div className="mt-3">
                    {
                        sortedData.map((it)=>(
                            <DiaryItem key={it.id} {...it}/>
                        ))
                    }
            </div>

        </div>
    </>)

}

export default DiaryList