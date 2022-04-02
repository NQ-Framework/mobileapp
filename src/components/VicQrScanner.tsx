import { useRecoilValue } from 'recoil';
import { cameraState } from '../data/camera.atom';
import ChooseCamera from './ChooseCamera';
import Scanner from './Scanner';
import './VicQrScanner.css';

interface VicQrScannerProps {
    successCallback: (decodedText: any, decodedResult: any) => void;
    errorCallback: (error: any) => void;
}

const VicQrScanner: React.FC<VicQrScannerProps> = (props: VicQrScannerProps) => {
    const camera = useRecoilValue(cameraState);
    return camera ? <Scanner successCallback={props.successCallback} errorCallback={props.errorCallback}></Scanner> : <ChooseCamera></ChooseCamera>;
};

export default VicQrScanner;
