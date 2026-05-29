import React, { useRef } from 'react';
import './PhotoUploadArea.css';
import CameraIcon from '../../assets/cameraIcon.svg';

function PhotoUploadArea({ onImageSelect, preview }) {
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()  // 파일 선택창 열기
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) onImageSelect(file)  // 부모에게 파일 전달
    }

    return (
        <div className="photo-upload-area" onClick={handleClick}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div className="photo-upload-area__inner">
                {preview ? (
                    <img src={preview} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '34px' }} />
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

export default PhotoUploadArea;