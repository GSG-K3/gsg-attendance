const xhr = new XMLHttpRequest();
apiCall = (method, url, callback) => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (typeof callback === 'function') callback(xhr.responseText);
    }
  };
  xhr.open(method, url);
  xhr.send();
};
