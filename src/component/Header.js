
const Header = ({title,leftChild,rightChild}) =>{
    return(<>
        <div>
            <div className="row p-2">
                <div className="col-2">{leftChild}</div>
                <div className="col-8 text-center mt-2"><h4>{title}</h4></div>
                <div className="col-2 text-end">{rightChild}</div>
            </div>
        </div>
        <hr/>
    </>)

}

export default Header