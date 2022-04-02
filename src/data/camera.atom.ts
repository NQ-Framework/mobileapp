import QrScanner from "qr-scanner";
import { atom } from "recoil";
import { localStorageEffect } from "./local-storage.effect";

export const cameraState = atom<QrScanner.Camera | null>({
    key: 'cameraState',
    default: null,
    effects: [
        localStorageEffect<QrScanner.Camera | null>('cameraState')
    ]
});
