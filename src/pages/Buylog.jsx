import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuylogHeader from '../components/buylog/BuylogHeader'
import TipBox from '../components/buylog/TipBox'
import PhotoUploadArea from '../components/buylog/PhotoUploadArea'
import TabSelector from '../components/buylog/TabSelector'
import AnalyzeButton from '../components/buylog/AnalyzeButton'
import { api } from '../utils/api'
import './Buylog.css'

function Buylog() {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [activeTab, setActiveTab] = useState('album')
    const navigate = useNavigate()

    const handleImageSelect = (file) => {
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleAnalyze = async () => {
        if (!image) {
            alert('사진을 먼저 선택해주세요')
            return
        }

        try {
            // 2.1 Image Upload
            const uploadData = await api.uploadImage(image);
            const imageUrl = uploadData.imageUrl;

            // 2.2 AI Consumption Analysis
            const analyzeData = await api.analyzeHome(image, imageUrl);

            navigate('/analyze', { state: { result: analyzeData, imageUrl } })

        } catch (e) {
            alert(e.message || '분석에 실패했어요. 다시 시도해주세요');
        }
    }

    return (
        <div className="buylog-page">
            <BuylogHeader />
            <TipBox />
            <PhotoUploadArea
                onImageSelect={handleImageSelect}
                preview={preview}
                activeTab={activeTab}
            />
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            <AnalyzeButton onClick={handleAnalyze} />
        </div>
    )
}

export default Buylog