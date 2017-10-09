export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Zarrina',
        avatar: 'https://image.ibb.co/jr0ETw/20171008_182649.jpg',
        uid: 'zarrina',
      })
    }, 2000)
  })
}

export function checkIfAuthed (store) {
  return store.getState().isAuthed
}
