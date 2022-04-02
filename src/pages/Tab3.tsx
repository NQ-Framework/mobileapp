import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloudUploadOutline } from 'ionicons/icons';
import { useList } from '../hooks/use-list.hook';
import { arrayToCsv } from '../utilities/array-to-csv';
import './Tab3.css';

const Tab3: React.FC = () => {
  const { list, count } = useList();

  let firstDate = new Date();
  let lastDate = new Date(0);
  list.forEach(item => {
    if (item.timestamp) {
      const date = new Date(item.timestamp);
      if (date > lastDate) {
        lastDate = date;
      }
      if (date < firstDate) {
        firstDate = date;
      }
    }
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Slanje</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='container'>
          <IonButton fill='outline' className='upload-button' onClick={() => {
            navigator.share({
              files: [
                new File([new Blob([arrayToCsv(list.map(l => [l.value, l.timestamp, l.id]))], { type: 'text/csv' })], 'list.csv')
              ]
            });
          }} size='small'>
            <IonIcon className='upload-icon' icon={cloudUploadOutline}></IonIcon>
          </IonButton>
          <IonCard style={{ width: '90%' }}>
            <IonCardHeader>
              Lista
            </IonCardHeader>
            <IonCardContent>
              <div className='stat-container'>
                <IonLabel>
                  Broj skeniranih stavki: {count}
                </IonLabel>
                {/* <IonLabel>
                  Datum prve stavke: {firstDate.toTimeString()}
                </IonLabel>
                <IonLabel>
                  Datum poslednje stavke: {lastDate.toTimeString()}
                </IonLabel> */}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
