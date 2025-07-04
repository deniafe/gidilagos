'use client'
import { useState, useEffect } from "react";
// Temporary lockout component

const LockoutScreen = () => {
  const [progress, setProgress] = useState(90);

  // Function to update progress by 1% every 2 hours
  // const updateProgress = () => {
  //   setProgress(prev => {
  //     const newProgress = Math.min(prev + 1, 100);
  //     return newProgress;
  //   });
  // };

  // useEffect(() => {
  //   // Set up interval for 2 hours (2 * 60 * 60 * 1000 milliseconds)
  //   const interval = setInterval(updateProgress, 2 * 60 * 60 * 1000);

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  // Get progress message based on current progress
  const getProgressMessage = (progress: number) => {
    if (progress < 10) return "Booting up core systems...";
    if (progress < 20) return "Connecting neural networks and preparing workspace...";
    if (progress < 30) return "Loading foundation modules...";
    if (progress < 40) return "Initializing AI agent protocols...";
    if (progress < 50) return "Establishing quantum communication channels...";
    if (progress < 60) return "Synchronizing distributed intelligence nodes...";
    if (progress < 70) return "Calibrating intelligent systems...";
    if (progress < 80) return "Optimizing neural pathways and memory banks...";
    if (progress < 90) return "Finalizing workspace configuration...";
    if (progress < 100) return "Almost ready to launch...";
    return "System initialization complete!";
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[hsl(179,49.4%,8%)] via-[hsl(193,52%,20%)] to-[hsl(179,49.4%,2.88%)] flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[hsl(179,76%,36%)]/15 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-[hsl(193,52%,40%)]/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[hsl(179,76%,36%)]/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-[hsl(193,52%,40%)]/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        
        {/* Spinning shapes */}
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-[hsl(179,7.6%,96.8%)]/20 rotate-45 animate-spin" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/2 w-8 h-8 bg-[hsl(179,76%,36%)]/25 rotate-45 animate-spin" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        {/* Main loading animation */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border-8 border-[hsl(179,7.6%,96.8%)]/30 border-t-[hsl(179,76%,36%)] rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-[hsl(193,52%,40%)]/15 rounded-full animate-pulse"></div>
            {/* Center dot */}
            <div className="absolute inset-1/2 w-4 h-4 -ml-2 -mt-2 bg-[hsl(179,76%,36%)] rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Text content */}
        {/* Brand name */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-medium text-[hsl(179,76%,36%)] tracking-wider">
            GIDIOPOLIS
          </h2>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[hsl(179,7.6%,96.8%)] mb-6 animate-pulse">
          Initializing AI Agents
        </h1>
        
        <p className="text-xl md:text-2xl text-[hsl(179,7.6%,96.8%)]/90 mb-8">
          Setting up your intelligent canvas...
        </p>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-[hsl(179,76%,36%)] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-[hsl(193,52%,40%)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-[hsl(179,76%,36%)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Progressive progress bar */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <div className="h-2 bg-[hsl(179,7.6%,96.8%)]/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[hsl(179,76%,36%)] rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[hsl(179,7.6%,96.8%)]/70 text-sm">{getProgressMessage(progress)}</p>
            <span className="text-[hsl(179,76%,36%)] text-sm font-medium">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Subtle animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[hsl(179,76%,36%)]/5 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
    </div>
  );
}


export default LockoutScreen