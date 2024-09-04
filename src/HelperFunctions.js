export const processPieChartData = (data) => {
    const chartData = [['Category', 'Amount']];
    for (const [key, value] of Object.entries(data)) {
        // Only push valid entries with non-null, non-undefined values
        if (key && value !== undefined && value !== null) {
            chartData.push([key.replace(/_/g, ' '), value]);
        }
    }
    return chartData;
};


export const processColumnChartData = (periodsExist, capexDataExist, periods, categoryDataTS, label) => {
    if (!periodsExist || !capexDataExist) return [['Year']];

    return [
        ['Year', ...Object.keys(categoryDataTS || {})],  // Column headers: Year and categories
        ...periods?.map((period, periodIndex) => {
            const row = [period.label]; // Start with the year label
            Object.keys(categoryDataTS || {}).forEach((key) => {
                row.push(categoryDataTS[key][periodIndex] || 0);  // Push corresponding category data
            });
            return row;
        })
    ];
};