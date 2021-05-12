import { Link } from "react-router-dom";
import "../../styles/discoverEvenMore.css";
function DiscoverEvenMore() {
  return (
    <div className="discover-main">
      <h1 className="discover-title">Discover even more</h1>
      <div className="discover-content">
        <Link className="discover-item " to="/categories/dAPYQgeAUzNgKlAfFsJg">
          <div className="discoverEvenMore discover-lips">
            <span>Lips</span>
          </div>
        </Link>
        <Link className="discover-item " to="/categories/klfNpOuNiwtYoKKMiKfx">
          <div className="discoverEvenMore discover-face">
            <span>Face</span>
          </div>
        </Link>
        <Link className="discover-item " to="/categories/ShNIPYCvUYhcWz6pUpPI">
          <div className="discoverEvenMore discover-eyes">
            <span>Eyes</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default DiscoverEvenMore;
