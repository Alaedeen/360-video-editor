export default [
  {
    vidId: 0,
    userId: 3,
    title: 'My video',
    uploadDate: {
        day: 2,
        month: 'december',
        year: 2019
    },
    thumbnail: 'src/assets/video.jpg',
    comments: [
      {
        idComment: 0,
        idUser: 1,
        nameUser: 'Lyana Stark',
        profilePic: 'src/assets/lyana.png',
        text:'this is a comment',
        date: {
          day: 2,
          month: 'december',
          year: 2019
        },
        likes: 20,
        dislikes: 10,
        replies: [
          {
            idReply: 0,
              idUser: 1,
              nameUser: 'Lyana Stark',
              profilePic: 'src/assets/lyana.png',
              text: 'this is a reply',
              date: {
                day: 2,
                month: 'december',
                year: 2019
              },
              likes: 20,
              dislikes: 10,
          }
        ]
      }
    ],
    likes: 20,
    dislikes: 10,
    views: 100
  },
  {
    vidId: 1,
    userId: 1,
    title: 'My video 1',
    uploadDate: {
      day: 2,
      month: 'december',
      year: 2019
    },
    thumbnail: 'src/assets/video.jpg',
    comments: [],
    likes: 20,
    dislikes: 10,
    views: 100
  },
  {
    vidId: 2,
    userId: 3,
    title: 'My video 2',
    uploadDate: {
      day: 2,
      month: 'december',
      year: 2019
    },
    thumbnail: 'src/assets/video.jpg',
    comments: [{
      idComment: 0,
      idUser: 1,
      nameUser: 'Lyana Stark',
      profilePic: 'src/assets/lyana.png',
      text: 'this is a comment',
      date: {
        day: 2,
        month: 'december',
        year: 2019
      },
      likes: 20,
      dislikes: 10,
      replies: []
    }],
    likes: 20,
    dislikes: 10,
    views: 100
  },
]
