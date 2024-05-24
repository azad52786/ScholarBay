Your code looks mostly correct for verifying a webhook signature using HMAC with SHA-256 in Node.js. However, there's a small issue with the way you're verifying the signature.

In your code, you're computing the HMAC digest of the request body using the webhooksecret. Then you're comparing this computed digest with the signature received in the request headers. This is the correct approach, but you need to ensure that you're comparing the computed digest with the received signature to verify the authenticity of the webhook payload.

Here's the corrected version of your code:

javascript
Copy code
    ```const crypto = require('crypto');
        
        const webhookSecret = "123456";
        const signature = req.headers["x-razorpay-signature"];
        const shasum = crypto.createHmac('sha256', webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const computedSignature = shasum.digest('hex');
        
        if (signature === computedSignature) {
            // Signature verification successful
            console.log("Webhook signature is valid.");
            // Proceed with processing the webhook payload
        } else {
            // Signature verification failed
            console.log("Webhook signature is not valid.");
            // Handle the error or reject the webhook request
        }

```