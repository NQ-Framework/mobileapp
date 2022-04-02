import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useCallback, useRef, useState } from 'react';
import { Item } from '../data/item.model';
import { useRecoilValue } from 'recoil';
import { listCountSelector } from '../data/list-count.selector';
import { uid } from '../utilities/uid';
import VicQrScanner from '../components/VicQrScanner';
import { cameraReverseOutline } from 'ionicons/icons';
import { useResetCamera } from '../hooks/use-reset-camera.hook';
import { useList } from '../hooks/use-list.hook';

const Tab1: React.FC = () => {
  const { addItem } = useList();
  const [lastItem, setLastItem] = useState<Item>({ value: '', timestamp: '', id: '' });
  const lastItemRef = useRef<Item>({ value: '', timestamp: '', id: '' });
  const count = useRecoilValue(listCountSelector);
  const [resetCamera, hasCamera] = useResetCamera();



  lastItemRef.current = lastItem;

  const onScanSuccess = useCallback((decodedText: string, decodedResult: any) => {
    if (decodedText === lastItemRef.current.value && (!lastItemRef.current.timestamp || Date.parse(lastItemRef.current.timestamp) + 3000 > Date.now())) {
      return;
    }
    const newItem: Item = { value: decodedText, timestamp: new Date().toISOString(), id: uid() };
    setLastItem(newItem);
    addItem(newItem);
  }, [setLastItem, addItem, lastItemRef]);


  const onScanFailure = useCallback((error: any) => {
    // console.warn(`Code scan error = ${error}`);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skeniranje</IonTitle>
          <IonButtons slot='primary'>
            {hasCamera && <IonButton onClick={() => { resetCamera() }}>
              <IonIcon slot='icon-only' icon={cameraReverseOutline}></IonIcon>
            </IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <VicQrScanner successCallback={onScanSuccess} errorCallback={onScanFailure}></VicQrScanner>
      </IonContent >
    </IonPage >
  );
};

export default Tab1;
