export default () => {
  return {
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
};
