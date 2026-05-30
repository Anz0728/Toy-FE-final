import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuylogHeader from '../components/buylog/BuylogHeader'
import TipBox from '../components/buylog/TipBox'
import PhotoUploadArea from '../components/buylog/PhotoUploadArea'
import TabSelector from '../components/buylog/TabSelector'
import AnalyzeButton from '../components/buylog/AnalyzeButton'
import { getGuestId } from '../utils/api'
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
            const formData = new FormData()
            formData.append('file', image)

            const uploadRes = await fetch('http://localhost:8080/api/images/upload', {
                method: 'POST',
                body: formData,
            })
            const uploadData = await uploadRes.json()

            if (!uploadData.success) {
                if (uploadData.error?.code === 'FILE_ERROR') alert('이미지 저장에 실패했어요. 다시 시도해주세요')
                else alert('이미지 업로드에 실패했어요')
                return
            }

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

            if (!analyzeData.success) {
                if (analyzeData.error?.code === 'MISSING_IMAGE') alert('이미지를 찾을 수 없어요. 다시 선택해주세요')
                else if (analyzeData.error?.code === 'ANALYZE_FAILED') alert('AI가 이미지를 인식하지 못했어요. 다른 사진을 시도해주세요')
                else alert('분석에 실패했어요. 다시 시도해주세요')
                return
            }

            // TODO: 팀원 경로 확인 후 주석 해제
            // navigate('/ai-result', { state: { result: analyzeData.data, imageUrl } })
            console.log('AI 분석 결과:', analyzeData)

        } catch (e) {
            alert('서버 연결에 실패했어요. 잠시 후 다시 시도해주세요')
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
