<template>
  <div>

    <div class="pos-f-t" >

      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">360° Videos Editor</a>
        <!-- <input class="form-control col--" type="search" placeholder="Search video" aria-label="Search"> -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div class="collapse navbar-collapse" id="navbarToggleExternalContent" style="width: 25%; height: 100%">
        <div class="bg-dark p-4">
          <ul class="navbar-nav mr-auto">
        <button class="btn btn-outline-success">Login</button>
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-link{
  color: white;
}
</style>


