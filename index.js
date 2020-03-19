Telegram = require('node-telegram-bot-api');
const dbot = require('dbot-js');
var axios=require('axios');
const token = '974882871:AAHV0SoiLOfOXtm2hHCvWHIk_M-m69SKkiY';
const bot = new Telegram(token, { polling: true });
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const tgl = msg.date;
    if(msg.chat.username){
        var name=msg.chat.username.toString();
    }else{
        var name='empty';
    };
    const fname = msg.chat.first_name.toString();
    var message = msg.text.toString();
    const pesan = msg.text.toString();
    axios.post('http://localhost/TelegramWebAdmin/public/api/tambah',{
    	chat_id:chatId,
    	username:name,
    	message:message,
    	date:tgl,
        first_name:fname
    })
    .then(response=>{
        console.log('Inserted : '+response.status);
    });
    axios.get("https://api.telegram.org/bot974882871:AAHV0SoiLOfOXtm2hHCvWHIk_M-m69SKkiY/sendMessage?parse_mode=markdown&chat_id=993032110&text=New Message to bot%0Aname : "+fname+"%0Amessage : "+pesan)
    .then(response=>{
        console.log('notified');
    });
    axios.post(`http://localhost/TelegramWebAdmin/public/api/send`,{msg:message})
    .then(response=>{
        axios.get("https://api.telegram.org/bot974882871:AAHV0SoiLOfOXtm2hHCvWHIk_M-m69SKkiY/sendMessage?parse_mode=markdown&chat_id="+chatId+"&text="+response.data.msg)
        .then(response=>{
            console.log('replied to'+' '+name+'; Chat ID : '+chatId);
        });
    })
});