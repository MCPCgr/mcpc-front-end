
export function countTasksByPriorities(tasks, priorities) {
  // Initialize an object to hold counts for each priority
  const priorityCounts = priorities.reduce((acc, priority) => {
    acc[priority.id] = {
      color: priority.color,
      priority: priority.priority,
      count: 0
    };
    return acc;
  }, {});

  // Initialize count for "Бусад"
  const otherCount = {
    priority: 'Зэрэглэл өгөөгүй',
    count: 0,
    color: "#7ba3e5"
  };

  // Iterate over tasks to count them based on their priority_id
  tasks.forEach(task => {
    if (task.priority_id && priorityCounts[task.priority_id]) {
      priorityCounts[task.priority_id].count++;
    } else {
      // Increment count for "Бусад" if the priority_id is null or not found in the priorities list
      otherCount.count++;
    }
  });

  // Convert the counts object into an array and add "Бусад" at the end
  const result = Object.values(priorityCounts);
  if (otherCount.count > 0) {
    result.push(otherCount);
  }

  return result;
}

// Counts tasks by stages
export function countTasksByStages(tasks, stages) {
  return stages.map(stage => ({
    stage: stage.stage,
    count: tasks.filter(task => task.stage_id === stage.id).length
  }));
}

// Counts tasks by members, using only the first character of LNAME
export function countTasksByMembers(tasks, taskMembers, members) {
  // Count tasks assigned to members

  const counts = members.map(member => ({
    member: `${member.lastname.charAt(0)}. ${member.firstname}`,
    count: taskMembers.filter(taskMember => taskMember.emp_id === member.id).length
  }));

  // Count tasks that are not assigned to any member
  const assignedTaskIds = new Set(taskMembers.map(taskMember => taskMember.task_id));
  const notAssignedCount = tasks.filter(task => !assignedTaskIds.has(task.id)).length;

  // Add the count for not assigned tasks
  counts.sort((a, b) => b.count - a.count).push({
    member: 'Хувиарлаагүй',
    count: notAssignedCount
  });

  return counts;
}

function getPlannedDays(startDate, endDate) {
  // If no start date or end date, return 0
  if (!startDate || !endDate) return 0;

  // Calculate the difference in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(0, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
}

function getWorkedDays(startDate, endDate, currentDate, completedDate) {
  // Use completedDate if provided and before the current date
  if (completedDate && new Date(completedDate) < currentDate) {
    endDate = completedDate;
  } else if (!endDate || new Date(endDate) > currentDate) {
    // Use current date if endDate is in the future or not provided
    endDate = currentDate;
  }

  // If start date is not provided, return 0
  if (!startDate) return 0;

  // Calculate the difference in days
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  return Math.max(0, Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)));
}

function updateTaskCounts(task, memberTaskCount, currentDate) {
  memberTaskCount.total++;
  memberTaskCount.totalProcess = memberTaskCount.totalProcess+(task.progress ?? 0);
  const taskDueDate = task.end_date ? new Date(task.end_date) : null;
  const isDelayed = taskDueDate && taskDueDate < currentDate;
  const taskCompletedDate = task.completed_date ? new Date(task.completed_date) : null;
  const plannedDays = getPlannedDays(task.start_date, task.end_date);

  // Set initial planned days if not already set
  memberTaskCount.plannedDays = (memberTaskCount.plannedDays || 0) + plannedDays;



  // Determine if the task is completed, not started, delayed, or doing
  if (task.progress >= 100) {
    memberTaskCount['completed']++;
    memberTaskCount.workedDays += getWorkedDays(task.start_date, taskCompletedDate, currentDate, taskCompletedDate);
  } else if (task.progress > 0 && task.progress < 100) {
    memberTaskCount['doing']++;
    memberTaskCount.workedDays += getWorkedDays(task.start_date, currentDate, currentDate);
    if (isDelayed) {
      memberTaskCount['delayed']++;
    }
  } else if (task.progress === 0) {
    if (isDelayed) {
      memberTaskCount['delayed']++;
    } else {
      memberTaskCount['notStarted']++;
    }
    memberTaskCount.workedDays += isDelayed ? getWorkedDays(task.start_date, currentDate, currentDate) : 0;
  }

  if(memberTaskCount.completedPercent){

  }

  memberTaskCount.completedPercent = memberTaskCount.total > 0 ? (memberTaskCount.totalProcess / memberTaskCount.total): 0;
}

