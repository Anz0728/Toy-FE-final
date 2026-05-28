import BuylogHeader from '../components/buylog/BuylogHeader';
import TipBox from '../components/buylog/TipBox';
import PhotoUploadArea from '../components/buylog/PhotoUploadArea';
import TabSelector from '../components/buylog/TabSelector';
import AnalyzeButton from '../components/buylog/AnalyzeButton';

function Buylog() {
    return (
        <div style={{ width: '390px', minHeight: '844px', backgroundColor: '#FDF7FD', margin: '0 auto' }}>
            <BuylogHeader />
            <TipBox />
            <PhotoUploadArea />
            <TabSelector />
            <AnalyzeButton />
        </div>
    );
}

export default Buylog;