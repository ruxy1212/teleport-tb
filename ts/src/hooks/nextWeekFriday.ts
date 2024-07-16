export const getNextWeekFriday = (): string => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextFriday = new Date(today);
  
    const daysUntilFriday = (12 - dayOfWeek) % 7;
    nextFriday.setDate(today.getDate() + daysUntilFriday);
  
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(nextFriday);
  
    const [day, month, year] = formattedDate.split(' ');
  
    return `${day}, ${month} ${year}`;
  };