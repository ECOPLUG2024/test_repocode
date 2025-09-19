
import Razorpay from "razorpay";

const api_key = "rzp_test_RD1j0p5F3xBqtT";
const api_secret = "L8vmeikiaOvQtOO9utugrexI";

export const razorpay = new Razorpay({
    key_id: api_key,
    key_secret: api_secret,
});

