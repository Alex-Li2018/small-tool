const getCommandLineArgs = () => {
    const args = process.argv.slice(2);
    const result = {};
    args.forEach(item => {
        result[item.split('=')[0]] = item.split('=')[1];
    });
    return result;
};

module.exports = {
    getCommandLineArgs
};
