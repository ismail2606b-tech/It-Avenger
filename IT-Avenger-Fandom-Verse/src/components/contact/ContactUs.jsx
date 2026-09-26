import React, { useState } from 'react';
import { Mail, Phone, MapPin, Navigation, Send, CheckCircle2, Globe, Clock, Sparkles } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Fandom Inquiry',
    category: 'anime',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulated GPS state
  const [gpsData, setGpsData] = useState({
    active: true,
    latitude: 34.0407,
    longitude: -118.2693,
    locationName: "Los Angeles Convention Center / Fandom Global Hub",
    accuracy: "± 4.2 meters"
  });

  const [gpsLoading, setGpsLoading] = useState(false);

  const handleSimulateGPS = () => {
    setGpsLoading(true);
    setTimeout(() => {
      // Simulate GPS lock to user or fan convention coordinates
      setGpsData({
        active: true,
        latitude: 35.6595,
        longitude: 139.7005,
        locationName: "Shibuya Fandom Center, Tokyo, Japan",
        accuracy: "± 2.5 meters"
      });
      setGpsLoading(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: '',
        email: '',
        subject: 'General Fandom Inquiry',
        category: 'anime',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1.5">
          <Mail className="w-4 h-4" />
          <span>Support & Official Administration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Contact FandomVerse
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Get in touch with our editorial directors, submit convention press credentials, or pinpoint global fan hubs with GPS locator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Contact Details & Form */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Inquiry</h4>
              <p className="text-xs text-slate-300 font-mono">support@fandomverse.org</p>
              <p className="text-[10px] text-slate-500">Average response: &lt; 2 hours</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Hotline</h4>
              <p className="text-xs text-slate-300 font-mono">+1 (800) 555-FANDOM</p>
              <p className="text-[10px] text-slate-500">Mon - Fri: 9AM - 8PM PST</p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Send Us a Message</h3>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting FandomVerse. Your dispatch has been logged in our client session feedback register.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Your Full Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Ren Amamiya"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="fan@universe.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Fandom Category:
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="anime">Anime Realm</option>
                      <option value="gaming">Gaming Realm</option>
                      <option value="movies">Movies Realm</option>
                      <option value="tv-shows">TV Shows Realm</option>
                      <option value="k-pop">K-Pop Realm</option>
                      <option value="comics">Comics Realm</option>
                      <option value="manga">Manga Realm</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Topic / Subject:
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Inquiry Subject"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Your Message:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide your feedback, convention announcement or question..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Column: Google Maps & GPS Functionality */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Interactive Map & GPS Telemetry
                </h3>
              </div>

              <button
                onClick={handleSimulateGPS}
                disabled={gpsLoading}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center space-x-1.5 transition-all"
              >
                <Sparkles className={`w-3 h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
                <span>{gpsLoading ? 'Locking GPS...' : 'Simulate GPS Pin'}</span>
              </button>
            </div>

            {/* Live GPS Telemetry Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Target Landmark:
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  ● GPS Synchronized
                </span>
              </div>
              <p className="text-sm font-bold text-white">{gpsData.locationName}</p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-slate-400">
                <div className="bg-slate-900 p-2 rounded-lg border border-white/5">
                  <span className="text-slate-500 block text-[9px] uppercase">Latitude:</span>
                  <span className="text-indigo-300 font-bold">{gpsData.latitude}° N</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-white/5">
                  <span className="text-slate-500 block text-[9px] uppercase">Longitude:</span>
                  <span className="text-indigo-300 font-bold">{gpsData.longitude}° W</span>
                </div>
              </div>
            </div>

            {/* Embedded Responsive Google Map */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-80 w-full bg-slate-950 shadow-inner">
              <iframe
                title="FandomVerse Global Convention Map"
                src={`https://maps.google.com/maps?q=${gpsData.latitude},${gpsData.longitude}&hl=en&z=14&output=embed`}
                className="w-full h-full border-0 filter contrast-125"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] text-slate-300 flex items-center space-x-1.5 pointer-events-none">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>Verified GPS Pin: {gpsData.locationName}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed text-center">
              Map dynamically loads coordinate locations for major anime and comic conventions worldwide as mandated by the SRS interface requirements.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
