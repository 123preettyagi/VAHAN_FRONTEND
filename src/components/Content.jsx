function Content() {
  return (
    <div className="w-2/4 rounded-3xl overflow-hidden shadow-xl relative">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1581090700227-1e8b9b0a4b8f"
        alt="bg"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute w-full h-full bg-gradient-to-r from-teal-800/90 to-blue-900/80"></div>

      {/* Content */}
      <div className="relative p-8 text-white">
        
        {/* Heading Box */}
        <div className="bg-white text-red-600 font-bold text-lg px-6 py-3 inline-block mb-6 shadow">
          Beware of Fraudulent Websites and Apps
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed max-w-xl">
          Vehicle, Driving License, and eChallan related services can only be
          availed through the official platforms
          <span className="font-semibold">
            {" "}www.parivahan.gov.in{" "}
          </span>
          and Nextgen mParivahan mobile App of the Ministry of Road Transport and Highways.
        </p>

        {/* Do's */}
        <div className="mt-6">
          <span className="bg-green-500 text-white px-3 py-1 rounded font-semibold">
            Do's
          </span>
          <p className="mt-2 text-sm">
            Always use only the official website and mobile apps of the Ministry
          </p>
        </div>

        {/* Don'ts */}
        <div className="mt-4">
          <span className="bg-red-500 text-white px-3 py-1 rounded font-semibold">
            Don't
          </span>
          <p className="mt-2 text-sm">
            Do not click on suspicious links or use unknown apps.
          </p>
        </div>

        {/* Store Buttons */}
        <div className="flex gap-6 mt-8">
          
          {/* Google Play */}
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              className="h-10"
            />
            <p className="text-xs mt-1 underline">
              play.google.com/store/apps
            </p>
          </div>

          {/* App Store */}
          <div>
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              className="h-10"
            />
            <p className="text-xs mt-1 underline">
              apps.apple.com
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Content;