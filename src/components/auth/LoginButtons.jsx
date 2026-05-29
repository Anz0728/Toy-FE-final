import { useNavigate } from 'react-router-dom'
import googleIcon from '../../assets/google_icon.svg'
import phoneIcon from '../../assets/phone_icon.svg'
import './LoginButtons.css'

function LoginButtons() {
    const navigate = useNavigate()  // 페이지 이동 훅

    const handleLogin = () => {
        // localStorage에 guestId 없으면 새로 생성
        if (!localStorage.getItem('guestId')) {
            const guestId = crypto.randomUUID()  // UUID 생성
            localStorage.setItem('guestId', guestId)  // 저장
        }
        navigate('/feed')  // feed로 이동
    }

    return (
        <div className="login-buttons-container">
            <button className="btn-phone" onClick={handleLogin}>
                <img src={phoneIcon} alt="phone" className="btn-icon" />
                <span className="btn-phone-text">Login with Phone</span>
            </button>

            <button className="btn-google" onClick={handleLogin}>
                <img src={googleIcon} alt="google" className="btn-icon" />
                <span className="btn-google-text">Login with Google</span>
            </button>

            <div className="signup-text">
                <span className="signup-text-default">Don't have an account? </span>
                <span className="signup-text-link">Sign Up</span>
            </div>
        </div>
    )
}

export default LoginButtons