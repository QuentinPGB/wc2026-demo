Create a countdown timer component for the homepage:

1. Create /components/CountdownTimer.tsx:
tsx
'use client';
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  matchTitle: string;
}

export default function CountdownTimer({ targetDate, matchTitle }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-[#0F3460] to-[#E94560] rounded-lg p-6 text-white">
      <h3 className="font-montserrat font-bold text-lg mb-4 text-center">{matchTitle}</h3>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="bg-[#1A1A2E] rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-montserrat font-bold">{timeLeft.days}</div>
            <div className="text-sm opacity-80">Days</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-[#1A1A2E] rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-montserrat font-bold">{timeLeft.hours}</div>
            <div className="text-sm opacity-80">Hours</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-[#1A1A2E] rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-montserrat font-bold">{timeLeft.minutes}</div>
            <div className="text-sm opacity-80">Min</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-[#1A1A2E] rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-montserrat font-bold">{timeLeft.seconds}</div>
            <div className="text-sm opacity-80">Sec</div>
          </div>
        </div>
      </div>
    </div>
  );
}


2. Update /app/page.tsx to include the countdown:
tsx
import CountdownTimer from '@/components/CountdownTimer';

export default function HomePage() {
  // Add this to the hero section
  const nextMatchDate = new Date('2024-12-01T18:00:00Z'); // Replace with actual next match date
  
  return (
    <main className="min-h-screen bg-[#1A1A2E]">
      <section className="hero-section px-4 py-12">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6">World Cup Quiz</h1>
          <p className="text-lg mb-8">Test your knowledge and make predictions</p>
          
          {/* Add countdown timer */}
          <div className="mb-8 max-w-md mx-auto">
            <CountdownTimer 
              targetDate={nextMatchDate} 
              matchTitle="Next World Cup Match" 
            />
          </div>
          
          <button className="bg-[#E94560] hover:bg-[#d63851] px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Quiz
          </button>
        </div>
      </section>
    </main>
  );
}


3. Add to /lib/types.ts:
tsx
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  venue: string;
}