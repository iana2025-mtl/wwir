export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black text-ghost-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">Thank You!</h1>
        <p className="text-2xl mb-12 text-ghost-white/80">
          May you be clear of scary spirits!
        </p>
        
        {/* Decorative illustration placeholder */}
        <div className="flex justify-center items-center mb-12">
          <div className="relative w-64 h-64">
            {/* Simple illustration using SVG - pot with plants */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pot */}
              <ellipse
                cx="100"
                cy="150"
                rx="50"
                ry="20"
                fill="#8B4513"
                stroke="#654321"
                strokeWidth="2"
              />
              <rect
                x="60"
                y="130"
                width="80"
                height="40"
                fill="#8B4513"
                stroke="#654321"
                strokeWidth="2"
                rx="5"
              />
              
              {/* Plants/Leaves */}
              <path
                d="M 100 130 Q 80 100 70 80 Q 75 70 85 75 Q 90 65 100 70 Q 110 65 115 75 Q 125 70 130 80 Q 120 100 100 130"
                fill="#228B22"
                stroke="#006400"
                strokeWidth="1.5"
              />
              
              {/* Berries */}
              <circle cx="90" cy="90" r="4" fill="#F8F8F8" />
              <circle cx="110" cy="95" r="4" fill="#F8F8F8" />
              <circle cx="95" cy="105" r="4" fill="#F8F8F8" />
              
              {/* Smoke/Wisp effect */}
              <path
                d="M 100 80 Q 95 60 100 50 Q 105 40 100 30"
                stroke="#6E6E6E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 100 75 Q 110 55 115 45 Q 120 35 115 25"
                stroke="#6E6E6E"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="inline-block bg-faded-orange text-black px-6 py-3 rounded-md font-semibold hover:bg-faded-orange/90 transition-colors"
          >
            View All Sightings
          </a>
          <div>
            <a
              href="/post-sighting"
              className="text-faded-orange hover:text-faded-orange/80 underline"
            >
              Post Another Sighting
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

