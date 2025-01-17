const Button =({text,type,onClick})=>{

    const btnType = ["success","warning","danger","outline-primary","outline-danger","outline-info","secondary","outline-warning"].includes(type) ? type : "primary"

    return(<>
        <button className={["btn ", `btn-${btnType}`].join("")} onClick={onClick}>
            {text}
        </button>
        </>)
}

// 매개변수 있고 전달값이 없을 경우
Button.defaultProps={
    type:"default"
}

export default Button;