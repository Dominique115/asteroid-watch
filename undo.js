function saveMissionUndo(page) {
 const history = JSON.parse(sessionStorage.getItem('asteroidWatch.undo') || '[]');
 const storage = Object.fromEntries(Object.keys(sessionStorage).filter(key => key.startsWith('asteroidWatch.') && key !== 'asteroidWatch.undo').map(key => [key, sessionStorage.getItem(key)]));
 history.push({page, storage});
 sessionStorage.setItem('asteroidWatch.undo', JSON.stringify(history));
}
function undoMission() {
 const history = JSON.parse(sessionStorage.getItem('asteroidWatch.undo') || '[]');
 const previous = history.pop();
 if (!previous) return;
 for (const key of Object.keys(sessionStorage)) if (key.startsWith('asteroidWatch.') && key !== 'asteroidWatch.undo') sessionStorage.removeItem(key);
 for (const [key, value] of Object.entries(previous.storage)) sessionStorage.setItem(key, value);
 // Returning to design starts a fresh launch attempt. Older snapshots may contain a result.
 if (previous.page === 'part-2-spacecraft/index.html') sessionStorage.removeItem('asteroidWatch.launchResult');
 if (previous.state) sessionStorage.setItem('asteroidWatch.restore', JSON.stringify(previous.state));
 sessionStorage.setItem('asteroidWatch.undo', JSON.stringify(history));
 const root = location.pathname.includes('/part-2-spacecraft/') ? '../' : '';
 location.href = root + previous.page;
}
document.addEventListener('DOMContentLoaded', () => {
 const button = document.createElement('button');
 button.className = 'undo-button'; button.textContent = '← Undo'; button.title = 'Undo your last choice';
 button.onclick = undoMission;
 document.body.append(button);
});
