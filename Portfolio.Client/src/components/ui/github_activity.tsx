import { GitHubCalendar } from 'react-github-calendar';

export function GitHubActivity({isLight}: {isLight: boolean}) {
  const filter = (contributions: any) => {
    const today = new Date();
    const timeStamp = new Date();
    timeStamp.setMonth(today.getMonth() - 5);

    return contributions.filter((day: any) => {
      const date = new Date(day.date);
      return date >= timeStamp;
    });
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-end">
        <p className="w-full uppercase tracking-wider ml-3 text-[11px] text-app-accent"><b>github activity</b></p>
      </div>

      <div className="p-3">
        <GitHubCalendar 
          username="TomaszJaworski777"
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
  );
}