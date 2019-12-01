export class Logger 
{
    log(e: HTMLElement, v, color?){
        const entry = document.createElement('div');
        entry.className = 'logEntry';
        entry.style.backgroundColor = color ? color : v.color;
        entry.innerHTML = `<span class="timestamp">${getTimestamp()}</span> ${v}`;
        e.appendChild(entry);
    }

    public clear(e: HTMLElement) {
        e.innerHTML = '';
    }
}

function getTimestamp() {
    const date = new Date();
    return ('0' + date.getHours()).slice(-2) + ':'
      + ('0' + date.getMinutes()).slice(-2) + ':'
      + ('0' + date.getSeconds()).slice(-2);
  }