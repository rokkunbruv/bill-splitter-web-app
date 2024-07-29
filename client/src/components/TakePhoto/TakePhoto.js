import React, { useRef, useEffect, useState} from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TakePhoto = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        
        // Here you would typically send this image data to your server or store it
        console.log("Captured photo:", imageDataUrl);

        // Navigate back to add receipt page with the image data
        navigate('/add-receipt', { state: { imageData: imageDataUrl } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '500px' }} />
            <Button variant="contained" color="primary" onClick={capturePhoto} sx={{ mt: 2 }}>
                Capture Photo
            </Button>
        </Box>
    );
};

export default TakePhoto;