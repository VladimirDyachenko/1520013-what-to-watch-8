import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchFilmDetails } from '../../../store/api-action';
import { getFilmDetails } from '../../../store/data-process/selector';
import { getPlayerTimeLeft } from '../../../utils/functions';
import Loader from '../../loader/loader';
import VideoPlayer from '../../video-player/video-player';

type RouteParams = {
  id: string;
}

function PlayerPage(): JSX.Element {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();
  const film = useSelector(getFilmDetails);

  useEffect(() => {
    if (film === undefined) {
      dispatch(fetchFilmDetails(params.id));
    }
  });

  useEffect(() => {
    dispatch(fetchFilmDetails(params.id));
  }, [dispatch, params.id]);

  const playerRef = useRef<HTMLDivElement>(null);
  const handleGoBackClick = () => history.goBack();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInFullscreen, setIsInFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const handleFullscreenClick = () => {
    if (isInFullscreen) {
      document.exitFullscreen()
        .then(() => setIsInFullscreen(false))
        .catch();
      return;
    }
    playerRef.current?.requestFullscreen()
      .then(() => setIsInFullscreen(true))
      .catch();
  };

  const handleTimeUpdate = useCallback((currentVideoTime: number, videoDuration: number) => {
    if (isNaN(currentVideoTime) || isNaN(videoDuration)) {
      currentVideoTime = 0;
      videoDuration = 0;
    }

    setCurrentTime(Math.round(currentVideoTime));
    setDuration(Math.ceil(videoDuration));

    const progress = Math.round(currentVideoTime) / Math.ceil(videoDuration) * 100;
    isNaN(progress) ? setPlaybackProgress(0) : setPlaybackProgress(progress);
  }, []);

  if (film === undefined) {
    return (
      <div style={{minHeight: '100vh', display: 'flex'}}>
        <Loader/>
      </div>
    );
  }

  return (
    <div className="player" ref={playerRef}>
      <VideoPlayer
        src={film.videoLink}
        poster={film.backgroundImage}
        playing={isPlaying}
        muted={false}
        onTimeUpdate={handleTimeUpdate}
      />

      <button
        type="button"
        className="player__exit"
        onClick={handleGoBackClick}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playbackProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${playbackProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getPlayerTimeLeft(duration, currentTime)}</div>
        </div>

        <div className="player__controls-row">

          <button type="button" className="player__play" onClick={() => setIsPlaying((state) => !state)}>
            {isPlaying ?
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
              :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>}
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullscreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
