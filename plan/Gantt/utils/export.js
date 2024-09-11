import jsPDF from "jspdf";
import dayjs from '@lambda-platform/lambda-vue/src/utils/dayjs'
import * as XLSX from 'xlsx';
export const exportSVG = (project) => {
    var svgData = document.getElementById("gantt").innerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type: "image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = project.title + ".svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);


}
export const exportPDF = async (project) => {
    const svgElement = document.getElementById('gantt').querySelector('svg');

    // Serialize the SVG element
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);

    // Convert SVG to Canvas
    const img = new Image();
    img.onload = () => {
        const scaleFactor = 1.5; // Adjust this for desired quality. Higher value = better quality.

        // Adjust canvas dimensions with scaling factor
        const canvas = document.createElement('canvas');
        canvas.width = svgElement.clientWidth * scaleFactor;
        canvas.height = svgElement.clientHeight * scaleFactor;

        const ctx = canvas.getContext('2d');

        // Scale the drawing context
        ctx.scale(scaleFactor, scaleFactor);
        ctx.drawImage(img, 0, 0, svgElement.clientWidth, svgElement.clientHeight);

        // Convert Canvas to PDF
        const doc = new jsPDF({
            orientation: canvas.width > canvas.height ? 'l' : 'p',
            unit: 'px',
            format: [svgElement.clientWidth, svgElement.clientHeight]
        });

        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, svgElement.clientWidth, svgElement.clientHeight);
        doc.save(project.title + '.pdf');

        // Release the object URL
        URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;

}
function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function formatTasks(tasks, stages, employees, priorities) {

    return tasks.map(task => {
        let members = []
        let status = ""
        let priority = ""
        let stageIndex = stages.findIndex(stage => stage.id === task.stage_id);
        if (stageIndex >= 0) {
            status = capitalizeFirstLetter(stages[stageIndex].stage);

            const taskIndex = stages[stageIndex].tasks.findIndex(t => t.id === task.id);

            if (taskIndex >= 0) {

                if(stages[stageIndex].tasks[taskIndex].taskMembers) {

                    stages[stageIndex].tasks[taskIndex].taskMembers.forEach(member=>{
                        const empIndex = employees.findIndex(e => e.id === member.emp_id);
                        if(empIndex >=0){
                            members.push(employees[empIndex].lastname[0]+"."+employees[empIndex].firstname)
                        }
                    })



                }
                if(stages[stageIndex].tasks[taskIndex].priority_id){


                    const pIndex = priorities.findIndex(p => p.id === stages[stageIndex].tasks[taskIndex].priority_id);
                    if(pIndex >=0){
                        priority = capitalizeFirstLetter(priorities[pIndex].priority);
                    }
                }
            }
        }
        return {
            level: task.level,
            percent: task.percent*100,
            name: task.text,
            duration: task.duration,
            start: task.start ? dayjs(task.start).format("YYYY-MM-DD") : "",
            end: task.end  ? dayjs(task.end).format("YYYY-MM-DD") : "",
            members: members.join(", "),
            status: status,
            priority: priority,

        }
    });
}

export const exportExcel = (project, ganttTasks, stages, employees, priorities) => {

    // Map the tasks using our helper function
    const formattedTasks = formatTasks(ganttTasks, stages, employees, priorities);
    // Insert headers to the top of our data
    formattedTasks.unshift({
        level: "ДД",
        name: "Ажилбар",
        percent: "Гүйцэтгэл %",
        duration: "Хугацаа хонгоор",
        start: "Эхлэх огноо",
        end: "Дуусах огноо",
        members: "Оролцогч",
        status: "Төлөв",
        priority: "Зэрэглэл",


    });


    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the formatted task array to a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedTasks, {skipHeader: true});

    // Adjust column widths to fit content
    const wscols = [];
    for (let key in formattedTasks[0]) {
        // Calculate the maximum width among all rows for a given key/column
        let maxWidth = Math.max(...formattedTasks.map(row => (row[key] && row[key].toString().length) || 0));

        // Add a bit of padding and set the width
        wscols.push({ wch: maxWidth + 2 });
    }

    ws['!cols'] = wscols;

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, project.title);

    // Write the workbook to an Excel file
    XLSX.writeFile(wb, project.title + ".xlsx");
}
