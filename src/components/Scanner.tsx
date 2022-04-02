import QrScanner from 'qr-scanner';
import { useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { cameraState } from '../data/camera.atom';
import './Scanner.css';

interface ScannerProps {
    successCallback: (decodedText: any, decodedResult: any) => void;
    errorCallback: (error: any) => void;
}

const Scanner: React.FC<ScannerProps> = (props: ScannerProps) => {
    const camera = useRecoilValue(cameraState);

    const successCb = props.successCallback;
    // const failCb = props.errorCallback;
    useEffect(() => {
        if (!camera) {
            return;
        }
        const element = document.getElementById('reader');

        const qrScanner = new QrScanner(element as HTMLVideoElement, (result: QrScanner.ScanResult) => { successCb(result.data, null) }, { preferredCamera: camera.id, highlightScanRegion: true, maxScansPerSecond: 25 });
        qrScanner.start().then(() => { console.log('scanning started'); });
        return () => {
            qrScanner.stop();
        }
    }, [camera, successCb]);
    return (
        <video id="reader" style={{ width: "100%", height: "100%" }}>
        </video>
    );
};

export default Scanner;
