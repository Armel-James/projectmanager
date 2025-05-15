function removeLoader(element) {
    setTimeout(function() {
      element.style.transition = '.5s';
      element.style.opacity = '0';
      element.style.visibility = 'hidden';
    }, 1000);
}

export default removeLoader;