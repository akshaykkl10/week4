self.onmessage = (event) => {
    const data = event.data
    // console.log(data)
    
    data.sort((a,b) => a.value - b.value);
    self.postMessage(data)
}