export const targetScript = `
var element = document.getElementById('mobile')
function postData(phoneNumber) {
  element.value = phoneNumber
  toNextForm()
} 
phoneNumberList.forEach(function(phoneNumber, index){
  setTimeout(() => {
    postData(phoneNumber)
  }, 1000 * index);
})
setTimeout(() => {
  alert('结束')
}, 1000 * phoneNumberList.length)
`

export const url = 'https://ibsbjstar.ccb.com.cn/CCBIS/B2CMainPlat_11_EPAY?SERVLET_NAME=B2CMainPlat_11_EPAY&CCB_IBSVersion=V6&PT_STYLE=2&TXCODE=TJYL01&Cst_Blng_InsID=350647007&ccbParam=JUA%2CGkpgbLkQXpyyehRl18qTJDBt%2CH6Jtcc8hvblKkOVrevW2UhyWurTEmLiTpMtXHShUBlAr8yj%0AR8d%2Fajp3wDHz1iy4G%2Cp5enjGc7j0B2QEjbuyyYxVxUaRTPTWjce0j0mluJXMiS144vsGUeB60OCg%0A41mDK4iCjuPxMC9YuIM%3D'
