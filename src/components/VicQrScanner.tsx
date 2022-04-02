import { useRecoilValue } from 'recoil';
import { cameraState } from '../data/camera.atom';
import ChooseCamera from './ChooseCamera';
import Scanner from './Scanner';
import './VicQrScanner.css';

interface VicQrScannerProps {
    successCallback: (decodedText: any, decodedResult: any) => void;
}

const VicQrScanner: React.FC<VicQrScannerProps> = (props: VicQrScannerProps) => {
    const camera = useRecoilValue(cameraState);
    const successCallback = props.successCallback;
    return camera ? <Scanner successCallback={successCallback}></Scanner> : <ChooseCamera></ChooseCamera>;
};

export default VicQrScanner;
