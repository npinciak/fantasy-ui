const currentDate = () => {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${year}${month <= 9 ? '0' + month : month}${day  <= 9 ? '0' + day : day}`;
};

export { currentDate };
