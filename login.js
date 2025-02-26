function signIn() {
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2Endpoint)

    let params = {
      "client_id": "452942834062-um560gq2me5vgm0uvo0bp68gruegukks.apps.googleusercontent.com",
      "redirect_uri":"https://www.projectmanager.publicvm.com/workplace.html",
      "response_type":"token",
      "scope":"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive",
      "include_granted_scopes":true,
      'state':'pass-through-value'
    }

    for(var p in params) {
      let input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.appendChild(input)
    }

    document.body.appendChild(form)

    form.submit()
}

// Navbar Scrolling effect
$(window).scroll(function(){
  $("nav").toggleClass('scrolled', $(this).scrollTop() > 50);
  });
