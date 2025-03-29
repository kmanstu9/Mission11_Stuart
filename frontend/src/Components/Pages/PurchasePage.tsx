import { useNavigate, useParams } from 'react-router-dom'

function PurchasePage () {
    const navigate = useNavigate();

    return (
        <>
        <div>
            <h1>Confirm Purchase: </h1>
        </div><br /><div>
                <button className="btn btn-primary">Yes</button>
                <button className="btn btn-primary"
                onClick={() => navigate('/bookList')}>Go Back</button>
            </div>
            </>
    )
}

export default PurchasePage;