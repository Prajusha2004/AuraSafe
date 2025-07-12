import React, { useEffect, useRef, useState } from "react";
import Link from "next";

interface HelplineEntry {
  state: string;
  contacts: string[];
}

export default function Helpline() {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eye = eyeRef.current;
      if (!eye) return;
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const angle = Math.atan2(dy, dx);
      const radius = 5;
      setEyePos({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const helplineData: HelplineEntry[] = [
    {
      state: "Delhi",
      contacts: [
        "Delhi Commission for Women: 011-23379181",
        "Delhi Women Protection Cell: 011-24673366 / 4156 / 7699",
        "Shakti Shalini (NGO): 011-24373737, 011-24373736, 10920",
        "Sakshi - Violence Intervention Center: (0124) 2562336 / 5018873"
      ]
    },
    {
      state: "Andhra Pradesh",
      contacts: [
        "Hyderabad/Secundrabad Police station: 040-27853508",
        "Women Protection Cell: 040-23320539",
        "Women Commission: 0863-2329090",
        "Hyderabad Women Police Station: 040-27852400 / 4852"
      ]
    },
    // Add more entries as needed with proper types
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 p-8 font-sans">
      <div className="mb-12 text-center relative">
        <div className="inline-block relative group">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-full text-xl shadow-lg hover:bg-pink-700 transition-all relative z-10">
            📞 Women Helpline
          </button>

          <div className="absolute -top-40 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-0">
            <div className="relative w-28 h-40">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-28 bg-pink-700 rounded-t-full z-0"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-pink-300 rounded-full shadow-md z-10 flex justify-center items-start pt-8">
                <div className="relative flex gap-6">
                  <div className="w-5 h-5 bg-white rounded-full overflow-hidden" ref={eyeRef}>
                    <div
                      className="w-2 h-2 bg-black rounded-full"
                      style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                    ></div>
                  </div>
                  <div className="w-5 h-5 bg-white rounded-full overflow-hidden">
                    <div
                      className="w-2 h-2 bg-black rounded-full"
                      style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                ref={handRef}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-white rounded-full origin-bottom animate-waving-hand z-20 border border-gray-300"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-pink-800 mb-6">State-Wise Women Helpline Numbers</h1>
        <div className="space-y-4 overflow-y-scroll max-h-[70vh] pr-2">
          {helplineData.map((entry, idx) => (
            <div key={idx} className="border border-pink-300 rounded-lg transition-all">
              <button
                className="w-full text-left text-lg font-semibold text-pink-700 px-4 py-2 focus:outline-none hover:bg-pink-50"
                onClick={() => toggleExpand(idx)}
              >
                {entry.state}
              </button>
              {expandedIndex === idx && (
                <ul className="list-disc list-inside text-gray-700 px-6 pb-4">
                  {entry.contacts.map((contact, i) => (
                    <li key={i}>{contact}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(15deg); }
          80% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-waving-hand {
          animation: wave 1.5s infinite;
        }
      `}</style>
    </div>
  );
}