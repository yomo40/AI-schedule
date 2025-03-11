async function scheduleTimer({
    providerRes,
    parserRes
} = {}) {
    // 计算总周数
    let totalWeek = 0;
    if (parserRes && parserRes.length > 0) {
        totalWeek = Math.max(...parserRes.flatMap(course => course.weeks));
    }

    // 计算上午、下午、晚上的课程节数
    let forenoon = 0;
    let afternoon = 0;
    let night = 0;

    parserRes.forEach(course => {
        course.sections.forEach(section => {
            if (section.section <= 4) { // 上午课
                forenoon++;
            } else if (section.section <= 8) { // 下午课
                afternoon++;
            } else { // 晚间课
                night++;
            }
        });
    });

    // 定义每节课的时间段
    const sections = [
        { section: 1, startTime: '08:00', endTime: '08:45' },
        { section: 2, startTime: '08:55', endTime: '09:40' },
        { section: 3, startTime: '10:00', endTime: '10:45' },
        { section: 4, startTime: '10:55', endTime: '11:40' },
        { section: 5, startTime: '14:00', endTime: '14:45' },
        { section: 6, startTime: '14:55', endTime: '15:40' },
        { section: 7, startTime: '16:00', endTime: '16:45' },
        { section: 8, startTime: '16:55', endTime: '17:40' },
        { section: 9, startTime: '19:00', endTime: '19:45' },
        { section: 10, startTime: '19:55', endTime: '20:40' },
    ];

    // 返回课表信息
    return {
        totalWeek: totalWeek, // 动态计算总周数
        forenoon: forenoon, // 上午课程节数
        afternoon: afternoon, // 下午课程节数
        night: night, // 晚间课程节数
        sections: sections // 固定的课程节次时间
    };
}