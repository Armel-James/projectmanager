function removeLoader(element) {
  var loader = document.querySelector(".loader-container");
    setTimeout(function() {
      loader.style.transition = '.5s';
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 1000);
}

export default removeLoader;