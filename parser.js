function scheduleHtmlParser(html) {
    let result = [];

    $("tbody tr").each(function() {
        $(this).children("td.td").each(function(index) {
            let classHtmls = $(this).find("div");
            
            if (classHtmls.length == 1 && !$(classHtmls[0]).text().trim()) {
                return;
            }

            classHtmls.each(function() {
                let classProperty = $(this).html().split("<br>").map(function(item) {
                    return $('<div/>').html(item).text().trim();
                });

                if (classProperty.length !== 4) {
                    return;
                }

                let classItem = {
                    name: classProperty[0],  // 课程名称
                    teacher: classProperty[1],  // 教师
                    position: classProperty[3],  // 上课地点
                    day: index + 1,  // 上课日期，假设`index + 1`表示星期几
                    sections: [],  // 上课节次
                    weeks: []  // 上课周次
                };

                // 处理周次
                let weekRange = classProperty[2].split("[")[0].split(",");
                weekRange.forEach(function(week) {
                    if (week.includes("-")) {  // 处理如 "13-16"
                        let [start, end] = week.split("-").map(Number);
                        for (let weekNum = start; weekNum <= end; weekNum++) {
                            classItem.weeks.push(weekNum);
                        }
                    } else {
                        classItem.weeks.push(Number(week));
                    }
                });

                // 处理节次
                let sectionRange = classProperty[2].split("[")[1].replace("]", "");
                let [startSection, endSection] = sectionRange.split("-").map(Number);
                for (let section = startSection; section <= endSection; section++) {
                    classItem.sections.push({ section });
                }

                result.push(classItem);  // 添加到结果
            });
        });
    });

    return result;
}