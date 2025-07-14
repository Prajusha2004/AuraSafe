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
      state: "Andhra Pradesh",
      contacts: [
        { number: "181", description: "24x7 Women Helpline" },
        { number: "0863-2329090", description: "State Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Arunachal Pradesh",
      contacts: [
        { number: "0360-2214745", description: "Women Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Assam",
      contacts: [
        { number: "181", description: "24x7 Women Helpline" },
        { number: "0361-2600060", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Bihar",
      contacts: [
        { number: "181", description: "24x7 Women Helpline" },
        { number: "0612-2507870", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Chhattisgarh",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "0771-2511515", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Goa",
      contacts: [
        { number: "1091", description: "Police Helpline" },
        { number: "0832-2425100", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Gujarat",
      contacts: [
        { number: "1091", description: "Police Helpline" },
        { number: "079-23251604", description: "State Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Haryana",
      contacts: [
        { number: "1091", description: "Police Helpline" },
        { number: "0172-2587900", description: "State Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Himachal Pradesh",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "0177-2626487", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Jharkhand",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "0651-2446075", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Karnataka",
      contacts: [
        { number: "080-22943225", description: "Women Helpline" },
        { number: "080-22392223", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Kerala",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "0471-2338100", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Madhya Pradesh",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "0755-2550900", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Maharashtra",
      contacts: [
        { number: "18002000445", description: "Women Helpline" },
        { number: "022-22621855", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Manipur",
      contacts: [
        { number: "0385-2450008", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Meghalaya",
      contacts: [
        { number: "0364-2503661", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Mizoram",
      contacts: [
        { number: "0389-2336848", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Nagaland",
      contacts: [
        { number: "0370-2244326", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Odisha",
      contacts: [
        { number: "181", description: "Women Helpline" },
        { number: "0674-2598200", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Punjab",
      contacts: [
        { number: "1091", description: "Police Helpline" },
        { number: "0172-2740678", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Rajasthan",
      contacts: [
        { number: "1091", description: "Women Helpline" },
        { number: "0141-2740637", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Sikkim",
      contacts: [
        { number: "03592-202890", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Tamil Nadu",
      contacts: [
        { number: "1091", description: "Police Helpline" },
        { number: "044-28270194", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Telangana",
      contacts: [
        { number: "040-27853508", description: "Women Helpline" },
        { number: "1091", description: "Police Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Tripura",
      contacts: [
        { number: "0381-2323423", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Uttar Pradesh",
      contacts: [
        { number: "1090", description: "Women Helpline" },
        { number: "0522-2617924", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Uttarakhand",
      contacts: [
        { number: "0135-2700969", description: "Women Helpline" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "West Bengal",
      contacts: [
        { number: "1091", description: "Police Helpline" },
        { number: "033-23345255", description: "Women Commission" },
        { number: "112", description: "Emergency Number" },
      ],
    },
    {
      state: "Delhi",
      contacts: [
        { number: "011-23379181", description: "Delhi Commission for Women" },
        { number: "011-24673366", description: "Women Protection Cell" },
        { number: "10920", description: "Shakti Shalini NGO" },
        { number: "112", description: "Emergency Number" },
      ],
    },
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 p-8 font-sans">
      <div className="text-center mb-10">
        <div className="mt-4">
          <Link
            to="/"
            className="inline-block bg-white text-red-700 border border-red-500 px-5 py-2 rounded-full text-sm font-medium shadow hover:bg-red-100 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-red-800 mb-6 text-center">
          State-Wise Women Helpline Numbers
        </h1>
        <div className="space-y-4 overflow-y-scroll max-h-[70vh] pr-2">
          {helplineData.map((entry, idx) => (
            <div
              key={idx}
              className="border border-red-300 rounded-lg transition-all bg-red-50 hover:shadow-md"
            >
              <button
                className="w-full text-left text-lg font-semibold text-red-800 px-4 py-3 focus:outline-none hover:bg-red-100"
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
