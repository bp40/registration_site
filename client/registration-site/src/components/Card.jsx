const Card = ({title, msg}) => {

    return (
        <div className="card w-48 h-48 m-8 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{msg}</p>
            </div>
        </div>
    )
}

export default Card