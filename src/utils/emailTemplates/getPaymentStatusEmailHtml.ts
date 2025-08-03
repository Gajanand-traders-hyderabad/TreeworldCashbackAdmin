import sendEmail from "@/utils/nodeMailer";

export default async function sendPaymentStatusEmail(
  status: "COMPLETED" | "FAILED" | "PENDING" | string,
  email: string
) {
  const shopName = "Gajanand Traders";

  if (
    (status === "COMPLETED" || status === "FAILED" || status === "PENDING") &&
    email &&
    email.length > 4
  ) {
    const messages = {
      COMPLETED: {
        fg: "#2e7d32",
        bg: "#e8f5e9",
        label: "COMPLETED",
        english: `🎉 Congratulations! Your cashback has been successfully credited to your account.<br/>Thank you for your patience and trust.`,
        hindi: `🎉 बधाई हो! आपका कैशबैक सफलतापूर्वक आपके खाते में जमा कर दिया गया है।<br/>आपके विश्वास के लिए धन्यवाद।`,
      },
      FAILED: {
        fg: "#c62828",
        bg: "#fdecea",
        label: "FAILED",
        english: `❌ The UPI ID you provided appears to be incorrect.<br/>Please contact the shop to resolve the issue.`,
        hindi: `❌ आपने जो UPI ID दी है वह गलत प्रतीत हो रही है।<br/>कृपया समस्या के समाधान के लिए दुकान से संपर्क करें।`,
      },
      PENDING: {
        fg: "#f9a825",
        bg: "#fffde7",
        label: "PENDING",
        english: `💥 Ding ding! Your payment is awaiting confirmation.<br/>Thanks for filling out the cashback form! We’ve received your details and your cashback is being processed.<br/>Please allow up to <strong>48 working hours</strong> for completion.<br/>This may take up to <strong>7 working days</strong> depending on processing time.<br/><br/>🔒 Your data is private and secure with us.`,
        hindi: `💥 डिंग डिंग! भुगतान की पुष्टि लंबित है।<br/>कैशबैक फॉर्म भरने के लिए धन्यवाद! हमें आपकी जानकारी मिल गई है और आपका कैशबैक प्रोसेस में है।<br/>कृपया इसे पूरा होने के लिए <strong>48 कार्य घंटों</strong> तक का समय दें।<br/>प्रोसेसिंग समय के आधार पर इसमें <strong>7 कार्य दिवस</strong> तक भी लग सकते हैं।<br/><br/>🔒 आपकी जानकारी हमारे पास पूरी तरह सुरक्षित और गोपनीय है।`,
      },
    };

    const message = messages[status as keyof typeof messages] || messages.PENDING;

    const html = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 600px;
        margin: 40px auto;
        background: #fdfaf6;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
        color: #333;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #a67c52, #6b4f3a);
          padding: 28px;
          color: white;
          text-align: center;
        ">
          <h2 style="margin: 0; font-size: 24px;">
            ${shopName} - Payment Status: ${message.label}
          </h2>
        </div>

        <!-- Body -->
        <div style="padding: 32px; text-align: center;">
          <div style="
            background-color: ${message.bg};
            color: ${message.fg};
            font-weight: 600;
            display: inline-block;
            padding: 10px 24px;
            font-size: 20px;
            border-radius: 30px;
            margin: 16px 0;
          ">
            ${message.label}
          </div>

          <div style="margin-top: 30px; font-size: 16px; line-height: 1.7;">
            <p>${message.english}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
            <p>${message.hindi}</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="
          background: #f0e6d6;
          text-align: center;
          padding: 16px;
          font-size: 13px;
          color: #6b5130;
          font-style: italic;
        ">
          &copy; ${new Date().getFullYear()} ${shopName}. All rights reserved.
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: `📩 ${shopName} – Your payment status: ${status}`,
      html,
    });
  } else {
    console.warn(
      `Email not sent - invalid status or email: status=${status}, email=${email}`
    );
  }
}