export function countTasksByMembersAndProgress(tasks, taskMembers, members) {
  const currentDate = new Date();
  let filteredAverageProgress = 0;
  let filteredTotal = 0;
  let filteredTotalLength = 0;

  const taskStatus = {
    total: tasks.length,
    totalProcess: 0,
    notStarted: 0,
    doing: 0,
    completed: 0,
    delayed: 0,
    plannedDays: 0,
    workedDays: 0,
    completedPercent: 0,

  };

  const memberTaskCounts = members.map(member => ({
    member: `${member.lastname.charAt(0)}. ${member.firstname}`,
    avatar: member.avatar,
    total: 0,
    totalProcess:0,
    notStarted: 0,
    doing: 0,
    completed: 0,
    delayed: 0,
    plannedDays: 0,
    workedDays: 0,
    completedPercent: 0,
  }));



  const notAssignedMemberCount = {
    member: 'Хувиарлаагүй',
    avatar: null,
    total: 0,
    totalProcess:0,
    notStarted: 0,
    doing: 0,
    completed: 0,
    delayed: 0,
    plannedDays: 0,
    workedDays: 0,
    completedPercent: 0,
  };

  // Iterate over each task to update task status and member task counts
  tasks.forEach(task => {
    updateTaskCounts(task, taskStatus, currentDate);

    const foundTaskMembers = taskMembers.filter(tm => tm.task_id === task.id);

    if (foundTaskMembers && foundTaskMembers.length >= 1) {

      foundTaskMembers.forEach(foundTaskMember=>{
        const memberIndex = members.findIndex(m => m.id === foundTaskMember.emp_id);
        if (memberIndex !== -1) {
          updateTaskCounts(task, memberTaskCounts[memberIndex], currentDate);

        }
      })


    } else {
      updateTaskCounts(task, notAssignedMemberCount, currentDate);

    }


  });



  memberTaskCounts.forEach(memberTaskCount => {

    if(memberTaskCount.total > 0){
      filteredTotalLength += 1;
      filteredTotal += (memberTaskCount.completedPercent ? memberTaskCount.completedPercent : 0);
    }

  })

  if(notAssignedMemberCount.total > 0){

    filteredTotalLength += 1;
    filteredTotal += (notAssignedMemberCount.completedPercent ? notAssignedMemberCount.completedPercent : 0);
  }

  filteredAverageProgress = filteredTotal/filteredTotalLength

  return {
    taskStatus,
    memberTaskCounts: [...memberTaskCounts.sort((a, b) => b.completedPercent - a.completedPercent).sort((a, b) => b.completed - a.completed), notAssignedMemberCount],
    filteredAverageProgress:filteredAverageProgress
  };
}

// Counts tasks by progress
export function countTasksByProgress(tasks) {
  return {
    'notStarted': tasks.filter(task => task.progress === 0).length,
    'doing': tasks.filter(task => task.progress > 0 && task.progress < 100).length,
    'completed': tasks.filter(task => task.progress === 100).length
  };
}

// Calculates the overall project progress
export function calculateProjectProgress(tasks) {
  const totalWeight = tasks.reduce((sum, task) => sum + task.project_weight_progress, 0);
  const progressSum = tasks.reduce((sum, task) => sum + (task.progress * task.project_weight_progress), 0);
  return progressSum / totalWeight;
}

// Identifies overdue tasks
export function findOverdueTasks(tasks) {
  const currentDate = new Date();
  return tasks.filter(task => task.end_date && new Date(task.end_date) < currentDate);
}

// Finds tasks by priority for a specific priority
export function findTasksByPriority(tasks, priorityId) {
  return tasks.filter(task => task.priority_id === priorityId);
}
function lightenColor(hex, percent) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Calculate the adjustment value
  let adjust = (percent / 100) * 255;

  // Increase each component by the adjustment value
  r = parseInt(r + adjust);
  g = parseInt(g + adjust);
  b = parseInt(b + adjust);

  // Ensure values stay within 0-255 range
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert RGB back to hex
  r = r.toString(16).padStart(2, '0');
  g = g.toString(16).padStart(2, '0');
  b = b.toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

export function generateLightenedColors(hex, steps) {
  const shades = [hex];

  for (let i = 1; i <= steps; i++) {
    // Increase lightness by 10% with each step
    const lightened = lightenColor(hex, i * 10);
    shades.push(lightened);
  }
  return shades;
}
