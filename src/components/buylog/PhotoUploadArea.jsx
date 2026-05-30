import { useRef } from 'react';
import CameraIcon from '../../assets/cameraIcon.svg';
import './PhotoUploadArea.css';

function PhotoUploadArea({ onImageSelect, preview, activeTab }) {
    const fileInputRef = useRef(null)

    const handleClick = () => {
        if (activeTab === 'camera') {
            fileInputRef.current.setAttribute('capture', 'environment')
        } else {
            fileInputRef.current.removeAttribute('capture')
        }
        fileInputRef.current.click()
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) onImageSelect(file)
    }

    return (
        <div className="photo-upload-area" onClick={handleClick}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="photo-upload-area__file-input"
            />
            <div className="photo-upload-area__inner">
                {preview ? (
                    <img src={preview} alt="미리보기" className="photo-upload-area__preview" />
                ) : (
                    <>
                        <img src={CameraIcon} alt="카메라" className="photo-upload-area__camera" />
                        <p className="photo-upload-area__title">오늘 산 것을 찍어주세요</p>
                        <p className="photo-upload-area__subtitle">영수증이나 물건 사진도 좋아요</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default PhotoUploadArea
