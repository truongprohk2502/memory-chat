import { useEffect, useState } from 'react';
import Peer, { SfuRoom } from 'skyway-js';
import { getMediaStreamFromTracks } from 'utils/getMediaData';

interface IProps {
  canJoinRoom: boolean;
  highFrameRate: boolean;
  cameraOn: boolean;
  roomName: string;
  videoStreamTrack: MediaStreamTrack;
  canvasStreamTrack: MediaStreamTrack;
  audioStreamTrack: MediaStreamTrack;
}

interface IReturnType {
  remoteStream: MediaStream;
  remoteCameraOn: boolean;
}

export const useSkyway = ({
  canJoinRoom,
  highFrameRate,
  cameraOn,
  roomName,
  videoStreamTrack,
  canvasStreamTrack,
  audioStreamTrack,
}: IProps): IReturnType => {
  const [skywayPeer, setSkywayPeer] = useState<Peer>(null);
  const [skywayRoom, setSkywayRoom] = useState<SfuRoom>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>(null);
  const [remoteCameraOn, setRemoteCameraOn] = useState<boolean>(false);

  useEffect(() => {
    const peer = new Peer({ key: process.env.REACT_APP_SKYWAY_API_KEY });
    setSkywayPeer(peer);

    return () => {
      peer.destroy();
    };
  }, []);

  useEffect(() => {
    if (skywayPeer && canJoinRoom) {
      const room = skywayPeer.joinRoom(roomName, {
        mode: 'sfu',
        stream: getMediaStreamFromTracks(
          highFrameRate ? videoStreamTrack : canvasStreamTrack,
          audioStreamTrack,
        ),
      });

      room.on('stream', async stream => {
        setRemoteStream(stream);
      });

      room.on('data', data => {
        const { cameraOn } = data.data;
        cameraOn !== undefined && setRemoteCameraOn(cameraOn);
      });

      room.on('peerLeave', () => {
        setRemoteStream(null);
      });

      room.on('close', () => {
        setSkywayRoom(null);
        setRemoteStream(null);
      });

      setSkywayRoom(room);
    }
  }, [
    canJoinRoom,
    roomName,
    highFrameRate,
    videoStreamTrack,
    canvasStreamTrack,
    audioStreamTrack,
    skywayPeer,
  ]);

  useEffect(() => {
    if (skywayRoom && !canJoinRoom) {
      skywayRoom.close();
    }
  }, [canJoinRoom, skywayRoom]);

  useEffect(() => {
    if (skywayRoom) {
      skywayRoom.replaceStream(
        getMediaStreamFromTracks(
          highFrameRate ? videoStreamTrack : canvasStreamTrack,
          audioStreamTrack,
        ),
      );
    }
  }, [
    skywayRoom,
    highFrameRate,
    canvasStreamTrack,
    videoStreamTrack,
    audioStreamTrack,
  ]);

  useEffect(() => {
    if (skywayRoom && remoteStream) {
      skywayRoom.send({ cameraOn });
    }
  }, [skywayRoom, remoteStream, cameraOn]);

  return {
    remoteStream,
    remoteCameraOn,
  };
};
