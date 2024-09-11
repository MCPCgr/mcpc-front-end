// import axios from "~/plugins/core/axios";
export function getStatusColor(statusType) {
  switch (statusType) {
    case "START":
      return "text-[#4648dc] border-[#4648dc]"; // Ноорог - Хөх
    case "CHECK":
      return "text-orange-400 border-orange-400"; // Хянах - Улбар шар
    case "TRANSFER":
      return "text-blue-400 border-blue-400"; // Шилжүүлэг - Цэнхэр
    case "RE_CREATE":
      return "text-teal-400 border-teal-400"; // Дахин боловсруулах - Ногоон цэнхэр
    case "VOTE":
      return "text-amber-400 border-amber-400"; // Санал хураалт - Хар шар
    case "SUMMARY":
      return "text-violet-600 border-violet-600"; // Хураангуй - Бараан улаан
    case "CONTRACT":
      return "text-cyan-700 border-cyan-700"; // Гэрээ байгуулалт - Цэнхэр ногоон
    case "BUDGET":
      return "text-blue-600 border-blue-600"; // Төсөв батлах - Хүнд цэнхэр
    case "PRE_END":
      return "text-sky-300 border-sky-300"; // Хэвлэх, дугаар олгох - Тэнгэрийн цэнхэр
    case "END":
      return "text-green-500 border-green-500"; // Дууссан - Ногоон
    case "CANCEL":
      return "text-red-600 border-red-600"; // Цуцлагдсан - Улаан
    default:
      return "text-gray-500 border-gray-500"; // Анхдагч буюу үл мэдэгдэх төлөв - Гялгар улаан
  }
}

export function getStatusBgColor(statusType) {
  switch (statusType) {
    case "START":
      return "bg-[#4648dc] text-white"; // Ноорог - Хар
    case "CHECK":
      return "bg-orange-400 text-white"; // Хянах - Улбар шар
    case "TRANSFER":
      return "bg-blue-400 text-white"; // Шилжүүлэг - Цэнхэр
    case "RE_CREATE":
      return "bg-teal-400 text-white"; // Дахин боловсруулах - Ногоон цэнхэр
    case "VOTE":
      return "bg-amber-400 text-white"; // Санал хураалт - Хар шар
    case "SUMMARY":
      return "bg-violet-600 text-white"; // Хураангуй - Бараан улаан
    case "CONTRACT":
      return "bg-cyan-700 text-white"; // Гэрээ байгуулалт - Цэнхэр ногоон
    case "BUDGET":
      return "bg-blue-600 text-white"; // Төсөв - Хүнд цэнхэр
    case "PRE_END":
      return "bg-sky-300 text-white"; // Хэвлэх, дугаар олгох - Тэнгэрийн цэнхэр
    case "END":
      return "bg-green-500 text-white"; // Дууссан - Ногоон
    case "CANCEL":
      return "bg-red-600 text-white"; // Цуцлагдсан - Улаан
    default:
      return "bg-gray-500 text-white"; // Анхдагч буюу үл мэдэгдэх төлөв - Гялгар улаан
  }
}


export async function createStatusHistory(step, user, statusHistory) {


  let company_id = null;
  let struct_id = null;
  let job_id = null;
  let emp_id = null;

  if (step.attrs.subject.subject_type === "ANY_EMP" || step.attrs.subject.subject_type === "CURRENT" || step.attrs.subject.object_type === "END" || step.attrs.subject.object_type === "CANCEL") {
    if(user){
      company_id = user.company_id ? user.company_id : null;
      struct_id = user.struct_id ? user.struct_id : null;
      job_id = user.job_id ? user.job_id : null;
      emp_id = user.emp_id ? user.emp_id : null;
      emp_id = user ? user.emp_id : null;
    }

  }

  else if (step.attrs.subject.subject_type === "VOTERS") {

  }
  else if (step.attrs.subject.subject_type === "DIRECT") {

    emp_id = step.attrs.subject.emp_id ? step.attrs.subject.emp_id : null;
  }
  else if (step.attrs.subject.subject_type === "TO_ORG_STRUCT") {

    company_id = step.attrs.subject.company_id ? step.attrs.subject.company_id : null;
    struct_id = step.attrs.subject.struct_id ? step.attrs.subject.struct_id : null;
    // job_id = step.attrs.subject.job_id ? step.attrs.subject.job_id : null;
    // emp_id = step.attrs.subject.emp_id ? step.attrs.subject.emp_id : null;
  }
  else if (step.attrs.subject.subject_type === "TO_ORG_JOB") {

    company_id = step.attrs.subject.company_id ? step.attrs.subject.company_id : null;
    struct_id = step.attrs.subject.struct_id ? step.attrs.subject.struct_id : null;
    job_id = step.attrs.subject.job_id ? step.attrs.subject.job_id : null;
    // emp_id = step.attrs.subject.emp_id ? step.attrs.subject.emp_id : null;
  }
  else if (step.attrs.subject.subject_type === "TO_ORG_EMPLOYEE") {

    company_id = step.attrs.subject.company_id ? step.attrs.subject.company_id : null;
    struct_id = step.attrs.subject.struct_id ? step.attrs.subject.struct_id : null;
    job_id = step.attrs.subject.job_id ? step.attrs.subject.job_id : null;
    emp_id = step.attrs.subject.emp_id ? step.attrs.subject.emp_id : null;
  }
   else if (step.attrs.subject.subject_type === "CREATOR") {

    const index = statusHistory.findIndex(h => h.status_type === "START");
    if (index >= 0) {

      emp_id = statusHistory[index].emp_id;
    }
  }
  return {
    "id": null,
    "row_id": null,
    company_id,
    struct_id,
    job_id,
    emp_id,
    "status": step.attrs.label.text,
    "status_type": step.attrs.subject.object_type,
    "is_subject_changeable": step.attrs.subject.is_subject_changeable,
    "status_id": step.id,
    "subject_type": step.attrs.subject.subject_type,
    "is_read_only": step.attrs.subject.is_read_only,
    "is_signature_needed": step.attrs.subject.is_signature_needed,
    "description": null,
    "is_done": false,
    "signature": null,
    "step_data": step
  }
}

// export async function fetchDepartmentHead(structId) {
//   try {
//     const response = await axios.get(`/dms/find-head-department/${structId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching department head:', error);
//     throw error;
//   }
// }

// export async function fetchHeadOfPlace(structId) {
//   try {
//     const response = await axios.get(`/dms/find-head-place/${structId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching head of place:', error);
//     throw error;
//   }
// }
