import { IonButton, IonCard, IonCardContent, IonCardHeader, IonItem, IonList, IonTitle } from "@ionic/react";
import QrScanner from 'qr-scanner';
import { useSetRecoilState } from "recoil";
import { cameraState } from "../data/camera.atom";
import { useCameras } from "../hooks/use-cameras.hook";
import './ChooseCamera.css';

interface ChooseCameraProps {
}

const ChooseCamera: React.FC<ChooseCameraProps> = (props: ChooseCameraProps) => {
    const cameras = useCameras();
    const setCamera = useSetRecoilState(cameraState);
    const listItems = (cameras?.length && cameras.map((camera: QrScanner.Camera) => {
        return (<div className="camera-item" key={camera.id}>
            <IonButton onClick={() => { console.log('set', camera); setCamera(camera) }}>
                {camera.label}
            </IonButton>
        </div>)
    })) || null;
    return (
        <div className="container">
            <IonCard style={{ width: '90%' }}>
                <IonCardHeader>
                    <IonTitle>Odaberite kameru</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                    {listItems ?? <div>Učitavanje liste kamera.</div>}
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default ChooseCamera;
