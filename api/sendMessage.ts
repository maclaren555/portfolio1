import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, phone } = request.body;

  if (!name || !phone) {
    return response.status(400).json({ message: 'Name and phone are required' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // DEBUG: Log the token to verify it's correct
  console.log(`Using token: ${botToken ? botToken.substring(0, 5) + '...' + botToken.slice(-5) : 'Not Set'}`);

  if (!botToken || !chatId) {
    return response.status(500).json({ message: 'Server configuration error' });
  }

  const message = `
    Новая заявка с сайта-портфолио!
    
    Имя: ${name}
    Телефон: ${phone}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send message to Telegram');
    }

    return response.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Failed to send message' });
  }
} 