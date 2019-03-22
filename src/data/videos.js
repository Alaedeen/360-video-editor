export default [
  {
    vidId: 0,
    userId: 3,
    userName: 'Jon Snow 1',
    profilePic: 'src/assets/Jon.png',
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
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis iaculis hendrerit. In quis luctus nibh, nec blandit enim. In iaculis, magna id pretium malesuada, magna magna viverra sem, vitae viverra lectus risus vel felis. Aenean dui purus, condimentum nec elit quis, porta tempus velit. Quisque luctus magna venenatis tellus placerat sollicitudin. Quisque interdum id lacus in tempor. Pellentesque vel sapien est. Maecenas ut justo iaculis, fringilla mauris tristique, hendrerit nunc. Donec ultrices diam in mauris aliquam, vel egestas tellus tempor. Donec pretium tellus id ligula sagittis, vitae interdum nisl semper.',
        date: {
          day: 2,
          month: 'december',
          year: 2019
        },
        likes: 0,
        dislikes: 0,
        replies: [
          {
            idReply:0,
              idUser: 1,
              nameUser: 'Lyana Stark',
              profilePic: 'src/assets/lyana.png',
              text: 'this is a reply',
              date: {
                day: 2,
                month: 'december',
                year: 2019
              },
              likes: 0,
              dislikes: 0,
          }
        ]
      }
    ],
    likes: 0,
    dislikes: 0,
    views: 100
  },
  {
    vidId: 1,
    userId: 1,
      userName: 'Lyana Stark',
      profilePic: 'src/assets/lyana.png',
    title: 'My video 1',
    uploadDate: {
      day: 2,
      month: 'december',
      year: 2019
    },
    thumbnail: 'src/assets/video.jpg',
    comments: [],
    likes: 0,
    dislikes: 0,
    views: 100
  },
  {
    vidId: 2,
    userId: 3,
      userName: 'Jon Snow 1',
      profilePic: 'src/assets/Jon.png',
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
      likes: 0,
      dislikes: 0,
      replies: []
    }],
    likes: 0,
    dislikes: 0,
    views: 100
  },
]
