import QrScanner from 'qr-scanner';
import { useEffect, useState } from "react";
export function useCameras(): QrScanner.Camera[] {
    const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);

    useEffect(() => {
        QrScanner.listCameras(true).then(setCameras);
    }, [setCameras]);
    return cameras;
}