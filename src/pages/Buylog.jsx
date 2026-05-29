import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuylogHeader from '../components/buylog/BuylogHeader'
import TipBox from '../components/buylog/TipBox'
import PhotoUploadArea from '../components/buylog/PhotoUploadArea'
import TabSelector from '../components/buylog/TabSelector'
import AnalyzeButton from '../components/buylog/AnalyzeButton'
import { getGuestId } from '../utils/api'

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

        const formData = new FormData()
        formData.append('file', image)

        const uploadRes = await fetch('http://localhost:8080/api/images/upload', {
            method: 'POST',
            body: formData,
        })
        const uploadData = await uploadRes.json()
        const imageUrl = uploadData.data.imageUrl

        const analyzeForm = new FormData()
        analyzeForm.append('image', image)
        analyzeForm.append('imageUrl', imageUrl)

        const analyzeRes = await fetch('http://localhost:8080/api/home', {
            method: 'POST',
            headers: { 'X-Guest-Id': getGuestId() },
            body: analyzeForm,
        })
        const analyzeData = await analyzeRes.json()

        // TODO: 팀원 경로 확인 후 주석 해제
        // navigate('/ai-result', { state: { result: analyzeData.data, imageUrl } })
        console.log('AI 분석 결과:', analyzeData)
    }

    return (
        <div style={{ width: '390px', backgroundColor: '#FDF7FD', margin: '0 auto', paddingBottom: '180px' }}>
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