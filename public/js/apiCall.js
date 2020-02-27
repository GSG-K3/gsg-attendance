const xhr = new XMLHttpRequest();
apiCall = (method, url, data, contentType, callback) => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (typeof callback === 'function') callback(xhr.responseText);
    }
  };
  xhr.open(method, url);
  if (contentType !== undefined && contentType !== null) {
    xhr.setRequestHeader('Content-Type', contentType);
  }
  xhr.send(data);
};
