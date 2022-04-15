import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { cloudUploadOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useList } from '../hooks/use-list.hook';
import { arrayToCsv } from '../utilities/array-to-csv';
import './Tab3.css';

const Tab3: React.FC = () => {
  const { list, count } = useList();
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);

  const [presentActionSheet] = useIonActionSheet();


  const handleSendButtonClick = () => {

    if (count === 0) {
      setInfoDialogOpen(true);
      return;
    }
    const csvString = arrayToCsv(list.map(l => [l.value, l.timestamp, l.id]));
    const fileName = `${formatDate(lastDate)}-${count}-${formatDate(firstDate)}.csv`;
    const urlEncodeFileName = encodeURIComponent(fileName);


    presentActionSheet({
      header: 'Na koji način želite da pošaljete listu?',
      buttons: [
        {
          text: 'Download CSV',
          handler: () => {
            const a = document.createElement('a');
            a.href = `data:text/csv;charset=utf-8,${csvString}`;
            a.download = fileName;
            a.click();
          }
        },
        {
          text: 'Share',
          handler: () => {
            navigator.share({
              files: [
                new File([new Blob([csvString], { type: 'text/csv' })], fileName)
              ]
            });
          },
        },
        {
          text: 'Clipboard',
          handler: () => {
            navigator.clipboard.writeText(csvString);
          }
        },
        {
          text: 'Email',
          handler: () => {
            window.open(`mailto:?subject=Popis%20Lista%20${urlEncodeFileName}&body=${csvString}`);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
    })


  };


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
        <IonAlert isOpen={infoDialogOpen}
          onDidDismiss={() => { setInfoDialogOpen(false); }}
          header='Nema skeniranih stavki'
          message='Da bi mogli da pošaljete listu, morate da skenirate bar jednu stavku.'
        />
        <div className='container'>
          <IonButton fill='outline' className='upload-button' onClick={() => {
            handleSendButtonClick();
          }} size='small'>
            <IonIcon className='upload-icon' icon={cloudUploadOutline}></IonIcon>
          </IonButton>
          <IonCard style={{ width: '90%' }}>
            <IonCardHeader>
              Lista
            </IonCardHeader>
            <IonCardContent>
              <div className='stat-container'>
                <IonItem>
                  <IonLabel>
                    Broj stavki
                  </IonLabel>
                  <IonNote slot='start'>
                    {count}
                  </IonNote>
                </IonItem>
                {count > 0 && <><IonItem>
                  <IonLabel>
                    Vreme prve stavke
                  </IonLabel>
                  <IonNote slot='start'>
                    {firstDate.toLocaleTimeString()}
                  </IonNote>
                </IonItem>
                  <IonItem>
                    <IonLabel>
                      Vreme poslednje stavke
                    </IonLabel>
                    <IonNote slot='start'>
                      {lastDate.toLocaleTimeString()}
                    </IonNote>
                  </IonItem>
                </>}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};


const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}`;
}

export default Tab3;
