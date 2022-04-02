import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Catalogue from '../components/Catalogue';
import { listCountSelector } from '../data/list-count.selector';
import { useList } from '../hooks/use-list.hook';
import './Tab2.css';

const Tab2: React.FC = () => {
  const count = useRecoilValue(listCountSelector);
  const { resetList } = useList();
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista - {count}</IonTitle>
          <IonButtons slot='primary'>
            <IonButton onClick={() => {
              setDeleteAllOpen(true);
            }}>
              <IonIcon icon={refreshOutline}>
              </IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert isOpen={deleteAllOpen}
          onDidDismiss={() => { setDeleteAllOpen(false); }}
          header='Brisanje cele liste'
          message='Da li želite da obrišete celu listu?'
          buttons={[{ text: 'Ne, odustani', role: 'cancel' }, {
            text: 'Da, obriši celu listu', role: 'destructive', handler: () => {
              resetList();
            }
          }]} />
        <Catalogue></Catalogue>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
