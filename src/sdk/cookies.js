export const setCookie = (cname, cvalue) => {
  var cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1 * 12 * 60 * 60 * 1000);
  document.cookie = `${cname}=${cvalue}; expires=${cookieExpires}; Path=/;`;
};

export function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
