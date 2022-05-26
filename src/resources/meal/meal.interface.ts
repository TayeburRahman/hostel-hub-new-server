// language=TypeScript

export interface Meal {
    _id: string;
    hostel: string;
    user: string;
    breakfast: number;
    lunch: number;
    dinner: number;
    date: Date;
}

// get current month
const month = new Date().getMonth();
//get month name
const monthName = new Date().toLocaleString('en-us', { month: 'long' });
// get current year
const year = new Date().getFullYear();
// get current day
const day = new Date().getDate();
// get days in current month
const daysInMonth = new Date(year, month + 1, 0).getDate();
// get how many days in next month
const daysInNextMonth = new Date(year, month + 2, 0).getDate();
// get first date of current month
const firstDate = new Date(year, month, 1).toLocaleDateString();
//get last Date of current month
const lastDate = new Date(year, month, daysInMonth).toLocaleDateString();
// get current day of the week
const dayOfWeek = new Date().getDay();
// get current day of the week name
const dayOfWeekName = new Date().toLocaleString('en-us', { weekday: 'long' });
//get last date of previous month
const lastDateOfPreviousMonth = new Date(year, month, 0).toLocaleDateString();
// get first date of next month
const firstDateOfNextMonth = new Date(year, month + 2, 1).toLocaleDateString();
// get last date of next month
const lastDateOfNextMonth = new Date(
    year,
    month + 2,
    daysInNextMonth
).toLocaleDateString();

//get last month
const lastMonth = new Date(year, month, 0).toLocaleDateString();
