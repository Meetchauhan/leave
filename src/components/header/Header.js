import { useNavigate } from "react-router-dom";
import "./header.css"

export default function Header() {
  const history = useNavigate();
  return (
    <header>
      <div className="container header" >
        <h1 style={{ margin: "20px 0 10px" }}>Header</h1>
        <div className="logout" onClick={()=>history("/login", { replace: true })} >Logout</div>
      </div>
    </header>
  );
}
