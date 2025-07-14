import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HelplineEntry {
  state: string;
  contacts: { number: string; description: string }[];
}

export default function Helpline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const helplineData: HelplineEntry[] = [
    {
      state: "Andaman and Nicobar Islands",
      contacts: [
        { number: "03192-232102", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Andhra Pradesh",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "100", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Arunachal Pradesh",
      contacts: [
        { number: "0360-2214745", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Assam",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Bihar",
      contacts: [
        { number: "0612-2215400", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Chhattisgarh",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Goa",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "0832-2424001", description: "Police Control Room" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Gujarat",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "181", description: "Abhayam Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Haryana",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "100", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Himachal Pradesh",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Jharkhand",
      contacts: [
        { number: "0651-6453840", description: "Women Helpline" },
        { number: "181", description: "One Stop Centre" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Karnataka",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "080-22943225", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Kerala",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Madhya Pradesh",
      contacts: [
        { number: "1090", description: "Women Helpline" },
        { number: "181", description: "One Stop Centre" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Maharashtra",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "022-22633333", description: "Mumbai Police" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Manipur",
      contacts: [
        { number: "0385-2450214", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Meghalaya",
      contacts: [
        { number: "0364-2502098", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Mizoram",
      contacts: [
        { number: "0389-2334682", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Nagaland",
      contacts: [
        { number: "0370-2244320", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Odisha",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "100", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Punjab",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Rajasthan",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Sikkim",
      contacts: [
        { number: "03592-202666", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Tamil Nadu",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "044-28592750", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Telangana",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Tripura",
      contacts: [
        { number: "0381-2324123", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Uttar Pradesh",
      contacts: [
        { number: "1090", description: "Women Power Line" },
        { number: "181", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Uttarakhand",
      contacts: [
        { number: "1090", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "West Bengal",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "100", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Chandigarh",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "0172-2741900", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Dadra and Nagar Haveli and Daman and Diu",
      contacts: [
        { number: "0260-2642106", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Jammu and Kashmir",
      contacts: [
        { number: "0191-2472257", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Ladakh",
      contacts: [
        { number: "01982-255567", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Lakshadweep",
      contacts: [
        { number: "04896-262236", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Puducherry",
      contacts: [
        { number: "0413-2331555", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    }
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 p-8 font-sans">
      <div className="text-center mb-10">
        <div className="mt-4">
          <Link
            to="/"
            className="inline-block bg-white text-emerald-700 border border-emerald-500 px-5 py-2 rounded-full text-sm font-medium shadow hover:bg-emerald-50 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-emerald-800 mb-6 text-center">
          State-Wise Women Helpline Numbers
        </h1>
        <div className="space-y-4 overflow-y-scroll max-h-[70vh] pr-2">
          {helplineData.map((entry, idx) => (
            <div
              key={idx}
              className="border border-emerald-300 rounded-lg transition-all bg-emerald-50 hover:shadow-md"
            >
              <button
                className="w-full text-left text-lg font-semibold text-emerald-800 px-4 py-3 focus:outline-none hover:bg-emerald-100"
                onClick={() => toggleExpand(idx)}
              >
                {entry.state}
              </button>
              {expandedIndex === idx && (
                <ul className="list-disc list-inside text-gray-700 px-6 pb-4 space-y-2">
                  {entry.contacts.map((contact, i) => (
                    <li key={i}>
                      <span className="font-medium">{contact.description}: </span>
                      <a
                        href={`tel:${contact.number.replace(/[^0-9]/g, "")}`}
                        className="text-blue-700 hover:underline"
                      >
                        {contact.number}
                      </a>
                    </li>
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
