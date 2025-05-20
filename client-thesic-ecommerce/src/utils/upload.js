import { storage } from '../firebase';


export async function uploadImage(image) {
  return new Promise((resolve, reject) => {
    const uniqueFileName = `${Date.now()}-${image.name}`
    const uploadTask = storage.ref(`images/${uniqueFileName}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {},
      (error) => {
        reject(error)
      },
      () => {
        storage.ref('images').child(uniqueFileName).getDownloadURL().then(url => {
          resolve(url);
        })
      });
  })
}

