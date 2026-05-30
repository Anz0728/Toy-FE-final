import LoginButtons from '../components/auth/LoginButtons'
import './Login.css'

function Login() {
    return (
        <div className="login-page">
            <h1 className="login-page__title">
                Buylog
            </h1>

            <LoginButtons />
        </div>
    )
}

export default Login
