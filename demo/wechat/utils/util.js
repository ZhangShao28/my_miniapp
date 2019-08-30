function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function DrawImage(ImgD,FitWidth,FitHeight) 
{ 
  var image=new Image(); 
  image.src=ImgD.src; 
    if(image.width>0 && image.height>0) 
    { 

      if(image.width>FitWidth) 
      { 
        ImgD.width=FitWidth; 
        ImgD.height=(image.height*FitWidth)/image.width; 
        if(ImgD.height>FitHeight)
        {
          ImgD.height=FitHeight; 
          ImgD.width=(image.width*FitHeight)/image.height; 
        }
      } 
      else if(image.height>FitHeight) 
      { 
        ImgD.height=FitHeight; 
        ImgD.width=(image.width*FitHeight)/image.height; 
        if(image.width>FitWidth)
        {
          ImgD.width=FitWidth; 
          ImgD.height=(image.height*FitWidth)/image.width; 
        }
      }
      else
      { 
        ImgD.width=image.width; 
        ImgD.height=image.height; 
      } 
    } 
} 
