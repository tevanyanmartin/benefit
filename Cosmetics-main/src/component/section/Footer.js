import "../../styles/footer.css";
import { useSelector } from "react-redux";
import { selectBrands } from "../../selectors/firebase";
import { Link } from "react-router-dom";
import faceLogo from "../../Pics/icons/facebook.png";
import instaLogo from "../../Pics/icons/instagram.png";
import youtubeLogo from "../../Pics/icons/youtube.png";

function Footer() {
  const brands = useSelector(selectBrands);
  return (
    <footer>
      <div className="footer-main-content">
        <div className="footer-content footer-brands">
          <h2>Brands</h2>
          <div className="footer-brands-content">
            {brands.map((brand, i) => (
              <div key={i}>
                <Link to={`/brands/${brand.brandId}`}>
                  <div className="footerItem">{brand.label}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-content footer-contact">
          <h2>CONNECT</h2>
          <div className="footer-connect-content">
            <li className="footerItem">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instaLogo} className="logos" alt="" />
              </a>
            </li>
            <li className="footerItem">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={faceLogo} className="logos" alt="" />
              </a>
            </li>
            <li className="footerItem">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={youtubeLogo} className="logos" alt="" />
              </a>
            </li>
          </div>
        </div>
        <div className="footer-content footer-map">
          <h2>MAP</h2>
          <div
            className="map"
            dangerouslySetInnerHTML={{
              __html:
                '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1524.1128798402647!2d44.515031806788166!3d40.181788991938205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcfcaa0c429b%3A0xabe56a706c54a246!2s19%20Pushkin%20St%2C%20Yerevan%200010%2C%20Armenia!5e0!3m2!1sen!2sus!4v1619122860237!5m2!1sen!2sus" class="iframe" width="400" height="200" style="border:0;" allowFullScreen="" loading="lazy"/>'
            }}
          />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
