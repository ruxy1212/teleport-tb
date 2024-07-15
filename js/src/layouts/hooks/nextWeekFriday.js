export const getNextWeekFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextFriday = new Date(today);
  
    const daysUntilFriday = (12 - dayOfWeek) % 7;
    nextFriday.setDate(today.getDate() + daysUntilFriday);
  
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(nextFriday);
};