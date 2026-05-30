import './TabSelector.css';

function TabSelector({ activeTab, onTabChange }) {
    return (
        <div className="tab-selector">
            <button
                className={`tab-selector__btn ${activeTab === 'album' ? 'tab-selector__btn--active' : 'tab-selector__btn--inactive'}`}
                onClick={() => onTabChange('album')}
            >
                앨범에서 선택
            </button>
            <button
                className={`tab-selector__btn ${activeTab === 'camera' ? 'tab-selector__btn--active' : 'tab-selector__btn--inactive'}`}
                onClick={() => onTabChange('camera')}
            >
                사진 찍기
            </button>
        </div>
    );
}

export default TabSelector;
