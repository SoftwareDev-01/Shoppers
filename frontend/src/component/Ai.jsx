import React, { useContext, useEffect, useRef } from "react";
import ai from "../assets/ai.png";
import clickSound from "../assets/start-listening.mp3"; // optional click sound
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  // Play click sound feedback
  const playClickSound = () => {
    if (!clickSound) return;
    const audio = new Audio(clickSound);
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  };

  // Speak function with canceling previous utterance
  const speak = (message) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  // Normalize transcript: lowercase, trim, remove punctuation
  const normalizeTranscript = (text) =>
    text.toLowerCase().trim().replace(/[^\w\s]/gi, "");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      let transcript = e.results[0][0].transcript;
      transcript = normalizeTranscript(transcript);
      console.log("Transcript:", transcript);

      // Command list with matching type
      const commands = [
        {
          keywords: ["search", "open"],
          matchType: "all",
          action: () => {
            if (!showSearch) {
              speak("Opening search");
              setShowSearch(true);
              navigate("/collection");
            } else {
              speak("Search is already open");
              toast.info("Search is already open.");
            }
          },
        },
        {
          keywords: ["search", "close"],
          matchType: "all",
          action: () => {
            if (showSearch) {
              speak("Closing search");
              setShowSearch(false);
            } else {
              speak("Search is already closed");
              toast.info("Search is already closed.");
            }
          },
        },
        {
          keywords: [
            "collection",
            "collections",
            "product",
            "products",
            "open collection",
            "open collections",
          ],
          matchType: "any",
          action: () => {
            speak("Opening collection page");
            navigate("/collection");
          },
        },
        {
          keywords: ["about", "about page", "aboutpage"],
          matchType: "any",
          action: () => {
            speak("Opening about page");
            navigate("/about");
          },
        },
        {
          keywords: ["home", "homepage", "home page"],
          matchType: "any",
          action: () => {
            speak("Opening home page");
            navigate("/");
            setShowSearch(false);
          },
        },
        {
          keywords: [
            "cart",
            "kaat",
            "caat",
            "open cart",
            "my cart",
            "go to cart",
            "open the cart",
          ],
          matchType: "any",
          action: () => {
            speak("Opening cart page");
            navigate("/cart");
            setShowSearch(false);
          },
        },
        {
          keywords: ["contact", "contact page", "open contact"],
          matchType: "any",
          action: () => {
            speak("Opening contact page");
            navigate("/contact");
            setShowSearch(false);
          },
        },
        {
          keywords: [
            "order",
            "orders",
            "my orders",
            "my order",
            "open order",
            "open orders",
          ],
          matchType: "any",
          action: () => {
            speak("Opening order page");
            navigate("/order");
            setShowSearch(false);
          },
        },
      ];

      // Match logic: all keywords must be present if matchType === "all",
      // else any keyword matches
      const matchedCommand = commands.find((cmd) => {
        if (cmd.matchType === "all") {
          return cmd.keywords.every((keyword) => transcript.includes(keyword));
        } else {
          return cmd.keywords.some((keyword) => transcript.includes(keyword));
        }
      });

      console.log("Matched command:", matchedCommand);

      if (matchedCommand) {
        matchedCommand.action();
      } else {
        speak("Sorry, I did not understand that command.");
        toast.error("Command not recognized. Please try again.");
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      if (e.error === "no-speech") {
        toast.warn("No speech detected. Please try again.");
      } else {
        toast.error("Speech recognition error: " + e.error);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      recognitionRef.current = null;
    };
  }, [navigate, setShowSearch, showSearch]);

  const startRecognition = () => {
    playClickSound();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop(); // stop ongoing recognition to avoid errors
      } catch {}
      try {
        recognitionRef.current.start();
        console.log("Speech recognition started");
      } catch (err) {
        console.warn("Recognition start error:", err);
      }
    } else {
      toast.error("Speech recognition is not available.");
    }
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startRecognition}
      style={{ userSelect: "none" }}
      title="Click and say a command"
    >
      <img src={ai} alt="AI Assistant" className="w-[100px] cursor-pointer" />
    </div>
  );
}

export default Ai;
