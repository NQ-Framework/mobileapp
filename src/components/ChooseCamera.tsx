import { IonButton, IonItem, IonList } from "@ionic/react";
import QrScanner from 'qr-scanner';
import { useSetRecoilState } from "recoil";
import { cameraState } from "../data/camera.atom";
import { useCameras } from "../hooks/use-cameras.hook";

interface ChooseCameraProps {
}

const ChooseCamera: React.FC<ChooseCameraProps> = (props: ChooseCameraProps) => {
    const cameras = useCameras();
    const setCamera = useSetRecoilState(cameraState);
    const listItems = (cameras?.length && cameras.map((camera: QrScanner.Camera) => {
        return (<IonItem key={camera.id}>
            <IonButton onClick={() => { setCamera(camera) }}>
                {camera.label}
            </IonButton>
        </IonItem>)
    })) || null;
    return (
        <IonList>
            {listItems ?? <div>Učitavanje liste kamera.</div>}
        </IonList>
    );
};

export default ChooseCamera;
