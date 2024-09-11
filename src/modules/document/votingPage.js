import dayjs from '@lambda-platform/lambda-vue/src/utils/dayjs'
export function VotingPageHTML(date, statusHistories, vote_additional_comments, votingPeople, name, description){

  const index = statusHistories.findIndex(s=>s.status_type === 'START');
  let createdDepartment = ""
  let createPersonJob = ""
  let createPerson = ""
  if(index >= 0){
    createdDepartment = statusHistories[index].emp["STRUCT_NAME"]
    createPersonJob = statusHistories[index].emp["JOB_NAME"]
    createPerson = `${statusHistories[index].emp["LNAME"] ? statusHistories[index].emp["LNAME"].charAt(0).toUpperCase() : ''}.${statusHistories[index].emp["FNAME"]}`
  }
  const dateInfo = getYearMonthDay(date.toString())
  let votingHTML =  `<?xml version='1.0' encoding='utf - 8'?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN''http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html xmlns ='http://www.w3.org/1999/xhtml' xml:lang='mn' lang ='mn'>
<body style="margin: 0; padding: 0;">
<div>

  <p style="line-height:normal;margin:0cm;text-align:center;"><span
    style="font-family:Arial, sans-serif;font-size:12pt;">
    <strong style=" text-transform: uppercase;">${name}</strong></span></p>
  <p style="line-height:normal;margin:0cm;text-align:center;"><span
    style="font-family:Arial, sans-serif;font-size:12pt;"><strong>САНАЛ ӨГӨХ ХУУДАС</strong></span></p>
  <p style="line-height:normal;margin:0cm;text-align:center;"><br/></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><span
    style="font-family:Arial, sans-serif;font-size:9.0pt;">${dateInfo[0]} оны ${dateInfo[1]}&nbsp;дугаар&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Улаанбаатар хот</span></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><span
    style="font-family:Arial, sans-serif;font-size:9.0pt;">сарын ${dateInfo[2]} – ны өдөр</span></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><br/></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><br/></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><span
    style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Санаачилсан алба, хэлтсийн нэр</strong></span></p>

  <p style="line-height:normal;margin:0cm;text-align:justify;"><span
    style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>${createdDepartment}</strong></span></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><br/></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><span
    style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Агуулга</strong></span></p>

  <p style="line-height:normal;margin:0cm;text-align:justify;"><span
    style="font-family:Arial, sans-serif;font-size:10.0pt;">${description}</span></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><br/></p>

  <table style="border-collapse:collapse;" border="1" cellspacing="0" cellpadding="0" width="678">
    <tbody>
    <tr>
      <td style="border:1.0pt solid windowtext;padding:0cm 5.4pt;width:22.5pt;" role="textbox"  width="30">
        <p style="line-height:normal;margin:0cm;text-align:center;"><br/></p>
        <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>№</strong></span></p>
        <p style="line-height:normal;margin:0cm;text-align:center;"><br/></p>
        <p style="line-height:normal;margin:0cm;text-align:center;"><br/></p>
      </td>
      <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:none;border-right-style:solid;border-top-style:solid;border-width:1.0pt;padding:0cm 5.4pt;" >
        <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Санал өгөх албан тушаалтан</strong></span></p>
      </td>
      <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:none;border-right-style:solid;border-top-style:solid;border-width:1.0pt;padding:0cm 5.4pt;" >
        <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Төсөлд өгөх санал</strong></span></p>
      </td>
      <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:none;border-right-style:solid;border-top-style:solid;border-width:1.0pt;padding:0cm 5.4pt;" role="textbox" >
        <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Гарын үсэг /огноо/</strong></span></p>
      </td>
      <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:none;border-right-style:solid;border-top-style:solid;border-width:1.0pt;padding:0cm 5.4pt;" role="textbox" >
        <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Тайлбар</strong></span></p>
      </td>
    </tr>`;

 votingPeople.forEach((votingPerson, index)=> {
   const signature = votingPerson.SIGNATURE_IMAGE;
   const signDate = getDatetime(votingPerson.SIGNATURE_DATE);
   let signDateInfo = `<span style="font-size:8.0pt;">Цахимаар баталгаажуулсан огноо:  ${signDate}</span>`
   let signatureInfo = `<span>${signature.signature}<br/></span>`
   if (signature.type !== 'text') {
     signDateInfo = `<span style="font-size:8.0pt;"> Цахимаар баталгаажуулсан: <br/> ${signature.lastname ? signature.lastname.charAt(0).toUpperCase() : ''}.${signature.firstname} <br/> огноо: ${signDate}</span>`

     signatureInfo = `<img height="35" src = "${signature.type === 'draw' ? '' : 'https://emiat.miat.com'}${signature.signature}" /><br/>`

   }

   let row = `<tr >
      <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:solid;border-right-style:solid;border-top-style:none;border-width:1.0pt;height:31.2pt;padding:0cm 5.4pt;" >
        <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>${index + 1}</strong></span></p>
      </td>
      <td style="border-bottom:1.0pt solid windowtext;border-left-style:none;border-right:1.0pt solid windowtext;border-top-style:none;height:31.2pt;padding:0cm 5.4pt;">
        <p style="line-height:normal;margin:0cm;text-align:left;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;">${signature.job_name} <br/>${signature.struct} <br/> ${signature.lastname ? signature.lastname.charAt(0).toUpperCase() : ''}.${signature.firstname}</span></p>
      </td>
      <td style="border-bottom:1.0pt solid windowtext;border-left-style:none;border-right:1.0pt solid windowtext;border-top-style:none;;padding:0cm 5.4pt;vertical-align:middle;" role="textbox" >
        <p style="line-height:normal;margin:0cm;text-align:center;font-size:10.0pt;"><strong>${signature.signAction}</strong></p>

      </td>
      <td

                style="text-align: center; font-family: Arial; font-size: 12px; padding-left: 10px; vertical-align: middle">

${signatureInfo}
${signDateInfo}


              </td>
      <td style="border-bottom:1.0pt solid windowtext;border-left-style:none;border-right:1.0pt solid windowtext;border-top-style:none;height:31.2pt;padding:0cm 5.4pt;vertical-align:top;" role="textbox"  >
        <p style="line-height:normal;margin:0cm;text-align:left;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;">${votingPerson.DESCRIPTION}</span></p>
      </td>
    </tr>`

   votingHTML = votingHTML + row;
 })


  votingHTML = votingHTML + `<tr style="height:31.2pt;">
      <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:solid;border-right-style:solid;border-top-style:none;border-width:1.0pt;height:31.2pt;padding:0cm 5.4pt;" role="textbox"  colspan="2" >
         <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>НЭМЭЛТ ТАЙЛБАР, САНАЛ, ХҮСЭЛТ</strong></span></p>
      </td>
       <td style="border-bottom-style:solid;border-color:windowtext;border-left-style:solid;border-right-style:solid;border-top-style:none;border-width:1.0pt;height:31.2pt;padding:0cm 5.4pt;" role="textbox"  colspan="3"  >
         <p style="line-height:normal;margin:0cm;text-align:center;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;">${vote_additional_comments}</span></p>
      </td>

    </tr>

    </tbody>
  </table>

  <p style="line-height:normal;margin:0cm;text-align:justify;"><br/></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>Боловсруулсан</strong></span></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><br/></p>
  <p style="line-height:normal;margin:0cm;text-align:justify;"><span style="font-family:Arial, sans-serif;font-size:10.0pt;"><strong>${createPersonJob} ажилтай ${createPerson}</strong></span></p>
 </div>
</body>
</html>
`

  return votingHTML
}
function getYearMonthDay(date) {
  let dateValue = dayjs(date);
  return [dateValue.format("YYYY"), dateValue.format("MM"), dateValue.format("DD")];
}

function getDatetime(date) {
  let dateValue = dayjs(date);
  return dateValue.format("YYYY-MM-DD HH:mm");
}
