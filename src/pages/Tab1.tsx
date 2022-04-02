import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useCallback, useEffect, useRef } from 'react';
import { Item } from '../data/item.model';
import { useRecoilState } from 'recoil';
import { uid } from '../utilities/uid';
import VicQrScanner from '../components/VicQrScanner';
import { cameraReverseOutline } from 'ionicons/icons';
import { useResetCamera } from '../hooks/use-reset-camera.hook';
import { useList } from '../hooks/use-list.hook';
import useSound from 'use-sound';
import { lastItemState } from '../data/last-item.atom';

const Tab1: React.FC = () => {
  const { addItem } = useList();
  const [lastItem, setLastItem] = useRecoilState(lastItemState)
  const lastItemRef = useRef<Item>({ value: '', timestamp: '', id: '' });
  const [resetCamera, hasCamera] = useResetCamera();
  const [play] = useSound('assets/beep.mp3');
  const overlay = useRef<HTMLDivElement>(null);
  const lastItemDisplay = useRef<HTMLDivElement>(null);

  lastItemRef.current = lastItem;

  useEffect(() => {
    if (lastItemDisplay.current) {
      lastItemDisplay.current.style.opacity = '0';
    }
  }, [lastItemDisplay])

  const onScanSuccess = useCallback((decodedText: string, decodedResult: any) => {
    if (decodedText === lastItemRef.current.value && (!lastItemRef.current.timestamp || Date.parse(lastItemRef.current.timestamp) + 3000 > Date.now())) {
      return;
    }
    if (lastItemDisplay.current) {
      lastItemDisplay.current.style.transition = 'none';
      lastItemDisplay.current.style.opacity = '1';
    }
    setTimeout(() => {
      if (lastItemDisplay.current) {
        lastItemDisplay.current.style.transition = 'all 4s ease-out';
        lastItemDisplay.current.style.opacity = '0';
      }
    }, 200);
    if (overlay.current) {
      overlay.current.style.opacity = '1';
      overlay.current.style.display = 'initial';
      setTimeout(() => {
        overlay.current!.style.opacity = '0';
      }, 100);
    }
    const newItem: Item = { value: decodedText, timestamp: new Date().toISOString(), id: uid() };
    setLastItem(newItem);
    addItem(newItem);
    play();
  }, [setLastItem, addItem, play]);


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
        <div className='container'>
          <VicQrScanner successCallback={onScanSuccess} ></VicQrScanner>
          <div ref={lastItemDisplay} className='last-item'>{lastItem?.value}</div>
          <div ref={overlay} className='scan-overlay'></div>
        </div>
      </IonContent >
    </IonPage >
  );
};

export default Tab1;
