function sendToSlack(message) {
  const webhook_url = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL');
  const channel_name = '#' + PropertiesService.getScriptProperties().getProperty('CHANNEL_NAME');
  const app_user_name = PropertiesService.getScriptProperties().getProperty('APP_USER_NAME');
  
  const payload = {
    'channel'    : channel_name,
    'text'       : message,
    'username'   : app_user_name,
    'icon_emoji' : ''
  };

  const params = {
    'method' : 'post',
    'payload' : JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(webhook_url, params);
}

function main() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();

  for (i = 2; i <= lastRow; i++) {
    const dateCell = sheet.getRange(i, 2);
    const contentCell = sheet.getRange(i, 3);

    const date = dateCell.getValue()
    const eventDate = Utilities.formatDate(date, 'Asia/Tokyo', 'MM-dd');
    const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM-dd');
    var displayDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日');

    var content = contentCell.getValue();
    var message = '【' + displayDate + '】' + content;
  
    if (eventDate == today) {
      sendToSlack(message);
    };
  };
}