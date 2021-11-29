import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  playing: boolean;
  muted: boolean
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const { src, poster, playing, muted } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current !== null && playing) {
      videoRef.current.play();
    }

    if (videoRef.current !== null && !playing) {
      videoRef.current.pause();
    }

  }, [playing]);

  return (
    <video ref={videoRef} src={src} className="player__video" poster={poster} muted={muted}></video>
  );
}

export default VideoPlayer;
