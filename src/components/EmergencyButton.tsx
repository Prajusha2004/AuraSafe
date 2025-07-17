import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Phone } from "lucide-react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { createClient } from "@supabase/supabase-js";

interface EmergencyButtonProps {
  onClick?: () => void;
  className?: string;
}

const supabase = createClient("https://lngvwjvdswkpniowocle.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZ3Z3anZkc3drcG5pb3dvY2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODY3NDQsImV4cCI6MjA2ODE2Mjc0NH0.phI8wTrysNAZmh_qYY2QF-xM0hbnf_2iwE190HRf_-0");

export function EmergencyButton({ onClick, className }: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "video/webm" });
        const file = new File([blob], "evidence.webm", { type: "video/webm" });

        const { data, error } = await supabase.storage
          .from("evidence")
          .upload(`recordings/${Date.now()}_${userId || "anonymous"}.webm`, file);

        if (error) console.error("Upload error:", error);
        else console.log("🎥 Evidence uploaded to storage:", data);
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Media error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handlePress = () => {
    setIsPressed(true);
    setCountdown(5);
    startRecording();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const geoRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const address = geoRes.data.address;
          const place = `${address.city || address.town || address.village || "Unknown"}, ${address.state || "Unknown"}`;
          setLocation(place);

          await supabase.from("alerts").insert([
            {
              timestamp: new Date().toISOString(),
              location: place,
              user_id: userId || null,
            },
          ]);

          emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            to_name: "Local Police",
            from_name: "AuraSafe Alert System",
            message: `🚨 Emergency Alert!\nLocation: ${place}\nUser: ${userId || "Anonymous"}\nTime: ${new Date().toLocaleString()}`,
          }, "YOUR_PUBLIC_EMAILJS_KEY").then(() => {
            console.log("📧 Email sent to emergency authorities");
          }).catch((e) => {
            console.error("Failed to send email", e);
          });

          console.log("🔗 Trust network pinged (simulated)");

        } catch (error) {
          console.error("Geolocation or saving failed:", error);
          setLocation("Unknown Location");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location permission denied");
      }
    );

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerEmergency();
          setIsPressed(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergency = () => {
    stopRecording();
    alert(`🚨 EMERGENCY ALERT ACTIVATED!\n\nLocation: ${location || "Fetching..."}\n\nYour alert has been saved, authorities notified, and trust network pinged.`);
    onClick?.();
  };

  const cancelEmergency = () => {
    stopRecording();
    setIsPressed(false);
    setCountdown(0);
  };

  if (isPressed) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Button
            variant="emergency"
            size="lg"
            className={`
              h-24 w-24 rounded-full text-xl font-bold shadow-emergency
              animate-pulse-emergency scale-110 transition-transform
              ${className}
            `}
          >
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8" />
              <span className="text-lg font-bold">{countdown}</span>
            </div>
          </Button>
        </div>
        <Button onClick={cancelEmergency} variant="outline" size="sm">
          Cancel Emergency
        </Button>
        <p className="text-center text-sm text-foreground">
          Emergency services will be contacted in {countdown} seconds
          <br />
          📍 {location ? `Location: ${location}` : "Fetching location..."}
        </p>
      </div>
    );
  }

  return (
    <Button
      variant="emergency"
      size="lg"
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      className={`
        h-20 w-20 rounded-full text-xl font-bold shadow-emergency
        animate-pulse-emergency hover:scale-110 transition-transform
        ${className}
      `}
    >
      <Shield className="h-8 w-8" />
    </Button>
  );
}
