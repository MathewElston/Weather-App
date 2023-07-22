const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'];
const secondsToMiliSeconds = 1000;
const getWeekday = (timestamp: number) => {
    const day = new Date(timestamp *secondsToMiliSeconds);
    console.log(days[day.getDay()]);
    return days[day.getDay()];
};
export default getWeekday;