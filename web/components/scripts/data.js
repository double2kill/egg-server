export const targetScript = `
function postData(phoneNumber) {
  fetch("https://ibsbjstar.ccb.com.cn/CCBIS/B2CMainPlat_11?CCB_IBSVersion=V6&PT_STYLE=2", {"credentials":"include","headers":{"accept":"application/json, text/javascript, */*; q=0.01","accept-language":"zh-CN,zh;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"https://ibsbjstar.ccb.com.cn/CCBIS/B2CMainPlat_11_EPAY?SERVLET_NAME=B2CMainPlat_11_EPAY&CCB_IBSVersion=V6&PT_STYLE=2&TXCODE=TJYL01&Cst_Blng_InsID=351000602&ccbParam=JUA%2CGkpgbLlwJ1s78Y4ZXa0zJmF%2CmFHSIPgvU3DvqSuVrevW2UhyWvyd0Tag%2Ftwff7L4D%2CsNHEUR%0A6Fr%2C2mONTTHz1iy4G%2Cp5enjGc7j0B2QEjbuyyYxVxeDny467JX88Ano4yVMf69R44vsGUeB60HUa%0AIgfosILjJO2D96OanNc%3D","referrerPolicy":"no-referrer-when-downgrade","body":"MOBILE=" + phoneNumber + "&TXCODE=TJYL02&ccbParam=JUA%2CGkpgbLlwJ1s78Y4ZXa0zJmF%2CmFHSIPgvU3DvqSuVrevW2UhyWvyd0Tag%2Ftwff7L4D%2CsNHEUR%0D%0A6Fr%2C2mONTTHz1iy4G%2Cp5enjGc7j0B2QEjbuyyYxVxeDny467JX88Ano4yVMf69R44vsGUeB60HUa%0D%0AIgfosILjJO2D96OanNc%3D","method":"POST","mode":"cors"})
  .then(response => response.json())
  .then(data => {
    if(data.STATUS !== 'Y') {
      alert(phoneNumber + " : " + data.ERRMSG)
    }
  })
} 
phoneNumberList.forEach(function(phoneNumber, index){
  setTimeout(() => {
    postData(phoneNumber)
  }, 1000 * index);
})`
