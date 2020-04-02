import { Toast } from 'antd-mobile';
import { edAvatar} from '../../apis/My'


export default {
  async upimg(e) {
    // const baseimg = this.update(e)
    let file = e.target.files[0];
    let param = new FormData(); // 创建form对象
    param.append("avatar", file);
    param.append("token", localStorage.token); // 通过append向form对象添加数据
    const edAvatars = await edAvatar(param)
    if (edAvatars.data.code === 200) {
      Toast.success('上传成功!')
      const { avatar, host } = edAvatars.data.data
      
      return { avatar, host }
    }
  },
  async update(event)  {
    // 选择的文件对象(file里只包含图片的体积，不包含图片的尺寸)
    var _this = this
    var file = event.target.files[0];
    console.log(file);
  
    // 选择的文件是图片
    if (file.type.indexOf("image") === 0) {
      // 压缩图片需要的一些元素和对象
      var reader = new FileReader(),
        // 创建一个img对象
        img = new Image();
  
      reader.readAsDataURL(file);
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function(e) {
        img.src = e.target.result;
      };
  
      // base64地址图片加载完毕后执行
      img.onload = async() => {
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
  
        // 图片原始尺寸
        var originWidth = _this.width;
        var originHeight = _this.height;
  
        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        var maxWidth = 250,
          maxHeight = 250;
        // 目标尺寸
        var targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过300x300的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(
              maxWidth * (originHeight / originWidth)
            );
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(
              maxHeight * (originWidth / originHeight)
            );
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        var newUrl = canvas.toDataURL("image/jpeg", 0.7); // base64 格式
        console.log(newUrl);
        return newUrl
        // const base64s = await base64({
        //   img: newUrl
        // })
        // console.log(base64s);
      };
    } else {
      alert("上传失败！");
    }
  
  }
}
