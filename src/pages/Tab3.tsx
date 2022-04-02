import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useList } from '../hooks/use-list.hook';
import { arrayToCsv } from '../utilities/array-to-csv';
import './Tab3.css';

const Tab3: React.FC = () => {
  const { list } = useList();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={() => {
          navigator.share({
            files: [
              new File([new Blob([arrayToCsv(list.map(l => [l.value, l.timestamp]))], { type: 'text/csv' })], 'list.csv')
            ]
          });
        }} size='small'>Pošalji</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
