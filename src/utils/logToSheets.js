const GS_URL = 'https://script.google.com/macros/s/AKfycbzTOMuSjcaVrIpSMBFxSggrbr1GVpbig6pZEjXdpKQz_9SOSbgyWn_P0tJbq53ciFP0gQ/exec'

export function logToSheets({ name, phone, zhk = '' }) {
  fetch(GS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, zhk }),
  }).catch(() => {})
}
