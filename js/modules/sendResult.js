export const ResultSend = (message, token, chat_id) => {
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-url'
        }
    })
}