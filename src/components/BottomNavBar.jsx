import { useNavigate } from 'react-router-dom'
import HomeIcon from '../assets/Home.svg'
import AddIcon from '../assets/Add.svg'
import MatchesIcon from '../assets/Matches.svg'
import CalendarIcon from '../assets/uil_calender.svg'
import IconIcon from '../assets/Icon.svg'
import './BottomNavBar.css'

function BottomNavBar() {
    const navigate = useNavigate()

    return (
        <nav className="bottom-nav-bar">
            <img src={HomeIcon} width={62} height={48} className="bottom-nav-bar__icon" onClick={() => navigate('/home')} />
            <img src={IconIcon} width={24} height={24} className="bottom-nav-bar__icon" onClick={() => navigate('/feed')} />
            <img src={AddIcon} width={62} height={48} className="bottom-nav-bar__icon" onClick={() => navigate('/buylog')} />
            <img src={CalendarIcon} width={24} height={24} className="bottom-nav-bar__icon" onClick={() => navigate('/feed')} />
            <img src={MatchesIcon} width={62} height={48} className="bottom-nav-bar__icon" onClick={() => navigate('/report')} />
        </nav>
    )
}

export default BottomNavBar
