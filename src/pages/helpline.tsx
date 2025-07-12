import React, { useState } from "react";

interface HelplineEntry {
  state: string;
  contacts: string[];
}

export default function Helpline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
    {
      state: "Maharashtra",
      contacts: [
        "Mumbai Women Police Station: 022-22621855",
        "State Commission for Women: 022-22031152",
        "Aastha Parivaar Helpline: 18002000445",
        "Navi Mumbai Women Police Station: 022-27572229"
      ]
    },
    {
      state: "Tamil Nadu",
      contacts: [
        "Chennai Women Helpline: 1091",
        "Women Help Desk (Police): 044-23452365",
        "Tamil Nadu State Commission for Women: 044-28270194"
      ]
    },
    {
      state: "Karnataka",
      contacts: [
        "Bangalore Women Police Station: 080-22943225",
        "Karnataka State Commission for Women: 080-22392223",
        "Vanitha Sahayavani Helpline: 080-22943225"
      ]
    },
    {
      state: "West Bengal",
      contacts: [
        "Kolkata Women Police: 033-22143230",
        "West Bengal Commission for Women: 033-23345255",
        "Kolkata Helpline: 1091 / 100"
      ]
    },
    {
      state: "Rajasthan",
      contacts: [
        "Jaipur Women Police Station: 0141-2560197",
        "Rajasthan State Women Commission: 0141-2740637",
        "Emergency Helpline: 1091"
      ]
    },
    {
      state: "Uttar Pradesh",
      contacts: [
        "Women Power Line: 1090",
        "Lucknow Women Police Station: 0522-2617924",
        "State Women Commission: 0522-2236496"
      ]
    },
    {
      state: "Kerala",
      contacts: [
        "Thiruvananthapuram Women Police Station: 0471-2338100",
        "Vanitha Cell: 0471-2444444",
        "State Women Commission: 0471-2322590"
      ]
    },
    {
      state: "Jharkhand",
      contacts: [
        "Ranchi Women Police Station: 0651-2214007",
        "State Women Commission: 0651-2446075",
        "Women Helpline: 181"
      ]
    },
    {
      state: "Bihar",
      contacts: [
        "Patna Women Police Station: 0612-2201977",
        "State Women Commission: 0612-2507870",
        "Women Helpline: 181"
      ]
    }
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 p-8 font-sans">
      <div className="text-center mb-10">
        <button className="bg-pink-600 text-white px-8 py-3 rounded-full text-2xl font-semibold shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-110">
          📞 Women Helpline
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-pink-800 mb-6 text-center">State-Wise Women Helpline Numbers</h1>
        <div className="space-y-4 overflow-y-scroll max-h-[70vh] pr-2">
          {helplineData.map((entry, idx) => (
            <div key={idx} className="border border-pink-300 rounded-lg transition-all bg-pink-50 hover:shadow-md">
              <button
                className="w-full text-left text-lg font-semibold text-pink-800 px-4 py-3 focus:outline-none hover:bg-pink-100"
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
    </div>
  );
}
