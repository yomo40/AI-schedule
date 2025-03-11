async function scheduleHtmlProvider() {
    await loadTool('AIScheduleTools');

    try {
        const frmDesk = document.getElementById('frmDesk')?.contentWindow?.document;
        const frame_1 = frmDesk?.getElementById("frame_1")?.contentWindow?.document;
        const frmReport = frame_1?.getElementById("frmReport")?.contentWindow?.document;
        const tableElement = frmReport?.getElementById("mytable");

        if (tableElement) {
            return tableElement.innerHTML; 
        } else {
            throw new Error("未找到课表元素，请检查页面结构");
        }
    } catch (e) {
        await AIScheduleAlert("进入主控-->教学安排");
        console.error("Error occurred in scheduleHtmlProvider:", e);
        return 'do not continue';  
    }
}