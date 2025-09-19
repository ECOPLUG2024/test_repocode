import { razorpay } from "../config/razorpayClient.js";
import Order from "../models/order.model.js";



export const createPaymentLink = async (orderId) => {

    try {
        // const orderId = req.params.id;
        const id = orderId.toString();
        const order = await Order.findById(id).populate("item", "name category brand model price discount").populate("user", "name number email address");

        const paymentLinkRequest = {
            amount: (order.item.price - order.item.discount),
            currency: "INR",
            customer: {
                name: order.user.name,
                contact: order.user.number,
                email: order.user.email,
            },
            notify: {
                sms: true,
                email: true,
                whatsapp: true,
            },
            reminder_enable: true,
            callback_url: `http://localhost:8000/payment/${id}`,
            callback_method: "get",

        };
        // console.log("paymentLinkRequest", paymentLinkRequest);

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        // console.log("paymentLink", paymentLink);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url,
        };
        // console.log("resData : ", resData)

        return resData;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};