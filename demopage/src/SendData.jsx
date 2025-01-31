import { useState, useEffect, useRef } from 'react';
import './SendData.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const EmotionAnalysisTool = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [emotion, setEmotion] = useState('no-emotions');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      streamRef.current = stream;
      console.log('Webcam started');
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setResponseMessage("Failed to access webcam");
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsCapturing(false);
    setCapturedImage(null);
    console.log('Webcam stopped and capturing process killed');
  };

  const captureAndSendImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      imageCapture
        .grabFrame()
        .then((imageBitmap) => {
          const width = imageBitmap.width;
          const height = imageBitmap.height;
          canvas.width = width;
          canvas.height = height;

          context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);

          axios
            .post('http://localhost:5000/upload-image', {
              image: imageData.split(',')[1],
            })
            .then((response) => {
              setResponseMessage(response.data.message);
              setEmotion(response.data.result);
            })
            .catch((error) => {
              setResponseMessage("Error uploading image");
              console.error("Error:", error);
            });
        })
        .catch((error) => {
          console.error("Error capturing frame:", error);
          setResponseMessage("Error capturing frame");
        });
    }
  };

  const startCapturing = () => {
    if (!isCapturing) {
      startWebcam();
      intervalRef.current = setInterval(captureAndSendImage, 3000);
      setIsCapturing(true);
      console.log('Capturing started');
    }
  };

  const stopCapturing = () => {
    stopWebcam();
    console.log('Capturing process stopped');
    setResponseMessage('Capturing stopped');
  };

  useEffect(() => {
    startWebcam();
    return () => stopWebcam();
  }, []);

  return (
    <div className="Whole-Component">
        <div className="main">
            <Card sx={{}} className='cardhere'>
            <CardActionArea>
              {capturedImage ? (
                    <CardMedia
                    component="img"
                    height="480"
                    width="540"
                    image={capturedImage}
                  />
              ) : (
                    <CardMedia
                      component="img"
                      height="480"
                      width="540"
                      image="/sample.webp"
                    />
              )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    YOUR IMAGE HERE
                  </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
          <div className="mt-6 flex gap-6">
            <button
              onClick={startCapturing}
              className="start-capture"
              disabled={isCapturing}
            >
              Start Capturing
            </button>
            <button
              onClick={stopCapturing}
              className="stop-capture"
            >
              Stop Capturing
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="result">
              Current Emotion: <span className="display-emotion">{emotion}</span>
            </p>
            <p className="response">{responseMessage}</p>
          </div>
        </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480}></canvas>
    </div>
  );
};

export default EmotionAnalysisTool;
