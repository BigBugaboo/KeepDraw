import AliyunOSS from 'aliyun-oss-react-native';
import ImagePicker from 'react-native-image-picker';
import uuid from 'rn-uuid';
import _ from 'lodash';

import { getLoginInfo } from './api/index';

/**
 * throttle 限流
 * @param {func} func 回调
 * @param {number} duration 持续时间
 * @param {number} type 1 表时间戳版，2 表定时器版
 */

export const throttle = (func, duration = 1000, type = 1) => {
  let previous, timeout;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timeout = null;
  }

  return function() {
    let args = arguments;

    if (type === 1) {
      let now = Date.now();

      if (now - previous > duration) {
        func.apply(this, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, duration);
      }
    }
  };
};

/**
 * debounce 防抖
 * @param {func} func 回调
 * @param {number} wait 间隔
 * @param {bool} immediate 是否立即执行
 */

export const debounce = (func, wait = 1000, immediate = true) => {
  let timeout;

  return function() {
    let args = arguments;

    if (immediate) {
      // 通过 timeout 为 undefined 判断是否存在定时器,没有则立即执行
      let callNow = !timeout;

      // 设置定时器，防止重复触发
      timeout = setTimeout(() => {
        // 到时后，只为 null 可重复注册事件
        timeout = null;
      }, wait);

      // 如果为 true 表示可执行
      if (callNow) {
        func.apply(this, args);
      }
    } else {
      // 设置定时器，如果重复触发，则重新注册事件
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
};

/**
 * uploadImage 上传图片
 * @param {string} objectKey 图片存储的连接
 * @param {string} filePath 图片连接
 */

export const uploadImage = (objectKey, filePath) =>
  new Promise((resolve, reject) => {
    // 初始化oss信息
    const configuration = {
      maxRetryCount: 3,
      timeoutIntervalForRequest: 30,
      timeoutIntervalForResource: 24 * 60 * 60,
    };

    AliyunOSS.initWithPlainTextAccessKey(
      'LTAI4Fe3L5JruU7SC1Wesgbh',
      'HMfxOCJqvA0nqbndEYJi0cHFJhMgOs',
      'oss-cn-shenzhen.aliyuncs.com',
      configuration,
    );

    AliyunOSS.asyncUpload('keepdraw', objectKey, filePath)
      .then(e => {
        resolve(objectKey);
      })
      .catch(e => {
        reject(e);
      });
  });

/**
 * downloadImage 下载图片
 * @param {string} objectKey 图片存储的连接
 */

export const downloadImage = objectKey =>
  new Promise((resolve, reject) => {
    // 加入持久化存储，因为阿里云没有自定义域名，无法获取预览图片能力。
    global.storage
      .load({
        key: objectKey,
      })
      .then(res => {
        resolve(res.src);
      })
      .catch(() => {
        // 初始化oss信息
        const configuration = {
          maxRetryCount: 3,
          timeoutIntervalForRequest: 30,
          timeoutIntervalForResource: 24 * 60 * 60,
        };

        AliyunOSS.initWithPlainTextAccessKey(
          'LTAI4Fe3L5JruU7SC1Wesgbh',
          'HMfxOCJqvA0nqbndEYJi0cHFJhMgOs',
          'oss-cn-shenzhen.aliyuncs.com',
          configuration,
        );

        AliyunOSS.asyncDownload('keepdraw', objectKey)
          .then(e => {
            const res = `file://${e}`;
            global.storage.save({
              key: objectKey,
              data: {
                src: res,
              },
            });
            resolve(res);
          })
          .catch(e => {
            reject(false);
          });
      });
  });

// 图片选择配置
const selectImageConfig = {
  title: '图片上传',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照上传',
  chooseFromLibraryButtonTitle: '选择图片上传',
  mediaType: 'photo',
  quality: 1,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  permissionDenied: {
    title: '获取拍照权限',
    text: '获取拍照权限，拍照后上传',
    reTryTitle: '重试',
    okTitle: '确认',
  },
};
/**
 * selectImage 选择图片
 * @param {number} storageType 存储分类 0: 头像, 1: 画册, 2: 临摹
 */
export const selectImage = async (callBack, storageType) => {
  const storageTypes = ['avatar', 'draws', 'copyDraws'];
  ImagePicker.showImagePicker(selectImageConfig, async response => {
    if (response.didCancel) {
      console.log('用户取消选择图片');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let image_type = '';
      const is_image = _.some(['jpeg', 'png', 'jpg'], i => {
        const res = response.type.indexOf(i) !== -1;
        image_type = res ? i : '';
        return res;
      });

      if (is_image) {
        const img_id = uuid.v4();
        const typrSort = storageTypes[storageType];
        if (!typrSort) {
          return false;
        }
        getLoginInfo().then(res => {
          uploadImage(
            `image/${typrSort}/${res.phone}/${img_id}.${image_type}`,
            response.uri,
          )
            .then(r => {
              callBack({ path: response.uri, uri: r });
            })
            .catch(() => {
              callBack(false);
            });
        });
      } else {
        return false;
      }
    }
  });
};
