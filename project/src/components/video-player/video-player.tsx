import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  playing: boolean;
  muted: boolean;
  onTimeUpdate?: (seconds: number, totalDuration: number) => void;
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const { src, poster, playing, muted, onTimeUpdate } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current !== null && playing) {
      videoRef.current.play();
    }

    if (videoRef.current !== null && !playing) {
      videoRef.current.pause();
    }

  }, [playing]);

  useEffect(() => {
    if (onTimeUpdate !== undefined && videoRef.current !== null) {
      const videoElement = videoRef.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleTimeUpdate = (event: any) => onTimeUpdate(event.target.currentTime, event.target.duration);

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [onTimeUpdate]);

  return (
    <video ref={videoRef} src={src} className="player__video" poster={poster} muted={muted}></video>
  );
}

export default VideoPlayer;
