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
  'ADD_BOX'(state,newElement) {
    if (newElement.mode==='free') {
         const scene = document.getElementById('editor')
         const box = document.createElement('a-box');
         box.setAttribute("position", "0 -1 4")
         box.setAttribute("rotation", "0 45 0")
         box.setAttribute("color", "red")
         box.setAttribute("id", "box" + state.editing.box)
         box.setAttribute("scale", "1 1 1")
         box.classList.add("element")
         box.setAttribute("startTime", "0")
         box.setAttribute("endTime", newElement.duration)
         scene.appendChild(box);
         state.editing.shapesList.splice(0, 0, {
             image: '/src/assets/box.png',
             type: 'box ' + state.editing.box,
             id: 'box' + state.editing.box
           }),
           state.editing.box++
    }else{
      var index = state.editing.tagsList.findIndex(function (element) {
        return (element.id == newElement.mode)
      });
      const scene = document.getElementById('editor')
      const box = document.createElement('a-box');
      box.setAttribute("position", "0 -1 4")
      box.setAttribute("rotation", "0 45 0")
      box.setAttribute("color", "red")
      box.setAttribute("id", "box" + state.editing.box)
      box.setAttribute("scale", "1 1 1")
      box.classList.add(newElement.mode)
      const tag = document.getElementById(newElement.mode)
      box.setAttribute("startTime", tag.getAttribute('startTime'))
      box.setAttribute("endTime", tag.getAttribute('endTime'))
      scene.appendChild(box);
      state.editing.tagsList[index].shapes.splice(0, 0, {
          image: '/src/assets/box.png',
          type: 'box ' + state.editing.box,
          id: 'box' + state.editing.box
        }),
        state.editing.box++
    }

  },
  'ADD_SPHERE'(state, newElement) {

      if (newElement.mode === 'free') {
        const scene = document.getElementById('editor')
        const sphere = document.createElement('a-sphere');
        sphere.setAttribute("position", "2 4 8")
        sphere.setAttribute("rotation", "0 45 0")
        sphere.setAttribute("color", "red")
        sphere.setAttribute("id", "sphere" + state.editing.sphere)
        sphere.setAttribute("scale", "1 1 1")
        sphere.classList.add("element")
        sphere.setAttribute("startTime", "0")
        sphere.setAttribute("endTime", newElement.duration)
        scene.appendChild(sphere);
        state.editing.shapesList.splice(0, 0, {
            image: '/src/assets/sphere.png',
            type: 'sphere ' + state.editing.sphere,
            id: 'sphere' + state.editing.sphere
          }),
          state.editing.sphere++
      } else {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == newElement.mode)
        });
        const scene = document.getElementById('editor')
        const sphere = document.createElement('a-sphere');
        sphere.setAttribute("position", "2 4 8")
        sphere.setAttribute("rotation", "0 45 0")
        sphere.setAttribute("color", "red")
        sphere.setAttribute("id", "sphere" + state.editing.sphere)
        sphere.setAttribute("scale", "1 1 1")
        sphere.classList.add(newElement.mode)
        const tag = document.getElementById(newElement.mode)
        sphere.setAttribute("startTime", tag.getAttribute('startTime'))
        sphere.setAttribute("endTime", tag.getAttribute('endTime'))
        scene.appendChild(sphere);
        state.editing.tagsList[index].shapes.splice(0, 0, {
            image: '/src/assets/sphere.png',
            type: 'sphere ' + state.editing.sphere,
            id: 'sphere' + state.editing.sphere
          }),
          state.editing.sphere++
      }
  },
  'ADD_CONE'(state, newElement) {

      if (newElement.mode === 'free') {
        const scene = document.getElementById('editor')
        const cone = document.createElement('a-cone');
        cone.setAttribute("position", "0 -1 4")
        cone.setAttribute("rotation", "0 45 0")
        cone.setAttribute("color", "red")
        cone.setAttribute("id", "cone" + state.editing.cone)
        cone.setAttribute("scale", "1 1 1")
        cone.classList.add("element")
        cone.setAttribute("startTime", "0")
        cone.setAttribute("endTime", newElement.duration)
        scene.appendChild(cone);
        state.editing.shapesList.splice(0, 0, {
            image: '/src/assets/cone.png',
            type: 'cone ' + state.editing.cone,
            id: 'cone' + state.editing.cone
          }),
          state.editing.cone++
      } else {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == newElement.mode)
        });
        const scene = document.getElementById('editor')
        const cone = document.createElement('a-cone');
        cone.setAttribute("position", "0 -1 4")
        cone.setAttribute("rotation", "0 45 0")
        cone.setAttribute("color", "red")
        cone.setAttribute("id", "cone" + state.editing.cone)
        cone.setAttribute("scale", "1 1 1")
        cone.classList.add(newElement.mode)
        const tag = document.getElementById(newElement.mode)
        cone.setAttribute("startTime", tag.getAttribute('startTime'))
        cone.setAttribute("endTime", tag.getAttribute('endTime'))
        scene.appendChild(cone);
        state.editing.tagsList[index].shapes.splice(0, 0, {
            image: '/src/assets/cone.png',
            type: 'cone ' + state.editing.cone,
            id: 'cone' + state.editing.cone
          }),
          state.editing.cone++
      }
  },
  'ADD_CYLINDER'(state, newElement) {

        if (newElement.mode === 'free') {
          const scene = document.getElementById('editor')
          const cylinder = document.createElement('a-cylinder');
          cylinder.setAttribute("position", "0 -1 4")
          cylinder.setAttribute("rotation", "0 45 0")
          cylinder.setAttribute("color", "red")
          cylinder.setAttribute("id", "cylinder" + state.editing.cylinder)
          cylinder.setAttribute("scale", "1 1 1")
          cylinder.classList.add("element")
          cylinder.setAttribute("startTime", "0")
          cylinder.setAttribute("endTime", newElement.duration)
          scene.appendChild(cylinder);
          state.editing.shapesList.splice(0, 0, {
              image: '/src/assets/cylinder.png',
              type: 'cylinder ' + state.editing.cylinder,
              id: 'cylinder' + state.editing.cylinder
            }),
            state.editing.cylinder++
        } else {
          var index = state.editing.tagsList.findIndex(function (element) {
            return (element.id == newElement.mode)
          });
          const scene = document.getElementById('editor')
          const cylinder = document.createElement('a-cylinder');
          cylinder.setAttribute("position", "0 -1 4")
          cylinder.setAttribute("rotation", "0 45 0")
          cylinder.setAttribute("color", "red")
          cylinder.setAttribute("id", "cylinder" + state.editing.cylinder)
          cylinder.setAttribute("scale", "1 1 1")
          cylinder.classList.add(newElement.mode)
          const tag = document.getElementById(newElement.mode)
          cylinder.setAttribute("startTime", tag.getAttribute('startTime'))
          cylinder.setAttribute("endTime", tag.getAttribute('endTime'))
          scene.appendChild(cylinder);
          state.editing.tagsList[index].shapes.splice(0, 0, {
              image: '/src/assets/cylinder.png',
              type: 'box ' + state.editing.cylinder,
              id: 'cylinder' + state.editing.cylinder
            }),
            state.editing.cylinder++
        }
  },
  'ADD_TORUS'(state, newElement) {

      if (newElement.mode === 'free') {
        const scene = document.getElementById('editor')
        const torus = document.createElement('a-torus');
        torus.setAttribute("position", "0 -1 4")
        torus.setAttribute("rotation", "0 45 0")
        torus.setAttribute("color", "red")
        torus.setAttribute("id", "torus" + state.editing.torus)
        torus.setAttribute("scale", "1 1 1")
        torus.classList.add("element")
        torus.setAttribute("startTime", "0")
        torus.setAttribute("endTime", newElement.duration)
        scene.appendChild(torus);
        state.editing.shapesList.splice(0, 0, {
            image: '/src/assets/torus.png',
            type: 'torus ' + state.editing.torus,
            id: 'torus' + state.editing.torus
          }),
          state.editing.torus++
      } else {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == newElement.mode)
        });
        const scene = document.getElementById('editor')
        const torus = document.createElement('a-torus');
        torus.setAttribute("position", "0 -1 4")
        torus.setAttribute("rotation", "0 45 0")
        torus.setAttribute("color", "red")
        torus.setAttribute("id", "torus" + state.editing.torus)
        torus.setAttribute("scale", "1 1 1")
        torus.classList.add(newElement.mode)
        const tag = document.getElementById(newElement.mode)
        torus.setAttribute("startTime", tag.getAttribute('startTime'))
        torus.setAttribute("endTime", tag.getAttribute('endTime'))
        scene.appendChild(torus);
        state.editing.tagsList[index].shapes.splice(0, 0, {
            image: '/src/assets/torus.png',
            type: 'torus ' + state.editing.torus,
            id: 'torus' + state.editing.torus
          }),
          state.editing.torus++
      }
  },
  'ADD_TORUS_KNOT'(state, newElement) {

      if (newElement.mode === 'free') {
        const scene = document.getElementById('editor')
        const torusKnot = document.createElement('a-torus-knot');
        torusKnot.setAttribute("position", "0 -1 4")
        torusKnot.setAttribute("rotation", "0 45 0")
        torusKnot.setAttribute("color", "red")
        torusKnot.setAttribute("id", "torusKnot" + state.editing.torusKnot)
        torusKnot.setAttribute("scale", "1 1 1")
        torusKnot.classList.add("element")
        torusKnot.setAttribute("startTime", "0")
        torusKnot.setAttribute("endTime", newElement.duration)
        scene.appendChild(torusKnot);
        state.editing.shapesList.splice(0, 0, {
            image: '/src/assets/torus-knot.jpg',
            type: 'torusKnot ' + state.editing.torusKnot,
            id: 'torusKnot' + state.editing.torusKnot
          }),
          state.editing.torusKnot++
      } else {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == newElement.mode)
        });
        const scene = document.getElementById('editor')
        const torusKnot = document.createElement('a-torus-knot');
        torusKnot.setAttribute("position", "0 -1 4")
        torusKnot.setAttribute("rotation", "0 45 0")
        torusKnot.setAttribute("color", "red")
        torusKnot.setAttribute("id", "torusKnot" + state.editing.torusKnot)
        torusKnot.setAttribute("scale", "1 1 1")
        torusKnot.classList.add(newElement.mode)
        const tag = document.getElementById(newElement.mode)
        torusKnot.setAttribute("startTime", tag.getAttribute('startTime'))
        torusKnot.setAttribute("endTime", tag.getAttribute('endTime'))
        scene.appendChild(torusKnot);
        state.editing.tagsList[index].shapes.splice(0, 0, {
            image: '/src/assets/torus-knot.jpg',
            type: 'torusKnot ' + state.editing.torusKnot,
            id: 'torusKnot' + state.editing.torusKnot
          }),
          state.editing.torusKnot++
      }
  },
  'ADD_DODECAHEDRON'(state, newElement) {

      if (newElement.mode === 'free') {
        const scene = document.getElementById('editor')
        const dodecahedron = document.createElement('a-dodecahedron');
        dodecahedron.setAttribute("position", "0 -1 4")
        dodecahedron.setAttribute("rotation", "0 45 0")
        dodecahedron.setAttribute("color", "red")
        dodecahedron.setAttribute("id", "dodecahedron" + state.editing.dodecahedron)
        dodecahedron.setAttribute("scale", "1 1 1")
        dodecahedron.classList.add("element")
        dodecahedron.setAttribute("startTime", "0")
        dodecahedron.setAttribute("endTime", newElement.duration)
        scene.appendChild(dodecahedron);
        state.editing.shapesList.splice(0, 0, {
            image: '/src/assets/dodecahedron.png',
            type: 'dodecahedron ' + state.editing.dodecahedron,
            id: 'dodecahedron' + state.editing.dodecahedron
          }),
          state.editing.dodecahedron++
      } else {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == newElement.mode)
        });
        const scene = document.getElementById('editor')
        const dodecahedron = document.createElement('a-dodecahedron');
        dodecahedron.setAttribute("position", "0 -1 4")
        dodecahedron.setAttribute("rotation", "0 45 0")
        dodecahedron.setAttribute("color", "red")
        dodecahedron.setAttribute("id", "dodecahedron" + state.editing.dodecahedron)
        dodecahedron.setAttribute("scale", "1 1 1")
        dodecahedron.classList.add(newElement.mode)
        const tag = document.getElementById(newElement.mode)
        dodecahedron.setAttribute("startTime", tag.getAttribute('startTime'))
        dodecahedron.setAttribute("endTime", tag.getAttribute('endTime'))
        scene.appendChild(dodecahedron);
        state.editing.tagsList[index].shapes.splice(0, 0, {
            image: '/src/assets/dodecahedron.png',
            type: 'dodecahedron ' + state.editing.dodecahedron,
            id: 'dodecahedron' + state.editing.dodecahedron
          }),
          state.editing.dodecahedron++
      }
  },
  'ADD_TETRAHEDRON'(state, newElement) {

      if (newElement.mode === 'free') {
        const scene = document.getElementById('editor')
        const tetrahedron = document.createElement('a-tetrahedron');
        tetrahedron.setAttribute("position", "0 -1 4")
        tetrahedron.setAttribute("rotation", "0 45 0")
        tetrahedron.setAttribute("color", "red")
        tetrahedron.setAttribute("id", "tetrahedron" + state.editing.tetrahedron)
        tetrahedron.setAttribute("scale", "1 1 1")
        tetrahedron.classList.add("element")
        tetrahedron.setAttribute("startTime", "0")
        tetrahedron.setAttribute("endTime", newElement.duration)
        scene.appendChild(tetrahedron);
        state.editing.shapesList.splice(0, 0, {
            image: '/src/assets/tetrahedron.png',
            type: 'tetrahedron ' + state.editing.tetrahedron,
            id: 'tetrahedron' + state.editing.tetrahedron
          }),
          state.editing.tetrahedron++
      } else {
        var index = state.editing.tagsList.findIndex(function (element) {
          return (element.id == newElement.mode)
        });
        const scene = document.getElementById('editor')
        const tetrahedron = document.createElement('a-tetrahedron');
        tetrahedron.setAttribute("position", "0 -1 4")
        tetrahedron.setAttribute("rotation", "0 45 0")
        tetrahedron.setAttribute("color", "red")
        tetrahedron.setAttribute("id", "tetrahedron" + state.editing.tetrahedron)
        tetrahedron.setAttribute("scale", "1 1 1")
        tetrahedron.classList.add(newElement.mode)
        const tag = document.getElementById(newElement.mode)
        tetrahedron.setAttribute("startTime", tag.getAttribute('startTime'))
        tetrahedron.setAttribute("endTime", tag.getAttribute('endTime'))
        scene.appendChild(tetrahedron);
        state.editing.tagsList[index].shapes.splice(0, 0, {
            image: '/src/assets/tetrahedron.png',
            type: 'tetrahedron ' + state.editing.tetrahedron,
            id: 'tetrahedron' + state.editing.tetrahedron
          }),
          state.editing.tetrahedron++
      }
  },
}

const actions = {
  initProjects: ({commit}) => {
    commit('SET_PROJECTS', projects)
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
  addBox: ({commit},newElement)=>{
    commit('ADD_BOX',newElement)
  },
  addSphere: ({commit},newElement)=>{
    commit('ADD_SPHERE', newElement)
  },
  addCone: ({commit},newElement)=>{
    commit('ADD_CONE', newElement)
  },
  addCylinder: ({commit},newElement)=>{
    commit('ADD_CYLINDER', newElement)
  },
  addTorus: ({commit},newElement)=>{
    commit('ADD_TORUS', newElement)
  },
  addTorusKnot: ({commit},newElement)=>{
    commit('ADD_TORUS_KNOT', newElement)
  },
  addDodecahedron: ({commit},newElement)=>{
    commit('ADD_DODECAHEDRON', newElement)
  },
  addTetrahedron: ({commit},newElement)=>{
    commit('ADD_TETRAHEDRON', newElement)
  },
}

export const project = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

