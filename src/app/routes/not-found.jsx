import { useNavigate } from "react-router-dom";

export const NotFoundRoute =()=>{
    const navigate =useNavigate();

    const handleGoHome=()=>{
        navigate('/');
    }
    return (
        <h1 onChange={()=>handleGoHome}>Not found pages section</h1>
        
    )
}
