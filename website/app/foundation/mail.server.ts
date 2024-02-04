import { to } from '@resolid/mix-utils';

export type SendTo = {
  name?: string;
  email: string;
};

export type EmailTextContent = {
  textContent: string;
  htmlContent?: string;
};

export type EmailHtmlContent = {
  textContent?: string;
  htmlContent: string;
};

export type EmailAttachmentUrl = {
  url: string;
};

export type EmailAttachmentFile = {
  name: string;
  content: string;
};

export const sendEmail = async (
  sendTo: SendTo | SendTo[],
  subject: string,
  content: EmailTextContent | EmailHtmlContent,
  attachments?: (EmailAttachmentUrl | EmailAttachmentFile)[],
): Promise<{ success: boolean; message: string }> => {
  const url = 'https://api.brevo.com/v3/smtp/email';

  const apiKey = process.env.RX_EMAIL_BREVO_API_KEY;

  if (!apiKey || apiKey == '') {
    throw new Error('要发送邮件请先设置 RX_EMAIL_BREVO_API_KEY 环境变量');
  }

  const senderName = process.env.RX_EMAIL_SENDER_NAME;

  if (!senderName || senderName == '') {
    throw new Error('要发送邮件请先设置 RX_EMAIL_SENDER_NAME 环境变量');
  }

  const senderEmail = process.env.RX_EMAIL_SENDER_EMAIL;

  if (!senderEmail || senderEmail == '') {
    throw new Error('要发送邮件请先设置 RX_EMAIL_SENDER_EMAIL 环境变量');
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.RX_EMAIL_BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: Array.isArray(sendTo) ? sendTo : [sendTo],
      textContent: content.textContent,
      htmlContent: content.htmlContent,
      subject: subject,
      attachment: attachments,
    }),
  } as RequestInit;

  const [error, response] = await to<Response>(fetch(url, options));

  if (error) {
    return {
      success: false,
      message: '发送邮件失败:' + error.message,
    };
  }

  if (response) {
    if (response.status == 200 || response.status == 201) {
      return {
        success: true,
        message: '发送邮件成功',
      };
    }

    return {
      success: false,
      message: '发送邮件失败:' + (await response.json()).message,
    };
  }

  return {
    success: false,
    message: '发送邮件失败, 未知错误',
  };
};
