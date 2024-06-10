const formattedDate = (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return newDate.toLocaleDateString('en-US', options).replace(/,/g, '');
};


export default formattedDate;