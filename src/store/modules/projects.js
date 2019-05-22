import {projectService} from '../../services/projectService'
import projects from '../../data/projects'
import shapes from '../../data/shapes'
import pictures from '../../data/pictures'
import videos from '../../data/2dVideos'
import fonts from '../../data/fonts'

const state = {
  projects: [],
  shapes:[],
  pictures: [],
  videos: [],
  fonts: [],
  editing: {},
  projectCount:0,
  projectLoading: false
}

const getters = {

}

const mutations = {
  SET_LOADING(state, loading) {
    state.projectLoading = loading
  },
  'SET_PROJECTS'(state, {data,count}) {
    state.projects = data;
    state.projectCount=count
  },
  'SET_SHAPES'(state, shapes) {
    state.shapes = shapes;
  },
  'SET_PICTURES'(state, pictures) {
    state.pictures = pictures;
  },
  'SET_VIDEOS'(state, videos) {
    state.videos = videos;
  },
  'SET_FONTS'(state, fonts) {
    state.fonts = fonts;
  },
  'LOAD_PROJECT'(state, projectId) {
    state.editing = state.projects.filter(project => {
      return project.projectId == projectId
    })[0]
  },
  'DELETE_ELEMENT'(state, id) {
    var scene = null
    if (id.includes('text')) {
      scene = document.getElementById('text')
    } else {
      scene = document.getElementById('editor')
    }
    const element = document.getElementById(id);
    if (id.includes("tag")) {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == id)
        });
        state.editing.tagsList.splice(index, 1)
        var entities = Array.from(scene.querySelectorAll('.' + id))
        entities.forEach((entity) => {
          scene.removeChild(entity)
        });
    }else{
      var elementClass = element.getAttribute("class")
      if (elementClass=="element") {
          var index = state.editing.shapesList.findIndex(function (element) {
            return (element.id == id)
          });
          state.editing.shapesList.splice(index, 1)
      }else{
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == elementClass)
        });
        state.editing.tagsList[index].shapes.splice(index, 1)
      }

    }
    scene.removeChild(element)

  },
  'ADD_TAG'(state, duration) {
    const scene = document.getElementById('editor')
    const tag = document.createElement('a-image');
    tag.setAttribute("position", "0 1 4")
    tag.setAttribute("rotation", "0 0 0")
    tag.setAttribute("src", "/src/assets/info.png")
    // tag.setAttribute("src", "/src/assets/tag.png")
    tag.setAttribute("id", "tag" + state.editing.tag)
    tag.setAttribute("scale", "1 1 1")
    tag.classList.add("element")
    tag.classList.add("clickable")
    tag.setAttribute("toggle-visibility", ".tag" + state.editing.tag)
    tag.setAttribute("animation", "property: scale;  to: 1.5 1.5 1.5; loop: true; dur: 1000")
    tag.setAttribute("rotate", "")
    tag.setAttribute("startTime", "0")
    tag.setAttribute("endTime", duration)
    scene.appendChild(tag);
    state.editing.tagsList.splice(0, 0, {
        id: 'tag' + state.editing.tag,
        shapes: []
      }),
      state.editing.tag++
  },
  'ADD_ELEMENT'(state,newElement) {
    if (newElement.mode==='free') {
      var scene = null
      if (newElement.element.type=='text') {
        scene = document.getElementById('text')
      }else{
        scene = document.getElementById('editor')
      }
         const element = document.createElement('a-'+newElement.element.type);
         element.setAttribute("position", "0 -1 4")
         element.setAttribute("rotation", "0 0 0")
         element.setAttribute("id", newElement.element.type + state.editing.shapes.get(newElement.element.type))
         element.setAttribute("scale", "1 1 1")
         element.classList.add("element")
         element.setAttribute("startTime", "0")
         element.setAttribute("endTime", newElement.duration)
         if (newElement.element.type=='image') {
          element.setAttribute("src", newElement.element.src)
          element.setAttribute("width",   3)
          element.setAttribute("height", 3 / newElement.element.ratio)
         }
         if (newElement.element.type == 'video') {
           element.setAttribute("src", newElement.element.src)
          element.setAttribute("width",   3)
          element.setAttribute("height", 3 / newElement.element.ratio)
         }
         if (newElement.element.type == 'text') {
            element.setAttribute("font", newElement.element.font)
            element.setAttribute("value", 'Some text here!')
         }
         scene.appendChild(element);
         if (newElement.element.type == 'video') {
            state.editing.shapesList.splice(0, 0, {
              image: newElement.element.thumbnail,
              type: newElement.element.type + ' ' + state.editing.shapes.get(newElement.element.type),
              id: newElement.element.type + state.editing.shapes.get(newElement.element.type)
            })
         }else{
           state.editing.shapesList.splice(0, 0, {
             image: newElement.element.src,
             type: newElement.element.type + ' ' + state.editing.shapes.get(newElement.element.type),
             id: newElement.element.type + state.editing.shapes.get(newElement.element.type)
           })
         }

           state.editing.shapes.set(newElement.element.type, state.editing.shapes.get(newElement.element.type)+1)
    }else{
      var index = state.editing.tagsList.findIndex(function (element) {
        return (element.id == newElement.mode)
      });
      var scene = null
      if (newElement.element.type == 'text') {
        scene = document.getElementById('text')
      } else {
        scene = document.getElementById('editor')
      }
      const element = document.createElement('a-'+newElement.element.type);
      element.setAttribute("position", "0 -1 4")
      element.setAttribute("rotation", "0 0 0")
      element.setAttribute("id", newElement.element.type + state.editing.shapes.get(newElement.element.type))
      element.setAttribute("scale", "1 1 1")
      element.classList.add(newElement.mode)
      const tag = document.getElementById(newElement.mode)
      element.setAttribute("startTime", tag.getAttribute('startTime'))
      element.setAttribute("endTime", tag.getAttribute('endTime'))
      if (newElement.element.type == 'image') {
        element.setAttribute("src", newElement.element.src)
        element.setAttribute("width", 3)
        element.setAttribute("height", 3 / newElement.element.ratio)
      }
      if (newElement.element.type == 'video') {
        element.setAttribute("src", newElement.element.src)
        element.setAttribute("width", 3)
        element.setAttribute("height", 3 / newElement.element.ratio)
      }
      if (newElement.element.type == 'text') {
        element.setAttribute("font", newElement.element.font)
        element.setAttribute("value", 'Some text here!')
      }
      scene.appendChild(element);
      if (newElement.element.type == 'video') {
        state.editing.tagsList[index].shapes.splice(0, 0, {
          image: newElement.element.thumbnail,
          type: newElement.element.type + ' ' + state.editing.shapes.get(newElement.element.type),
          id: newElement.element.type + state.editing.shapes.get(newElement.element.type)
        })
      } else {
        state.editing.tagsList[index].shapes.splice(0, 0, {
          image: newElement.element.src,
          type: newElement.element.type + ' ' + state.editing.shapes.get(newElement.element.type),
          id: newElement.element.type + state.editing.shapes.get(newElement.element.type)
        })
      }
        state.editing.shapes.set(newElement.element.type,state.editing.shapes.get(newElement.element.type)+1 )
    }

  },
  'ADD_PICTURE'(state,picture) {
    state.pictures.splice(0,0,picture)
  },
  'ADD_VIDEO'(state, video) {
    state.videos.splice(0, 0, video)
  },
  'ADD_PROJECT'(state, projects) {
    state.projects.splice(0, 0, projects)
  },
}

