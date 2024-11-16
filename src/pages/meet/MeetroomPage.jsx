import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { SOCKET_URL } from "../../api/config.js";
import VideoCard from "../../components/VideoCard.jsx";
import { useUser } from "../../contexts/UserContext.jsx";
import Peer from 'simple-peer';

export const MeetroomPage = () => {
  const { user } = useUser();
  const { meetroomId } = useParams();
  const [videoDevices, setVideoDevices] = useState([]);
  const userVideoRef = useRef();
  const userStream = useRef();
  const [peers, setPeers] = useState([]);

  const token = localStorage.getItem("MEET_ACCESS_TOKEN");
  if (!token) {
    console.error("[ChatPage] Access Token이 없습니다.");
    navigate("/login");
    return;
  }

  const socket = io(SOCKET_URL, {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (!user.user_id) return;

    // Get Video Devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(filtered);
    });
  
    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        socket.emit('BE-join-room', { meetroomId });
        // 다른 유저가 이 방에 접속
        socket.on('FE-user-join', (users) => {
          console.log("FE-user-join", users, "my socket id", socket.id);
          const peers = [];
          users.forEach(({ userSocketId, info }) => {
            let { userId, video, audio } = info;

            // 나와 socketId가 다른 상대방인 경우에만 적용
            if (userSocketId !== socket.id) {
              // socketId를 기준으로 상대방 peer를 찾기
              const peer = createPeer(userSocketId, socket.id, stream);

              peer.peerID = userSocketId;

              peersRef.current.push({
                peerID: userSocketId,
                peer,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userSocketId]: { video, audio },
                };
              });
            }
          });

          setPeers(peers);
        });
    });
  }, [user]);

  function createPeer(userSocketId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-call-user', {
        userToCall: userSocketId,
        from: caller,
        signal,
      });
    });
    peer.on('disconnect', () => {
      peer.destroy();
    });

    return peer;
  }

  function createUserVideo(peer, index, arr) {
    return (
      <VideoCard key={index} peer={peer} number={arr.length} />
    );
  }

  return (
    <div>
      <video
        ref={userVideoRef}
        muted
        autoPlay
        playInline
      ></video>
      {peers &&
            peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
    </div>
  );
};
