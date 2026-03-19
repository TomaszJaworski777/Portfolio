import { useState } from "react";
import { GitHubCalendar } from 'react-github-calendar';

export function GitHubActivity({ isLight, username }: { isLight: boolean; username: string }) {
  const [isReady, setIsReady] = useState(false);

  const filter = (contributions: any) => {
    const today = new Date();
    const timeStamp = new Date();
    timeStamp.setMonth(today.getMonth() - 5);

    const filtered = contributions.filter((day: any) => {
        const date = new Date(day.date);
        return date >= timeStamp;
    });

    if (!isReady) {
        setTimeout(() => {
            setIsReady(true);
        }, 0);
    }

    return filtered;
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-end mb-2">
        <p className="w-full uppercase tracking-wider text-[11px] text-app-accent">
          <b>github activity</b>
        </p>
      </div>

      <div className="relative">
        {!isReady && (
          <div className="w-full h-32.5 bg-app-surface animate-pulse flex items-center justify-center" />
        )}

        <div className={`
          overflow-hidden transition-all duration-700 ease-in-out
          ${isReady ? "opacity-100 h-auto" : "opacity-0 h-0"}
        `}>
          <GitHubCalendar 
            username={username}
            transformData={filter}
            labels={{
              totalCount: "{{count}} activities in 6 months",
            }}
            fontSize={10}
            blockSize={10}
            blockMargin={3}
            theme={{
              light: ['#c0c0c0', '#9edfa1', '#7be282', '#59db63', '#39d353'],
              dark: ['#121417', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            colorScheme={isLight ? 'light' : 'dark'}
            className='text-app-muted'
          />
        </div>
      </div>
    </div>
  );
}