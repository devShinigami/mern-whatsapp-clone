import { useStateProvider } from "@/context/StateContext";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";

function CaptureAudio({ hide }) {
  const [{ userInfo, chatUser, socket }, dispatch] = useStateProvider();

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [duration, setDuration] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [renderedAudio, setRenderedAudio] = useState(null);
  const audioRef = useRef(null);
  const waveformRef = useRef(null);
  const mediaRecorderRed = useRef(null);

  const handleStart = () => {
    setDuration(0);
    setPlayTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRed.current = mediaRecorder;
        audioRef.current.srcObject = stream;
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = () => {
          alert("here");
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setAudio(audio);
          waveform.load(audioURL);
        };

        mediaRecorder.start();
      })
      .catch((error) => {
        console.log("error accessing audio", error);
      });
  };

  const handleStop = () => {
    if (mediaRecorderRed.current && isRecording) {
      mediaRecorderRed.current.stop();
      setIsRecording(false);
      waveform.stop();
      const audioChunks = [];
      mediaRecorderRed.current.addEventListener("dataavailable", (e) => {
        audioChunks.push(e.data);
      });
      mediaRecorderRed.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");

        setRenderedAudio(audioFile);
      });
    }
  };

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveform(wavesurfer);
    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });
    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => {
          setTotalDuration(prev + 1);
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    if (audio) {
      const updatePlayback = () => {
        setPlayTime(audio.currentTime);
      };
      audio.addEventListener("timeupdate", updatePlayback);
      return () => {
        audio.removeEventListener("timeupdate", updatePlayback);
      };
    }
  }, [audio]);

  useEffect(() => {
    if (waveform) handleStart();
  }, [waveform]);

  const sendRecording = async () => {};

  const handlePlay = () => {
    if (audio) {
      waveform.stop();
      waveform.play();
      audio.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    audio?.pause();
    waveform.stop();
    console.log(audio);
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="flex text-2xl w-full justify-end items-center ">
      <div className="pt-1">
        <FaTrash className="text-white cursor-pointer" onClick={() => hide()} />
      </div>
      <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center drop-shadow-lg rounded-full bg-search-input-container-background">
        {isRecording ? (
          <div className="text-red-500 animate-pulse w-60 text-center">
            <span>Recording</span>
            <span>{duration}s</span>
          </div>
        ) : (
          <div>
            {audio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={handlePlay} />
                ) : (
                  <FaStop onClick={handleStop} />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" ref={waveformRef} hidden={isRecording} />
        {audio && isPlaying && <span>{formatTime(playTime)}</span>}
        {audio && !isPlaying && <span>{formatTime(totalDuration)}</span>}
        <audio ref={audioRef} hidden />
      </div>
      <div className="mr-4">
        {!isRecording ? (
          <FaMicrophone className="text-red-500" onClick={handleStart} />
        ) : (
          <FaPauseCircle onClick={handlePause} className="text-red-500" />
        )}
      </div>
      <div>
        <MdSend
          className="text-white cursor-pointer mr-4 "
          title="send"
          onClick={sendRecording}
        />
      </div>
    </div>
  );
}

export default CaptureAudio;
