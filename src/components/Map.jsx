import { useState } from "react";

function Map() {
  const [hoveredState, setHoveredState] = useState(null);

  const states = [
    { name: "Jammu & Kashmir", services: 4, top: "12%", left: "38%" },
    { name: "Punjab", services: 6, top: "25%", left: "38%" },
    { name: "Delhi", services: 5, top: "35%", left: "50%" },
    { name: "Haryana", services: 4, top: "33%", left: "46%" },
    { name: "Rajasthan", services: 7, top: "45%", left: "35%" },
    { name: "Uttar Pradesh", services: 10, top: "40%", left: "55%" },
    { name: "Bihar", services: 6, top: "40%", left: "67%" },
    { name: "West Bengal", services: 8, top: "48%", left: "78%" },
    { name: "Gujarat", services: 7, top: "55%", left: "28%" },
    { name: "Madhya Pradesh", services: 9, top: "52%", left: "50%" },
    { name: "Chhattisgarh", services: 5, top: "55%", left: "62%" },
    { name: "Odisha", services: 6, top: "62%", left: "72%" },
    { name: "Maharashtra", services: 8, top: "65%", left: "40%" },
    { name: "Telangana", services: 5, top: "68%", left: "56%" },
    { name: "Andhra Pradesh", services: 7, top: "75%", left: "62%" },
    { name: "Karnataka", services: 9, top: "78%", left: "45%" },
    { name: "Tamil Nadu", services: 11, top: "90%", left: "52%" },
    { name: "Kerala", services: 6, top: "88%", left: "40%" },
    { name: "Assam", services: 4, top: "40%", left: "90%" },
  ];

  return (
    <div className="relative bg-white p-2 rounded-2xl shadow-md w-[300px] mx-auto">
      <img
        src="map.jpg"
        alt="India Map"
        className="w-full rounded-2xl"
      />

      {states.map((state) => (
        <div
          key={state.name}
          className="absolute w-2 h-2 bg-red-500 rounded-full cursor-pointer hover:scale-125 transition"
          style={{
            top: state.top,
            left: state.left,
          }}
          onMouseEnter={() => setHoveredState(state)}
          onMouseLeave={() => setHoveredState(null)}
        />
      ))}

      {hoveredState && (
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-lg shadow-lg text-xs">
          <p className="font-bold">{hoveredState.name}</p>
          <p>Services: {hoveredState.services}</p>
        </div>
      )}
    </div>
  );
}

export default Map;