const actions = {
  setProjects: ({commit}, request) => {
    commit('SET_LOADING', true)
    projectService.fetchProjects(request).then((data) => {

      commit('SET_LOADING', false)
      commit('SET_PROJECTS', {
        count: data.data.count,
        data: data.data.response.data
      })
    })
  },
  initShapes: ({commit}) => {
    commit('SET_SHAPES', shapes)
  },
  initPictures: ({commit}) => {
    commit('SET_PICTURES', pictures)
  },
  initVideos: ({commit}) => {
    commit('SET_VIDEOS', videos)
  },
  initFonts: ({commit}) => {
    commit('SET_FONTS', fonts)
  },
  loadProject: ({commit},projectId)=>{
    commit('LOAD_PROJECT',projectId)
  },
  deleteElement: ({commit},id)=>{
    commit('DELETE_ELEMENT', id)
  },
  addTag: ({commit},duration)=>{
    commit('ADD_TAG',duration)
  },
  addElement: ({commit},newElement)=>{
    commit('ADD_ELEMENT',newElement)
  },
  addPicture: ({commit},picture)=>{
    commit('ADD_PICTURE',picture)
  },
  addVideo: ({commit},video)=>{
    commit('ADD_VIDEO',video)
  },
  addProject: ({commit},project)=>{
    commit('ADD_PROJECT',project)
  },
}

export const project = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

