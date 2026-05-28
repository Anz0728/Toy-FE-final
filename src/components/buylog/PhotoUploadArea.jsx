import React from 'react';
import './PhotoUploadArea.css';
import CameraIcon from '../../assets/cameraIcon.svg';



function PhotoUploadArea() {
    return (
        <div className="photo-upload-area">
            <div className="photo-upload-area__inner">
                <img src={CameraIcon} alt="카메라" className="photo-upload-area__camera" />
                <p className="photo-upload-area__title">오늘 산 것을 찍어주세요</p>
                <p className="photo-upload-area__subtitle">영수증이나 물건 사진도 좋아요</p>
            </div>
        </div>
    );
}

export default PhotoUploadArea;