import { useRecoilState } from "recoil"
import { cameraState } from "../data/camera.atom";

export const useResetCamera: () => [() => void, boolean] = () => {
    const [camera, setCamera] = useRecoilState(cameraState);
    return [(): void => {
        setCamera(null);
    }, !!camera];
}