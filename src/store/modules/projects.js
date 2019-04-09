import projects from '../../data/projects'
import shapes from '../../data/shapes'

const state = {
  projects: [],
  shapes:[],
  editing: {}
}

const getters = {

}

const mutations = {
  'SET_PROJECTS'(state, projects) {
    state.projects = projects;
  },
  'SET_SHAPES'(state, shapes) {
    state.shapes = shapes;
  },
  'LOAD_PROJECT'(state, projectId) {
    state.editing = state.projects.filter(project => {
      return project.projectId == projectId
    })[0]
  },
  'DELETE_ELEMENT'(state, id) {
    const scene = document.getElementById('editor')
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
  'ADD_SHAPE'(state,newElement) {
    if (newElement.mode==='free') {
         const scene = document.getElementById('editor')
         const shape = document.createElement('a-'+newElement.shape.type);
         shape.setAttribute("position", "0 -1 4")
         shape.setAttribute("rotation", "0 45 0")
         shape.setAttribute("color", "red")
         shape.setAttribute("id", newElement.shape.type + state.editing.shapes.get(newElement.shape.type))
         shape.setAttribute("scale", "1 1 1")
         shape.classList.add("element")
         shape.setAttribute("startTime", "0")
         shape.setAttribute("endTime", newElement.duration)
         scene.appendChild(shape);
         state.editing.shapesList.splice(0, 0, {
             image: newElement.shape.icon,
             type: newElement.shape.type + ' ' + state.editing.shapes.get(newElement.shape.type),
             id: newElement.shape.type + state.editing.shapes.get(newElement.shape.type)
           }),
           state.editing.shapes.set(newElement.shape.type, state.editing.shapes.get(newElement.shape.type)+1)
    }else{
      var index = state.editing.tagsList.findIndex(function (element) {
        return (element.id == newElement.mode)
      });
      const scene = document.getElementById('editor')
      const shape = document.createElement('a-'+newElement.shape.type);
      shape.setAttribute("position", "0 -1 4")
      shape.setAttribute("rotation", "0 45 0")
      shape.setAttribute("color", "red")
      shape.setAttribute("id", newElement.shape.type + state.editing.shapes.get(newElement.shape.type))
      shape.setAttribute("scale", "1 1 1")
      shape.classList.add(newElement.mode)
      const tag = document.getElementById(newElement.mode)
      shape.setAttribute("startTime", tag.getAttribute('startTime'))
      shape.setAttribute("endTime", tag.getAttribute('endTime'))
      scene.appendChild(shape);
      state.editing.tagsList[index].shapes.splice(0, 0, {
          image: newElement.shape.icon,
          type: newElement.shape.type + ' ' + state.editing.shapes.get(newElement.shape.type),
          id: newElement.shape.type + state.editing.shapes.get(newElement.shape.type)
        }),
        state.editing.shapes.set(newElement.shape.type,state.editing.shapes.get(newElement.shape.type)+1 )
    }

  },
}

const actions = {
  initProjects: ({commit}) => {
    commit('SET_PROJECTS', projects)
  },
  initShapes: ({commit}) => {
    commit('SET_SHAPES', shapes)
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
  addShape: ({commit},newElement)=>{
    commit('ADD_SHAPE',newElement)
  },
}

export const project = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

