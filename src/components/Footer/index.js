import './index.css'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="bg-footer">
      <div className="footer-image-container">
        <img
          className="footer-image"
          alt="website-footer-logo"
          src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729704130/Frame_275_isnd5o.png"
        />
        <h1 className="footer-para">Tasty Kitchen</h1>
      </div>
      <p className="footer-tag">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="icon-container">
        <FaPinterestSquare testid="pintrest-social-icon" className="icon" />
        <FaInstagram testid="instagram-social-icon" className="icon" />
        <FaTwitter testid="twitter-social-icon" className="icon" />
        <FaFacebookSquare testid="facebook-social-icon" className="icon" />
      </div>
    </div>
  )
}
