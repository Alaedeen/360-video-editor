import projects from '../../data/projects'

const state = {
  projects: [],
  editing: {}
}

const getters = {

}

const mutations = {
  'SET_PROJECTS'(state, projects) {
    state.projects = projects;
  },
  'LOAD_PROJECT'(state, projectId) {
    state.editing = state.projects.filter(project => {
      return project.projectId == projectId
    })[0]
  },
  'ADD_BOX'(state,duration) {
    const scene = document.getElementById('editor')
    const box = document.createElement('a-box');
    box.setAttribute("position", "0 -1 4")
    box.setAttribute("rotation", "0 45 0")
    box.setAttribute("color", "red")
    box.setAttribute("id", "box" + state.editing.box)
    box.setAttribute("scale", "1 1 1")
    box.classList.add("element")
    box.setAttribute("startTime", "0")
    box.setAttribute("endTime", duration)
    scene.appendChild(box);
    state.editing.shapesList.splice(0, 0, {
        image: '/src/assets/box.png',
        type: 'box ' + state.editing.box,
        id: 'box' + state.editing.box
      }),
      state.editing.box++
  },
}

const actions = {
  initProjects: ({commit}) => {
    commit('SET_PROJECTS', projects)
  },
  loadProject: ({commit},projectId)=>{
    commit('LOAD_PROJECT',projectId)
  },
  addBox: ({commit},duration)=>{
    commit('ADD_BOX',duration)
  }
}

export const project = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

